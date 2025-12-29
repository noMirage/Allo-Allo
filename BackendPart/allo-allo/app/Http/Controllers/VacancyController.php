<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacancy;
use App\Models\VacancyCategory;
use App\Models\VacancyView;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
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
        'salary' => 'nullable|string|max:255',
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

   $salary = $request->input('salary');

    $vacancy = Vacancy::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'title' => $request->title,
        'description' => $request->description,
        'location' => $request->location,
        'salary' => ($salary !== null && $salary !== '' && $salary !== '?') ? $salary : null,
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
public function getVacancies(Request $request)
{
    $vacancies = Vacancy::with('employer.employerProfile')
                        ->orderBy('created_at', 'desc')
                        ->paginate(50);

    $vacancies->getCollection()->transform(function ($vacancy) {
        return [
            'id' => $vacancy->id,
            'title' => $vacancy->title,
            'description' => $vacancy->description,
            'location' => $vacancy->location,
            'salary' => $vacancy->salary,
            'logo' => $vacancy->logo,
            "views" => $vacancy->views,
            'created_at' => $vacancy->created_at,
            'organization' => $vacancy->employer?->employerProfile?->organization ?? 'Без організації',
        ];
    });

    return response()->json([
        'success' => true,
        'message' => 'Успішно отримані!',
        'data' => [
            'vacancies' => $vacancies->items(),
            'current_page' => $vacancies->currentPage(),
            'last_page' => $vacancies->lastPage(),
            'per_page' => $vacancies->perPage(),
            'total' => $vacancies->total(),
        ],
    ]);
}
public function getVacancyById($id)
{
     $vacancy = Vacancy::with('employer.employerProfile:id,user_id,organization')->find($id)->find($id);

    if (!$vacancy) {
        return response()->json([
            'success' => false,
            'message' => 'Вакансія не знайдена',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => [
            'id' => $vacancy->id,
            'title' => $vacancy->title,
            'description' => $vacancy->description,
            'location' => $vacancy->location,
            'salary' => $vacancy->salary,
            'logo' => $vacancy->logo,
            'created_at' => $vacancy->created_at,
            "views" => $vacancy->views,
            'employer' => $vacancy->employer ? [
                'id' => $vacancy->employer->id,
                'full_name' => $vacancy->employer->full_name,
                'avatar' => $vacancy->employer->avatar,
                'phone' => $vacancy->employer->phone,
                'email' => $vacancy->employer->email,
                'organization' => $vacancy->employer->employerProfile?->organization,
            ] : null,
        ],
    ]);
}

 public function incrementViews(int $id)
{
    $vacancy = Vacancy::findOrFail($id);
    $userId = auth()->id();

    if (!$userId) {
        return response()->json(['status' => 'Гість']);
    }

    try {
        VacancyView::create([
            'vacancy_id' => $vacancy->id,
            'user_id' => $userId,
        ]);

        $vacancy->increment('views');

    } catch (QueryException $e) {

    }

    return response()->json([
        'status' => 'ok',
        "message" => 'Успіх',
        "data" => '',
    ],200);
}
}
