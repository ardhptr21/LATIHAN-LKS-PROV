<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'disease_history' => $this->disease_history,
            'current_symptoms' => $this->current_symptoms,
            'doctor_notes' => $this->doctor_notes,
            'doctor' => $this->doctor,
        ];
    }
}
