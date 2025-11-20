<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/user', [UserController::class, 'userRegister']);

// Route::get('/user', function () {
//     return ['message' => 'GET /user is working!'];
// });

// Route::post('/user', [UserController::class, 'store']);