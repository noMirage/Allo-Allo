<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller{
 public function userRegister (Request $request) {
       $request->validate([
            'name' => 'required|string|max:255',
            "surname" => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            "age" => 'nullable|integer',
            "avatar" => "nullable",
            "phone" => "nullable|max:16|alpha_num",
            "description" => "nullable|string",
        ]);

        $user = new UserModel();

        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->email = $request->input('email');
        $user->password = Hash::make($request['password']);
        $user->age = $request->input('age');
        $user->avatar = $request->input('avatar');
        $user->phone = $request->input('phone');
        $user->description = $request->input('description');

        $user->save();

        $token = $user->createToken('auth_token');
        $tokenModel = $token->accessToken;
        $tokenModel->expires_at = now()->addDays(7);
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

       if(!$user || !Hash::check($request->password, $request->password)){
          return response()->json(['message' => 'Невірні дані'], 401);
       } else{
        return response()->json([
            "success" => true,
            'message' => 'Успішний вхід',
            "user" => $user,
        ]);
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
