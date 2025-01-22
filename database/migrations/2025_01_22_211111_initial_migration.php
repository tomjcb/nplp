<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up()
	{
		Schema::create('songs', function (Blueprint $table) {
			$table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('youtube_link');
            $table->string('round');
            $table->integer('points');
            $table->string('lyrics_to_find');
            $table->string('lyrics_time_code');

            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
		});
	}

	public function down()
	{
		Schema::dropIfExists('songs');
	}
};
