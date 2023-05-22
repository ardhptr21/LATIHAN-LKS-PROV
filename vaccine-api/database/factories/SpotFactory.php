<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Spot>
 */
class SpotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'regional_id' => $this->faker->numberBetween(1, 5),
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'serve' => $this->faker->numberBetween(1, 3),
            'capacity' => $this->faker->numberBetween(10, 100),
        ];
    }
}
