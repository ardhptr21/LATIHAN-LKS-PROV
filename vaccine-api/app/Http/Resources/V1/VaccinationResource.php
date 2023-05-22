<?php

namespace App\Http\Resources\V1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'queue' => $this->queue,
            'dose' => $this->dose,
            "vaccination_date" => $this->date,
            "spot" => $this->spot,
            "vaccine" => $this->vaccine,
            "vaccinator" => $this->doctor
        ];
    }
}
