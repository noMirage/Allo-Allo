<?php

namespace App\Http\Controllers;
use App\Models\Resume;
use App\Models\ResumeCategory;
use Illuminate\Http\Request;

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

    return response()->json(['resume' => $resume->toArray()], 201);
}
    public function index()
    {
        return Resume::with(['user', 'category'])->get();
    }

    public function myResumes()
    {
        return Resume::where('user_id', auth()->id())->with('category')->get();
    }
}