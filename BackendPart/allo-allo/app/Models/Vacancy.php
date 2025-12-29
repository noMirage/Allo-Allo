<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'salary',
        'location',
        'logo',
        'is_active',
        "views",
        "updated_at",
        "created_at",
    ];

    public function category()
    {
        return $this->belongsTo(VacancyCategory::class);
    }
public function employer()
{
    return $this->belongsTo(UserModel::class, 'user_id');
}

public function vacancyViews()
{
    return $this->hasMany(VacancyView::class);
}
    
}
