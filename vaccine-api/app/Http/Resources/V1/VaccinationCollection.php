<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VaccinationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'vaccinations' => [
                'first' => $this->collection->first(),
                'second' => count($this->collection) > 1 ? $this->collection->last() : null,
            ]
        ];
    }
}
