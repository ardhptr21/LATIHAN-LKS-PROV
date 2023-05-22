<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Resources\V1\LoginResource;
use App\Models\Society;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $society = Society::with('regional')->where('id_card_number', $request->id_card_number)->first();

        if (!$society) return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);

        $verified = password_verify($request->password, $society->password);
        if (!$verified) return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);

        return new LoginResource($society);
    }

    public function logout()
    {
        return response()->json(['message' => 'Logout success'], 200);
    }
}
