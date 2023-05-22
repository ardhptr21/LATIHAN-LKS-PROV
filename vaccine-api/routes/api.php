<?php

use App\Http\Middleware\V1\ValidateToken;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->middleware(ValidateToken::class)->group(function () {

    // Route => /api/v1/auth
    Route::prefix('auth')->controller(\App\Http\Controllers\Api\V1\AuthController::class)->group(function () {
        Route::post('login', 'login')->withoutMiddleware(ValidateToken::class);
        Route::post('logout', 'logout');
    });

    // Route => /api/v1/consultations
    Route::prefix('consultations')->controller(\App\Http\Controllers\Api\V1\ConsultationController::class)->group(function () {
        Route::get('', 'show');
        Route::post('', 'store');
    });

    // Route => /api/v1/spots
    Route::prefix('spots')->controller(\App\Http\Controllers\Api\V1\SpotController::class)->group(function () {
        Route::get('', 'index');
        Route::get('{spot}', 'show');
    });

    // Route => /api/v1/vaccinations
    Route::prefix('vaccinations')->controller(\App\Http\Controllers\Api\V1\VaccinationController::class)->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
    });
});
