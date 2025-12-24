<?php

namespace App\Models;
use App\Models\Resume;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResumeCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function resumes()
    {
        return $this->hasMany(Resume::class, 'category_id');
    }
}