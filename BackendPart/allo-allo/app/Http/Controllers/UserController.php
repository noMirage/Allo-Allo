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

       if(UserModel::where('email', $request->email)->first()){
         return response()->json([
            "success" => false,
            'message' => 'Такий Email вже зареєстрований!',
          ], 201);
       };

        $user->full_Name = $request->input('fullName');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->location = $request->input('location');

        $user->save();

        $token = $user->createToken('auth_token');
        $cookie = cookie(
             'token', 
              $token->plainTextToken,       
              60*24*30,     
              null,      
              null,       
              true,        
              true
         );

        return response()->json([
            "success" => true,
            'message' => 'Успішно створений',
          ], 201)->withCookie($cookie);
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

      public function logInAuto(Request $request){
       $token = $request->cookie('token');
       if (!$token) {
           return response()->json(['message' => 'Unauthorized'], 401);
        }

        [$id, $plain] = explode('|', $token);
   

        $tokenModel = PersonalAccessToken::find($id);

        if (!$tokenModel) {
          return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (!hash_equals($tokenModel->token, hash('sha256', $plain))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

       $user = $tokenModel->tokenable;

       return response()->json($user);
  }
}
