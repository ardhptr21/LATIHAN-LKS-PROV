<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Spot extends Model
{
    use HasFactory;

    protected $hidden = ['pivot', 'created_at', 'updated_at'];

    public function vaccines(): BelongsToMany
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccine');
    }

    public function vaccinations(): HasMany
    {
        return $this->hasMany(Vaccination::class);
    }

    public function medicals(): HasMany
    {
        return $this->hasMany(Medical::class);
    }

    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regional::class);
    }
}
