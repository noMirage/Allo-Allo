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
    Schema::create('ukraine_locations', function (Blueprint $table) {
        $table->id();
        $table->bigInteger('level_1')->nullable();
        $table->bigInteger('level_2')->nullable();
        $table->bigInteger('level_3')->nullable();
        $table->bigInteger('object_code')->nullable();
        $table->string('level_4')->nullable();
        $table->string('object_category')->nullable();
        $table->string('object_name')->nullable();
        $table->string('region')->nullable();
        $table->string('community')->nullable();
        $table->timestamps();
    });
}
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ukraine_locations');
    }
};
