<?php

namespace Database\Factories;

use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PlayerFactory extends Factory
{
	protected $model = Player::class;

	public function definition(): array
	{
		$gender = $this->faker->randomElement(['male', 'female']);
		$first_name = $this->faker->firstName($gender);
		$last_name = $this->faker->lastName($gender);
		$full_name = $first_name . ' ' . $last_name;
		return [
			'name' => $full_name,
			'avatar' => 'https://i.pravatar.cc/150?u=' . $this->faker->uuid,
			'created_at' => Carbon::now(),
			'updated_at' => Carbon::now(),
		];
	}
}
