<?php

namespace App\Http\Controllers;

use Illuminate\Notifications\Notifiable;
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

        return response()->json([
            "success" => true,
            'message' => 'Успішно створений',
            "user" => $user,
        ], 201);

    }
}
