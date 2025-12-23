<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailVerificationMailController;
use App\Http\Controllers\LocationController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/verificatyEmail', [EmailVerificationMailController::class, 'verificatyEmail']);
Route::post('/confirmEmail', [EmailVerificationMailController::class, 'confirmEmail']);
Route::get('/locations/search', [LocationController::class, 'search']);

Route::middleware('auth')
    ->patch('/mainEditProfile', [UserController::class, 'mainEditProfile']);

Route::post('/avatar/Profile', [UserController::class, 'updateAvatar'])
    ->middleware('auth:sanctum');

Route::get('/logInAuto', function () {
    return auth()->user();
});
Route::get('/logOut', function () {
    return response('Вийшли з акаунту')
        ->cookie(Cookie::forget('token'));
});
