<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreVaccinationRequest;
use App\Http\Resources\V1\VaccinationCollection;
use App\Models\Spot;
use App\Models\Vaccination;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VaccinationController extends Controller
{
    public function index(Request $request)
    {
        $vaccinations = $request->society->vaccinations()
            ->with(['spot.regional', 'vaccine:id,name', 'doctor'])
            ->orderBy('date', 'asc')->get();
        return new VaccinationCollection($vaccinations);
    }

    public function store(StoreVaccinationRequest $request)
    {
        // -- Handle Consultation Accepted --

        $consultation = $request->society->consultations()->orderBy('created_at', 'desc')->first();
        if ($consultation->status != 'accepted') return response()->json(['message' => 'Your consultation must be accepted by doctor before',], 401);

        // -- Handle Vaccination --
        $currentVaccination = Vaccination::select(['queue'])->where('spot_id', $request->spot_id)->whereDate('date', $request->date)->orderBy('queue', 'desc')->first();
        $currentSpot = Spot::with('medicals')->where('id', $request->spot_id)->first();

        // check if queue is full
        if ($currentVaccination && $currentVaccination->queue >= $currentSpot->capacity) return response()->json(['message' => 'Queue is full',], 401);

        $vaccinations = $request->society->vaccinations()->orderBy('date', 'asc')->get();
        $data = $request->all();
        $data['doctor_id'] = $currentSpot->medicals->where('role', 'doctor')->first()->id;
        $data['officer_id'] = $currentSpot->medicals->where('role', 'officer')->first()->id;
        $data['queue'] = $currentVaccination ? $currentVaccination->queue + 1 : 1;

        // handle more than 2 vaccinations
        if ($vaccinations->count() >= 2) return response()->json(['message' => 'Society has been 2x vaccinated',], 401);

        // handle first vaccine
        if ($vaccinations->count() <= 0) {

            // check if current spot support first vaccination
            if ($currentSpot->serve != 3 && $currentSpot->serve != 1) return response()->json(['message' => 'This spot does not support second vaccination',], 401);

            $data['dose'] = 1;
            $request->society->vaccinations()->create($data);
            return response()->json(['message' => 'First vaccination registered successful',], 200);
        }

        // check if current spot support second vaccination
        if ($currentSpot->serve != 3 && $currentSpot->serve != 2) return response()->json(['message' => 'This spot does not support second vaccination',], 401);

        // handle the second vaccine
        $data['dose'] = 2;
        $firstVaccination = $vaccinations->first();
        $date = Carbon::parse($request->date);
        $firstVaccinationDate = Carbon::parse($firstVaccination->date);
        $diff = $date->diffInDays($firstVaccinationDate, true);

        if ($diff < 30) return response()->json(['message' => 'Wait at least +30 days from 1st Vaccination',], 401);

        $request->society->vaccinations()->create($data);
        return response()->json(['message' => 'Second vaccination registered successful',], 200);
    }
}
