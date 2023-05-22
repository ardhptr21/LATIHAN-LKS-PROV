<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreConsultationRequest;
use App\Http\Resources\V1\ConsultationResource;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function show(Request $request)
    {
        return new ConsultationResource($request->society->consultations()->first());
    }

    public function store(StoreConsultationRequest $request)
    {
        if ($request->society->consultations()->exists()) return response()->json(['message' => 'You already have a consultation'], 400);

        $request->society->consultations()->create($request->validated());

        return response()->json(['message' => 'Request consultation sent successful'], 200);
    }
}
