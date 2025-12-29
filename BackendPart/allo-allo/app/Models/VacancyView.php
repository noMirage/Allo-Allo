<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacancyView extends Model
{
    use HasFactory;

     protected $fillable = ['vacancy_id', 'user_id'];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
