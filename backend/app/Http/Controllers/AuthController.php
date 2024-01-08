<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Validate;

class AuthController extends Controller
{
    //
    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|min:3',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create(
            [
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'password' => Hash::make($req->input('password')),
            ]
        );
        return response()->json(['message' => "User registered", 'user' =>  $user], 200);
    }
    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), ['email' => 'email|required', 'password' => 'required']);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json(['message' => 'Invalid user name or password!'], 401);
        }
        $token  = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'profile' => $user]);
    }
    public function logout(Request $request)
    {
        $user = $request->user();

        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'min:3',
            'email' => ['email', Rule::unique('users')->ignore(auth()->id())],
            'dob' => 'date|after:1947/01/01|before_or_equal:now',
            'phone' => 'min:10'
        ]);
        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 400);
        }
        $user = auth()->user();
        $dob = $request->dob;
        $user->dob = Carbon::parse($dob);
        $user->update($request->only('name', 'email', 'phone'));
        return response()->json(['message' => 'Profile updated successfully', 'profile' => $user]);
    }
}
