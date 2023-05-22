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
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('dose')->default(1);
            $table->integer('queue');
            $table->date('date');
            $table->foreignId('society_id')->constrained('societies', 'id');
            $table->foreignId('spot_id')->constrained('spots', 'id');
            $table->foreignId('vaccine_id')->constrained('vaccines', 'id');
            $table->foreignId('doctor_id')->constrained('medicals', 'id');
            $table->foreignId('officer_id')->constrained('medicals', 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccinations');
    }
};
