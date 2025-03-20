<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up()
	{
		// Partie config
		Schema::create('players', function (Blueprint $table) {
			$table->id();
			$table->string('name')->nullable();
			$table->longText('avatar')->nullable();

			$table->softDeletes();

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
		});

		Schema::create('songs', function (Blueprint $table) {
			$table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('video_file');
            $table->string('lyrics_to_find');
            $table->string('lyrics_time_code');

			$table->softDeletes();

            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
		});

		// Partie jeu

		Schema::create('games', function (Blueprint $table) {
			$table->id();
			$table->string('name')->nullable();
			$table->dateTime('started_at')->nullable();
			$table->dateTime('ended_at')->nullable();

			$table->softDeletes();

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
		});

		Schema::create('rounds', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('game_id');
			$table->string('name');
			$table->integer('order')->default(1);

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();

			$table->foreign('game_id')->references('id')->on('games');
		});

		Schema::create('teams', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('game_id');
			$table->string('name')->nullable();

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();

			$table->foreign('game_id')->references('id')->on('games');
		});

		Schema::create('round_songs', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('round_id');
			$table->unsignedBigInteger('song_id');
			$table->unsignedBigInteger('team_id')->nullable();
			$table->boolean('completed')->default(false);
			$table->boolean('success')->nullable();

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();

			$table->foreign('round_id')->references('id')->on('rounds');
			$table->foreign('song_id')->references('id')->on('songs');
			$table->foreign('team_id')->references('id')->on('teams');
		});

		Schema::create('team_players', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('team_id');
			$table->unsignedBigInteger('player_id');

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();

			$table->foreign('team_id')->references('id')->on('teams');
			$table->foreign('player_id')->references('id')->on('players');
		});

		Schema::create('team_jokers', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('team_id');
			$table->string('type');
			$table->integer('amount')->default(0);

			$table->dateTime('created_at')->useCurrent();
			$table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();

			$table->foreign('team_id')->references('id')->on('teams');
		});
	}

	public function down()
	{
		Schema::dropIfExists('team_jokers');
		Schema::dropIfExists('team_players');
		Schema::dropIfExists('round_songs');
		Schema::dropIfExists('teams');
		Schema::dropIfExists('rounds');
		Schema::dropIfExists('games');
		Schema::dropIfExists('songs');
		Schema::dropIfExists('players');

	}
};
