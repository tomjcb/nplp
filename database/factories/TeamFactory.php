<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TeamFactory extends Factory
{
	protected $model = Team::class;

	public function definition(): array
	{
		return [
			'game_id' => 1,
			'name' => ucwords('Équipe ' . $this->faker->word),
			'created_at' => Carbon::now(),
			'updated_at' => Carbon::now(),
		];
	}
}
