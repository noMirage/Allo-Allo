<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\EmployerProfile;
use App\Http\Resources\UserResource;
require_once app_path('/Utils/createAuthCookie.php');

class UserController extends Controller{
public function register(Request $request)
{
    $request->validate([
        'fullName' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'phone' => 'nullable|max:16|alpha_num',
        'location' => 'required_if:role,job_seeker|string',
        'role' => 'required|in:job_seeker,employer',
        'organization' => 'required_if:role,employer|string|max:255',
    ]);

    $user = UserModel::create([
        'full_name' => $request->fullName,
        'email' => $request->email,
        'phone' => $request->phone,
        'location' => $request->location,
        'role' => $request->role,
    ]);

    if ($user->isEmployer()) {
        EmployerProfile::create([
            'user_id' => $user->id,
            'organization' => $request->organization,
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;
    $cookie = createAuthCookie($user);

    return response()->json([
        'success' => true,
        'message' => 'Успішно створений',
        'data' => new UserResource($user),
    ], 201)->withCookie($cookie);
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

       return response()->json(new UserResource($user));
  }


  public function mainEditProfile(Request $request)
{
    $data = $request->validate([
       'fullName' => 'sometimes|string|max:255',
       'phone'    => 'sometimes|nullable|string|max:16',
       'location' => 'required_if:role,job_seeker|string',
       'role' => 'required|in:job_seeker,employer',
       'organization' => 'required_if:role,employer|string|max:255',
    ]);

    $user = UserModel::findOrFail(auth()->id());

    if (isset($data['fullName'])) $user->full_name = $data['fullName'];
    if (isset($data['phone'])) $user->phone = $data['phone'];

    if ($user->isJobSeeker() && isset($data['location'])) {
        $user->location = $data['location'];
    }

    if ($user->isEmployer() && isset($data['organization'])) {
        $user->employerProfile()->updateOrCreate(
            ['user_id' => $user->id],
            ['organization' => $data['organization']]
        );
    }

    $user->save();

    return response()->json([
        'success' => true,
        'message' => 'Дані успішно змінені!',
        'data' => new UserResource($user),
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
             'data' => new UserResource($user),
         ]);
    }
}

