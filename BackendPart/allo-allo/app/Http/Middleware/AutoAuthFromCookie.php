<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AutoAuthFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
{
    $token = $request->cookie('token');

    if ($token) {
        [$tokenId, $tokenSecret] = explode('|', $token);

        $tokenModel = \Laravel\Sanctum\PersonalAccessToken::find($tokenId);

        if (!$tokenModel || !hash_equals($tokenModel->token, hash('sha256', $tokenSecret))) {
            return response()->json(['message' => 'Unauthorized'], 401)
                             ->withCookie(cookie()->forget('token'));
        }

        if ($tokenModel->expires_at && $tokenModel->expires_at->isPast()) {
            return response()->json(['message' => 'Token expired'], 401)
                             ->withCookie(cookie()->forget('token'));
        }

        Auth::login($tokenModel->tokenable);
    }

    return $next($request);
}
}
