<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // doctor role
        for ($i = 1; $i <= 5; $i++) {
            \App\Models\Medical::create([
                'user_id' => $i,
                'spot_id' => $i,
                'role' => 'doctor',
                'name' => 'Dr. ' . fake()->name(),
            ]);
        }

        // officer role
        for ($i = 6; $i <= 10; $i++) {
            \App\Models\Medical::create([
                'user_id' => $i,
                'spot_id' => $i - 5,
                'role' => 'officer',
                'name' => fake()->name(),
            ]);
        }
    }
}
