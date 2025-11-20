<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    use HasFactory, Notifiable;

    
    protected $table = 'users';
  
    protected $fillable = [
        "id",
        'name',
        'email',
        'password',
        "age",
        "phone",
        "avatar",
        "surname",
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
