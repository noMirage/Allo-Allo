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

        if ($tokenModel && hash_equals($tokenModel->token, hash('sha256', $tokenSecret)) && $tokenModel->tokenable) {
            Auth::login($tokenModel->tokenable);
        }

        else {
            cookie()->queue(cookie()->forget('token'));
        }
    }

    return $next($request);
}
}
