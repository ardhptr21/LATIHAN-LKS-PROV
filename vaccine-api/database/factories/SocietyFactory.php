<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Society>
 */
class SocietyFactory extends Factory
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
            'id_card_number' => $this->faker->unique()->numberBetween(10000000, 99999999),
            'name' => $this->faker->name,
            'password' => bcrypt('password'),
            'born_date' => $this->faker->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'address' => $this->faker->address,
            'login_tokens' => md5($this->faker->unique()->numberBetween(10000000, 99999999)),
        ];
    }
}
