<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class GameFactory extends Factory
{
	protected $model = Game::class;

	public function definition(): array
	{
		$date = $this->faker->dateTimeThisMonth();
		$started_at = $this->faker->boolean(60) ? Carbon::parse($date) : null;
		$ended_at = $started_at ?
			($this->faker->boolean(30) ? Carbon::parse($date)->addDays(10)->format('Y-m-d H:i:s') : null)
			: null;
		return [
			'name' => $this->faker->name(),
			'created_at' => Carbon::now(),
			'updated_at' => Carbon::now(),
			'started_at' => $started_at,
			'ended_at' => $ended_at
		];
	}
}
