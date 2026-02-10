<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;
use Illuminate\Support\Facades\Cache;
use App\Models\UserModel;
require_once app_path('/Utils/createAuthCookie.php');

class EmailVerificationMailController extends Controller{
  public function verificatyEmail (Request $request) {
      $request->validate([
        'email' => 'required|string|email|max:255',
    ]);

     $email = $request->email;

     if (Cache::has('email_verification_' . $email)) {
        return response()->json([
            'success' => false,
            'message' => 'Почекайте хвилину перед повторною відправкою коду.'
        ], 429); 
    }

    $verificationCode = rand(100000, 999999);

    Mail::to($email)->send(new EmailVerificationMail($verificationCode));

    Cache::put('email_verification_' . $email, $verificationCode, 60);

    return response()->json([
        'success' => true,
        'message' => 'Код підтвердження надіслано на email',
    ], 200);
   }

   public function confirmEmail (Request $request) {
    $request->validate([
        'email' => 'required|string|email',
        'code' => 'required|string|',
    ]);

    $email = $request->email;
    $code = $request->code;

    $stored = Cache::get('email_verification_' . $email);

    if (!$stored) {
        return response()->json([
            'success' => false,
            'message' => 'Код застарів або не знайдено'
        ], 400);
    }

    if ($stored != $code) {
        return response()->json([
            'success' => false,
            'message' => 'Невірний код'
        ], 400);
    }

    Cache::forget('email_verification_' . $email);

    $user = UserModel::where('email', $request->email)->first();

     if($user && $stored == $code){

       $cookie = createAuthCookie($user);

       return response()->json([
            'success' => true,
            'message' => 'Користувача знайдено',
        ], 200)->withCookie($cookie); 
     }

    return response()->json([
        'success' => true,
        'message' => 'Email підтверджений'
    ], 200);

   }
}
