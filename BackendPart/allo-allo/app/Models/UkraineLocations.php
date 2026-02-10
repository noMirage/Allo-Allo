<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UkraineLocations extends Model
{
    use HasFactory;
      protected $table = 'ukraine_locations';
      public $timestamps = false;

      protected $fillable = ["level_1", 'level_2', 'level_3', 'level_4', 'object_category', "object_name", "object_code", "region", "community"];
}
