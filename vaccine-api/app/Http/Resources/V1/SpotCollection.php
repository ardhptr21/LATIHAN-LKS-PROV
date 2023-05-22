<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SpotCollection extends ResourceCollection
{

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'spots' =>  $this->collection->map(fn ($v) => [
                'id' => $v->id,
                'name' => $v->name,
                'address' => $v->address,
                'serve' => $v->serve,
                'capacity' => $v->capacity,
                'available_vaccines' => $v->vaccines->map(fn ($v) => $v->name)
            ])->toArray()
        ];
    }
}
