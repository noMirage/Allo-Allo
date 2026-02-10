<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('vacancies', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')
          ->constrained('users')
          ->cascadeOnDelete();
    $table->foreignId('category_id')
          ->constrained('vacancy_categories')
          ->cascadeOnDelete();
    $table->string('title');
    $table->text('description');
    $table->string('salary')->nullable();
    $table->string('location');
    $table->string('logo')->nullable();
    $table->timestamps();
    $table->boolean('is_active')->default(true);
    $table->unsignedBigInteger('views')->default(0);
});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vacancies');
    }
};
