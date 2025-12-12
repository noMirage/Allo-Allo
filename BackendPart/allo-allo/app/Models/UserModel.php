<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';
  
   protected $fillable = [
    "id",
    'full_name',
    'email',
    "location",
    "phone",
    "age",
    "avatar",
    "description", 
   ];
}
