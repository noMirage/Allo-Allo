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

  public function deleteVacancy($id)
    {
        $user = auth()->user();

        $vacancy = Vacancy::where('id', $id)
                        ->where('user_id', $user->id)
                        ->first();

        if (!$vacancy) {
            return response()->json([
                'success' => false,
                'message' => 'Вакансія не знайдена або не належить вам',
            ], 404);
        }

         if ($vacancy->logo) {
           \Storage::disk('public')->delete($vacancy->logo);
         }

        $vacancy->delete();

        return response()->json([
            'success' => true,
            'message' => 'Вакансія видалена',
            "data" => new UserResource(auth()->user()->fresh()),
        ], 200);
    }
    public function updateVacancy(Request $request, $id)
{
    $user = auth()->user();

    $vacancy = Vacancy::where('id', $id)
                      ->where('user_id', $user->id)
                      ->first();

    if (!$vacancy) {
        return response()->json([
            'success' => false,
            'message' => 'Вакансія не знайдена або не належить вам',
        ], 404);
    }

    $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'category' => 'sometimes|required|string',
        'description' => 'sometimes|required|string',
        'location' => 'sometimes|required|string',
        'salary' => 'nullable|string|max:255',
        'logo' => [
            'nullable',
            function ($attribute, $value, $fail) use ($request) {
                if ($request->hasFile('logo')) return;

                if ($value === 'null') return;

                $fail('Лого має бути файлом або рядком "null".');
            },
        ],
    ]);

    if ($request->hasFile('logo')) {
        $request->validate([
            'logo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    }

    if ($request->has('category')) {
        $category = VacancyCategory::where('name', $request->category)->first();
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Категорія не знайдена',
            ], 422);
        }
        $vacancy->category_id = $category->id;
    }


    if ($request->has('title')) $vacancy->title = $request->title;
    if ($request->has('description')) $vacancy->description = $request->description;
    if ($request->has('location')) $vacancy->location = $request->location;
    if ($request->filled('salary')) $vacancy->salary = $request->salary;

    if ($request->hasFile('logo')) {
        if ($vacancy->logo) {
            \Storage::disk('public')->delete($vacancy->logo);
        }
        $vacancy->logo = $request->file('logo')->store("vacancies/{$user->id}/{$vacancy->id}", 'public');
    } elseif ($request->input('logo') === 'null') {
        if ($vacancy->logo) {
            \Storage::disk('public')->delete($vacancy->logo);
        }
        $vacancy->logo = null;
    }

    $vacancy->save();

    return response()->json([
        'success' => true,
        'message' => 'Вакансія оновлена',
        'data' => new UserResource($user->fresh()),
    ], 200);
}
}
