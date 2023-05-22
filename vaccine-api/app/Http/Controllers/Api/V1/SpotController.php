<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SpotCollection;
use App\Http\Resources\V1\SpotResource;
use App\Models\Spot;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $spots = $request->society->regional->spots()->with('vaccines:id,name')->get();
        return new SpotCollection($spots);
    }

    public function show(Spot $spot)
    {
        $date = request()->query('date');

        if (!$date) $date = now()->toDateString();

        $formattedDate = Carbon::parse($date)->format('F j, Y');
        $spot = $spot
            ->loadCount(['vaccinations' => fn ($q) => $q->whereDate('date', $date)])
            ->load('vaccines:id,name');
        return new SpotResource($spot, $formattedDate);
    }
}
