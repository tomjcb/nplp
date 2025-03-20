<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SongFactory extends Factory
{
	protected $model = Song::class;

	public function definition(): array
	{
		$faker = $this->faker;
		$gender = $faker->randomElement(['male', 'female']);
		$first_name = $faker->firstName($gender);
		$last_name = $faker->lastName($gender);
		$full_name = $first_name . ' ' . $last_name;

		$time = $faker->dateTimeThisMonth();

		$timecode_minute = $faker->numberBetween(1, 3);
		$timecode_seconds = $faker->numberBetween(10, 59);

		$lyrics_to_find = ucfirst($faker->words($faker->numberBetween(3, 10), true));

		return [
			'title' => ucwords($faker->words($faker->numberBetween(3, 5), true)),
			'artist' => $full_name,
			'video_file' => $faker->url(),
			'lyrics_to_find' => $lyrics_to_find,
			'lyrics_time_code' => "{$timecode_minute}:{$timecode_seconds}",
			'created_at' => $time,
			'updated_at' => $time,
		];
	}
}
