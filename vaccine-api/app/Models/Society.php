<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Society extends Model
{
    use HasFactory;

    public function regional(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Regional::class);
    }

    public function consultations(): HasMany
    {
        return $this->hasMany(\App\Models\Consultation::class);
    }

    public function vaccinations(): HasMany
    {
        return $this->hasMany(\App\Models\Vaccination::class);
    }
}
