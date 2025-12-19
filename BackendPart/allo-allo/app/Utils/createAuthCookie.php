<?php

  /**
     * Створює токен та cookie для користувача
     *
     * @param \App\Models\User $user
     * @param int $minutes
     * @return \Symfony\Component\HttpFoundation\Cookie
     */
     function createAuthCookie($user, $minutes = 60*24*30)
    {
        $token = $user->createToken('auth_token');
        return cookie(
            'token',
            $token->plainTextToken,
            $minutes,
            null,
            null,
            true,   
            true
        );
    }