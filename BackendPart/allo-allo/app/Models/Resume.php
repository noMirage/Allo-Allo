<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'title', 'description', 'images', "views"
    ];
    
    protected $with = ['category']; 

    protected $casts = [
        'images' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(ResumeCategory::class);
    }
    public function views()
    {
        return $this->hasMany(ResumeView::class);
    }
}
