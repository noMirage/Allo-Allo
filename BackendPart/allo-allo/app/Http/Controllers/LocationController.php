<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class LocationController extends Controller
{
   public function search(Request $request)
{
    $q = trim($request->query('q'));

    if (mb_strlen($q) < 2) {
        return response()->json([]);
    }

    $words = preg_split('/\s+/', $q);

    $query = DB::table('ukraine_locations')
        ->select('object_name', 'region', 'community', "object_category", "object_code");

    foreach ($words as $word) {
        $query->where(function ($q2) use ($word) {
            $q2->where('object_name', 'LIKE', "%{$word}%")
               ->orWhere('region', 'LIKE', "%{$word}%")
               ->orWhere('object_category', 'LIKE', "%{$word}%")
               ->orWhere('object_code', 'LIKE', "%{$word}%")
               ->orWhere('community', 'LIKE', "%{$word}%");
        });
    }

    $results = $query->distinct()->limit(50)->get();

       return response()->json([
            "success" => true,
            'message' => 'Успіх',
            "data" => response()->json($results)->original,
        ]);
}
}
