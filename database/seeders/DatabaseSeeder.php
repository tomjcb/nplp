<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Player;
use App\Models\Round;
use App\Models\RoundSong;
use App\Models\Song;
use App\Models\Team;
use App\Models\TeamJoker;
use App\Models\TeamPlayer;
use App\Models\User;

use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		$faker = Factory::create();
		User::factory()->create([
			'name' => 'Tom J.',
			'email' => 'tom@mail.fr',
		]);

		Song::factory()->count(40)->create();
		Player::factory()->count(20)->create();
		Game::factory()->count(5)->create();

		$games = Game::all();
		$teams = [];
		foreach ($games as $game) {
			$teams_amount = $faker->numberBetween(3, 5);
			$data = Team::factory($teams_amount)->raw([
				'game_id' => $game->id
			]);
			$teams = array_merge($teams, $data);
		}
		Team::insert($teams);

		$players = Player::all();
		$team_players = [];
		$team_jokers = [];
		$rounds = [];
		foreach ($games as $game) {
			$teams = $game->teams;
			$available_player_ids = $players->pluck('id')->toArray();
			foreach ($teams as $team) {
				$players_amount = $faker->numberBetween(3, 4);
				for ($i = 0; $i < $players_amount; $i++) {
					$random_player_id = $faker->randomElement($available_player_ids);
					$team_players[] = [
						'team_id' => $team->id,
						'player_id' => $random_player_id
					];
					$available_player_ids = array_diff($available_player_ids, [$random_player_id]);
				}
				$team_jokers[] = [
					'team_id' => $team->id,
					'type' => 'half',
					'amount' => 3
				];
				$team_jokers[] = [
					'team_id' => $team->id,
					'type' => 'friend_call',
					'amount' => 3
				];
				$team_jokers[] = [
					'team_id' => $team->id,
					'type' => 'times_two',
					'amount' => 3
				];
				$team_jokers[] = [
					'team_id' => $team->id,
					'type' => 'song_steal',
					'amount' => 3
				];
			}

			$rounds_amount = $faker->numberBetween(2,3);
			for ($i = 0; $i < $rounds_amount; $i++) {
				$rounds[] = [
					'game_id' => $game->id,
					'name' => 'Round ' . ($i + 1),
					'order' => $i + 1
				];
			}
		}

		TeamPlayer::insert($team_players);
		TeamJoker::insert($team_jokers);
		Round::insert($rounds);

		$songs = Song::all();

		$round_songs = [];

		foreach ($games as $game) {
			$rounds = $game->rounds;
			$available_song_ids = $songs->pluck('id')->toArray();
			foreach ($rounds as $round) {
				$songs_amount = $faker->numberBetween(3, 5);
				for ($i = 0; $i < $songs_amount; $i++) {
					$random_song_id = $faker->randomElement($available_song_ids);
					$completed = $game->ended_at ? $faker->boolean(50) : false;
					$round_songs[] = [
						'round_id' => $round->id,
						'song_id' => $random_song_id,
						'completed' => $completed,
						'success' => $completed ? $faker->boolean(50) : null,
						'team_id' => $completed ? $faker->randomElement($game->teams->pluck('id')->toArray()) : null
					];
					$available_song_ids = array_diff($available_song_ids, [$random_song_id]);
				}
			}
		}

		RoundSong::insert($round_songs);
	}
}
