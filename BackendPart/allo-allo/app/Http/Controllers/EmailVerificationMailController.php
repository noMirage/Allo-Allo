<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;
use Illuminate\Support\Facades\Cache;

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
        'code' => $verificationCode 
    ], 200);
   }
}
