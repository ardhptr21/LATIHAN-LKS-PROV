<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpotVaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spots = \App\Models\Spot::factory(5)->create();
        $vaccines = ['Sinovac', 'AstraZeneca', 'Moderna'];
        foreach ($vaccines as $vaccine) {
            \App\Models\Vaccine::create([
                'name' => $vaccine,
            ]);
        }

        for ($i = 0; $i < 15; $i++) {
            $spots[rand(0, 4)]->vaccines()->attach(rand(1, 3));
        }
    }
}
