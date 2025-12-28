<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Authenticatable
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
    'role'
   ];

    public function resumes()
{
    return $this->hasMany(Resume::class, 'user_id', 'id');
}
   public function resumeViews()
    {
     return $this->hasMany(ResumeView::class);
    }

 public function employerProfile()
{
    return $this->hasOne(EmployerProfile::class, 'user_id', 'id');
}
     public function isEmployer(): bool
    {
        return $this->role === 'employer';
        
    }
    public function vacancies()
{
      return $this->hasMany(Vacancy::class, 'user_id', 'id')->with('category');
}

     public function isJobSeeker(): bool
    {
        return $this->role === 'job_seeker';
    }
    
}
