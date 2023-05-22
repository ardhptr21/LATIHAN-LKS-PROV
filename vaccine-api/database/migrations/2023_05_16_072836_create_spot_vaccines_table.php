<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spot_vaccine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spot_id')->constrained('spots', 'id');
            $table->foreignId('vaccine_id')->constrained('vaccines', 'id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spot_vaccine');
    }
};
