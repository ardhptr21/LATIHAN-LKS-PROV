<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpotResource extends JsonResource
{
    public function __construct($resource, public string $dateFilter)
    {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->dateFilter,
            'spot' => [
                'id' => $this->id,
                'name' => $this->name,
                'address' => $this->address,
                'serve' => $this->serve,
                'capacity' => $this->capacity,
            ],
            'vaccines' => $this->vaccines,
            'vaccinations_count' =>  $this->vaccinations_count,
        ];
    }
}
