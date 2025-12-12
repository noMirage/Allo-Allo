<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;

class UserController extends Controller{
 public function register (Request $request) {
       $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            "phone" => "nullable|max:16|alpha_num",
            "location" => 'required|string',
        ]);

        $user = new UserModel();

        $user->full_Name = $request->input('fullName');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->location = $request->input('location');

        $user->save();

        $token = $user->createToken('auth_token');
        $tokenModel = $token->accessToken;
        $tokenModel->expires_at = now()->addDays(30);
        $tokenModel->save();

        return response()->json([
            "success" => true,
            'message' => 'Успішно створений',
            "user" => $user,
            'token' => $token->plainTextToken
          ], 201);
        }

    public function logIn(Request $request) {
      $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
       ]);

       $user = UserModel::where('email', $request->email)->first();

       if(!$user || !Hash::check($request->password, $user->password)){
          return response()->json(['message' => 'Невірні дані'], 401);
       } else{

    $token = $user->tokens()->latest()->first();

    if ($token && $token->expires_at && $token->expires_at->isPast()) {

        $token->delete();
        $newToken = $user->createToken('auth_token');
        $tokenModel = $newToken->accessToken;
        $tokenModel->expires_at = now()->addDays(7);
        $tokenModel->save();
        $plainToken = $newToken->plainTextToken;

          return response()->json([
            "success" => true,
            'message' => 'Успішний вхід',
            "user" => $user,
            "token" => $plainToken,
        ]);
    } else {
         return response()->json([
            "success" => true,
            'message' => 'Успішний вхід',
            "user" => $user,
            "token" => $token,
        ]);
        }
       }
     }

      public function logInAuto(Request $request) {
         $plainTextToken = $request->bearerToken();
         
         if (!$plainTextToken) {
               return response()->json(['message' => 'Token not provided'], 401);
         }

         $token = Sanctum::findToken($plainTextToken);

         if (!$token) {
             return response()->json(['message' => 'Invalid token'], 401);
          }

        if ($token->expires_at && $token->expires_at->isPast()) {
            return response()->json(['message' => 'Token expired'], 401);
         }

         $user = $token->tokenable;

       return response()->json([
           'message' => 'Token is valid',
           'user' => $user
       ]);
      }
}
