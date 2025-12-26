<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
require_once app_path('/Utils/createAuthCookie.php');

class UserController extends Controller{
 public function register (Request $request) {
       $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            "phone" => "nullable|max:16|alpha_num",
            "location" => 'required|string',
            "role" => 'required',
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
        $user->role = $request->input('role');

        $user->save();

        $token = $user->createToken('auth_token');
        $cookie = createAuthCookie($user);

        return response()->json([
            "success" => true,
            'message' => 'Успішно створений',
            "data" => $user
          ], 201)->withCookie($cookie);;
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


      public function mainEditProfile(Request $request)
    {
         $data = $request->validate([
           'fullName' => 'sometimes|string|max:255',
           'phone'    => 'sometimes|nullable|string|max:16',
           'location' => 'sometimes|string',
        ]);

        $user = UserModel::findOrFail(auth()->id());

          $updateData = [];
          if (isset($data['fullName'])) $updateData['full_name'] = $data['fullName'];
          if (isset($data['phone'])) $updateData['phone'] = $data['phone'];
          if (isset($data['location'])) $updateData['location'] = $data['location'];

          if (!empty($updateData)) {
              $user->update($updateData);
              $user->refresh(); 
           }

          return response()->json([
             'success' => true,
             'message' => 'Дані успішно змінені!',
             'data' => $user,
         ]);
     }

      public function updateAvatar(Request $request) {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp,svg|max:2048',
        ]);

        $user = auth()->user();

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store(
            'avatars/users/' . $user->id,
            'public'
        );

        $user->update([
            'avatar' => $path,
        ]);

        return response()->json([
             'success' => true,
             'message' => 'Дані успішно змінені!',
             'data' => $user,
         ]);
    }
}

