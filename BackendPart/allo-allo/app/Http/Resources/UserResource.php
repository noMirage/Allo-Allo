<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
   public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'role' => $this->role,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "avatar" => $this->avatar,
            "description" => $this->description,
            "age" => $this->age,

            'organization' => $this->when(
                $this->isEmployer(),
                fn () => $this->employerProfile?->organization,
            ),

              'location' => $this->when(
               $this->isJobSeeker(),
               $this->location
              ),

            'resumes' => $this->when(
            $this->isJobSeeker(),
            fn () => $this->resumes
        ),
         'vacancies' => $this->when(
            $this->isEmployer(),
            fn () => $this->vacancies
        ),
        ];
    }
}
