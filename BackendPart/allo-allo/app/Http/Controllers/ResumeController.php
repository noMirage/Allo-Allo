<?php

namespace App\Http\Controllers;
use App\Models\Resume;
use App\Models\ResumeCategory;
use App\Models\ResumeView;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
  public function store(Request $request)
{
    $data = $request->validate([
        'category' => 'required|string',  
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'images' => 'nullable|array',
        'images.*' => 'file|image|max:5120',
    ],
    [
        'images.*'     => 'Кожен файл має бути дійсним файлом',
    ]);

    $category = ResumeCategory::where('name', $data['category'])->first();
    if (!$category) {
        return response()->json(['error' => 'Категорія не знайдена'], 422);
    }

    $user_id = auth()->id();
    $category_id = $category->id;

    $existing = Resume::where('user_id', $user_id)
                      ->where('category_id', $category_id)
                      ->first();

    if ($existing) {
        return response()->json([
            'success' => false,
            'message' => 'У вас вже є резюме в цій категорії'
        ], 422);
    }

    $resume = Resume::create([
        'user_id' => $user_id,
        'category_id' => $category_id,
        'title' => $data['title'],
        'description' => $data['description'] ?? "",
        'images' => null,
    ]);

    $paths = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $file) {
            $paths[] = $file->store("resumes/{$user_id}/{$resume->id}", 'public');
        }
        
        $resume->images = $paths;
        $resume->save();
    }

     return response()->json([
            'success' => true,
            'message' => 'Резюме створено',
            'data' => new UserResource(auth()->user()->fresh()),
    ], 200);
}
    public function index()
    {
        return Resume::with(['user', 'category'])->get();
    }

    public function myResumes()
    {
        return Resume::where('user_id', auth()->id())->with('category')->get();
    }

    public function deleteResume($id)
    {
        $user = auth()->user();

        $resume = Resume::where('id', $id)
                        ->where('user_id', $user->id)
                        ->first();

        if (!$resume) {
            return response()->json([
                'success' => false,
                'message' => 'Резюме не знайдено або не належить вам',
            ], 404);
        }

        if ($resume->images) {
            foreach ($resume->images as $image) {
               \Storage::disk('public')->deleteDirectory("resumes/{$user->id}/{$resume->id}");
            }
        }

        $resume->delete();

        return response()->json([
            'success' => true,
            'message' => 'Резюме видалено',
            "data" => new UserResource(auth()->user()->fresh()),
        ], 200);
    }
    
public function updateResume(Request $request, $id){
    $request->merge([
        'category_id' => intval($request->input('category_id')),
     ]);

    $resume = Resume::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->firstOrFail();

    $data = $request->validate([
        'category_id' => 'required|integer|exists:resume_categories,id',
        'title'       => 'required|string|max:255',
        'description' => 'nullable|string',
        'images'      => 'nullable|array',
        'images.*'    => 'file|image|max:5120',
        'existing_images'   => 'nullable|array',
        'existing_images.*' => 'string',
    ],
    [
        'images.*'     => 'Кожен файл має бути дійсним файлом',
    ]);

    $resume->update([
        'title'       => $data['title'],
        'description' => $data['description'] ?? '',
        'category_id' => $data['category_id'],
    ]);

    $oldImages = is_array($resume->images) ? $resume->images : [];
    $keepImages = $data['existing_images'] ?? [];

    foreach ($oldImages as $img) {
        if (!in_array($img, $keepImages)) {
            Storage::disk('public')->delete($img);
        }
    }

    $finalImages = $keepImages;

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $file) {
            $finalImages[] = $file->store(
                "resumes/{$resume->user_id}/{$resume->id}",
                'public'
            );
        }
    }

    $resume->update(['images' => $finalImages]);

    return response()->json([
        'success' => true,
        'message' => 'Резюме оновлено',
        "data" => new UserResource(auth()->user()->fresh()),
    ]);
}
public function getAllByCategory(string $category)
{
    $categoryModel = ResumeCategory::where('name', $category)->first();

    if (!$categoryModel) {
        return response()->json([
            'success' => false,
            'message' => 'Категорія не знайдена',
        ], 404);
    }

    $resumes = Resume::where('category_id', $categoryModel->id)
        ->with('user:id,full_name,avatar,phone,email,location') 
        ->latest()
        ->paginate(50);

    return response()->json([
        'success' => true,
        'data' => $resumes->items(),
    ]);
}
public function getResumeById($id)
{
    $resume = Resume::with('user:id,full_name,avatar,phone,email,location') 
                    ->find($id);

    if (!$resume) {
        return response()->json([
            'success' => false,
            'message' => 'Резюме не знайдено',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $resume,
    ]);
}
  public function incrementViews(int $id)
{
    $resume = Resume::findOrFail($id);
    $userId = auth()->id();

    if (!$userId) {
        return response()->json(['status' => 'Гість']);
    }

    try {
        ResumeView::create([
            'resume_id' => $resume->id,
            'user_id' => $userId,
        ]);

        $resume->increment('views');

    } catch (QueryException $e) {

    }

    return response()->json([
        'status' => 'ok',
        "message" => 'Успіх',
        "data" => '',
    ],200);
}
}