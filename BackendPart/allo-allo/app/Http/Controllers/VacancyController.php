<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacancy;
use App\Models\VacancyCategory;
use App\Http\Resources\UserResource;
class VacancyController extends Controller
{
   public function store(Request $request)
{
    $user = auth()->user();

    if (!$user->isEmployer()) {
        return response()->json(['success' => false, 'message' => 'Помилка...'], 403);
    }

    $request->validate([
        'title' => 'required|string|max:255',
        'category' => 'required|string',  
        'description' => 'required|string',
        'location' => 'required|string',
        'salary' => 'nullable|integer',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $category = VacancyCategory::where('name', $request->category)->first();

    if (!$category) {
        return response()->json(['success' => false, 'message' => 'Категорія не знайдена'], 422);
    }

    $existingVacancy = Vacancy::where('user_id', $user->id)
    ->where('category_id', $category->id)
    ->first();

   if ($existingVacancy) {
    return response()->json([
        'success' => false,
        'message' => 'Ви вже створили вакансію в цій категорії',
    ], 422);
   }

    $vacancy = Vacancy::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'title' => $request->title,
        'description' => $request->description,
        'location' => $request->location,
        'salary' => $request->salary,
    ]);

    if ($request->hasFile('logo')) {
        $logoPath = $request->file('logo')->store("vacancies/{$user->id}/{$vacancy->id}", 'public');
        $vacancy->logo = $logoPath;
        $vacancy->save();
    }

    return response()->json([
        'success' => true,
        'message' => 'Vacancy created',
        'data' =>  new UserResource($user),
    ], 201);
}
}
