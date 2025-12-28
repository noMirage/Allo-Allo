<?php

namespace Database\Seeders;
use App\Models\VacancyCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VacancyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['сантехніка', 'зварювання', 'електрика', 'перевізник', 'збирання меблів'];
        
     foreach ($categories as $name) {
             VacancyCategory::firstOrCreate([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
