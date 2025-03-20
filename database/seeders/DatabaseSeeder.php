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
			'password' => 'password',
		]);
		User::factory()->create([
			'name' => 'Lea D.',
			'email' => 'desbourdes.francais@gmail.com',
			'password' => 'tchoupileboss',
		]);

		$song_array = [
			[
				'title' => 'Du côté de chez Swann',
				'video_file' => ' ',
				'artist' => 'Dave',
				'lyrics_to_find' => 'Et se laissait embrasser sur la joue',
				'points' => 0,
				'round' => 0,
			 ],
			[
				'title' => 'Besoin de rien, envie de toi',
				'video_file' => ' ',
				'artist' => 'Peter et Sloane',
				'lyrics_to_find' => 'Premier matin caresse Matin tendresse',
				'points' => 5,
				'round' => 1,
			],
			[
				'title' => "J'ai demandé à la lune",
				'video_file' => ' ',
				'artist' => 'Indochine',
				'lyrics_to_find' => 'Et pas grand chose pour te faire rire',
				'points' => 8,
				'round' => 1,
			],
			[
				'title' => 'Nuit de folie',
				'video_file' => ' ',
				'artist' => 'Début de soirée',
				'lyrics_to_find' => 'Le tempo en délire, si ce soir il fait chaud',
				'points' => 10,
				'round' => 1,
			],
			[
				'title' => 'Les démons de minuit',
				'video_file' => ' ',
				'artist' => 'Emile et Images',
				'lyrics_to_find' => 'De Funky Music Il faut que ça danse',
				'points' => 8,
				'round' => 1,
			],
			[
				'title' => 'Partenaire Particulier',
				'video_file' => ' ',
				'artist' => 'Partenaire Particulier',
				'lyrics_to_find' => 'Ils sont autour de moi si coincés',
				'points' => 7,
				'round' => 1,
			],
			[
				'title' => 'L\'aventurier',
				'video_file' => ' ',
				'artist' => 'Indochine',
				'lyrics_to_find' => 'L\'otage des guerriers du Doc Xhatan',
				'points' => 7,
				'round' => 1,
			],
			[
				'title' => 'On va s\'aimer',
				'video_file' => ' ',
				'artist' => 'Gilbert Montagné',
				'lyrics_to_find' => 'Se réchauffer Au coeur des banquises',
				'points' => 6,
				'round' => 1,
			],
			[
				'title' => 'Moi..Lolita',
				'video_file' => ' ',
				'artist' => 'Alizée',
				'lyrics_to_find' => 'Collègienne aux bas Bleus de méthylène',
				'points' => 6,
				'round' => 1,
			],
			[
				'title' => 'Je l\'aime à mourir',
				'video_file' => ' ',
				'artist' => 'Francis Cabrel',
				'lyrics_to_find' => 'Je dois clouer des notes A mes sabots de bois',
				'points' => 10,
				'round' => 1,
			],
			[
				'title' => 'Les Champs-Elysées',
				'video_file' => ' ',
				'artist' => 'Joe Dassin',
				'lyrics_to_find' => 'Un orchestre à mille cordes',
				'points' => 5,
				'round' => 1,
			],
			[
				'title' => 'Mistral Gagnant',
				'video_file' => ' ',
				'artist' => 'Renaud',
				'lyrics_to_find' => 'Ce n\'est que de tes yeux',
				'points' => 7,
				'round' => 1,
			],
			[
				'title' => 'Cette année-là',
				'video_file' => ' ',
				'artist' => 'Claude François',
				'lyrics_to_find' => 'Un oiseau qu\'on appelait Spoutnik',
				'points' => 6,
				'round' => 1,
			],
			[
				'title' => 'Femme Libérée',
				'video_file' => ' ',
				'artist' => 'Cookie Dingler',
				'lyrics_to_find' => 'Sa première ride lui fait du souci Le reflet du miroir pèse sur sa vie',
				'points' => 30,
				'round' => 2,
			],
			[
				'title' => 'Ella, elle l\'a',
				'video_file' => ' ',
				'artist' => 'France Gall',
				'lyrics_to_find' => 'Mais que tu n\'aies rien, que tu sois roi Que tu cherches encore les pouvoirs qui dorment en toi',
				'points' => 40,
				'round' => 2,
			],
			[
				'title' => 'Capitaine Abandonné',
				'video_file' => ' ',
				'artist' => 'Gold',
				'lyrics_to_find' => 'Mais si la tempête t\'enlève A l\'heure ou ton rêve s\'achève Garde bien ces mots sur tes lèvres',
				'points' => 42,
				'round' => 2,
			],
			[
				'title' => 'Libertine',
				'video_file' => ' ',
				'artist' => 'Mylène Farmer',
				'lyrics_to_find' => 'Un goût amer me rapelle que je suis au ciel',
				'points' => 20,
				'round' => 2,
			],
			[
				'title' => 'En rouge et noir',
				'video_file' => ' ',
				'artist' => 'Jeanne Mas',
				'lyrics_to_find' => 'J\'ai raté mon premier rôle Je jouerai mieux le deuxième',
				'points' => 22,
				'round' => 2,
			],
			[
				'title' => 'Ouragan',
				'video_file' => ' ',
				'artist' => 'Stephanie de Monaco',
				'lyrics_to_find' => 'Ai-je eu raison ou tort de t\'aimer tellement fort',
				'points' => 22,
				'round' => 2,
			],
			[
				'title' => 'Quand la musique est bonne',
				'video_file' => ' ',
				'artist' => 'J-J Goldman',
				'lyrics_to_find' => 'J\'ai plus qu\'un clou une étincelle Des trucs en plomb qui me brisent les ailes',
				'points' => 34,
				'round' => 2,
			],
			[
				'title' => 'Trois nuits par semaine',
				'video_file' => ' ',
				'artist' => 'Indochine',
				'lyrics_to_find' => 'Elle caressa en douceur comme pour oublier sa douleur',
				'points' => 18,
				'round' => 2,
			],
			[
				'title' => 'Mourir demain',
				'video_file' => ' ',
				'artist' => 'Natasha St Pier + Pascal Obispo',
				'lyrics_to_find' => 'Et toi, dis moi, est-ce que tu m\'aimera Jusqu\'à demain et tous les jours d\'après',
				'points' => 38,
				'round' => 2,
			],
			[
				'title' => 'Belle',
				'video_file' => ' ',
				'artist' => 'Garou, Patrick Fiori, Daniel Lavoie',
				'lyrics_to_find' => 'Qu\'on prenait pour une fille de joie, une fille de rien Semnle soudain porter la croix du genre humain',
				'points' => 40,
				'round' => 2,
			],
			[
				'title' => 'Diégo',
				'video_file' => ' ',
				'artist' => 'Johnny Halliday',
				'lyrics_to_find' => 'Et moi qui danse ma vie Qui chante et qui rit Je pense à lui',
				'points' => 30,
				'round' => 2,
			],
			[
				'title' => 'La lettre',
				'video_file' => ' ',
				'artist' => 'Renan Luce',
				'lyrics_to_find' => 'Qui ne l\'était pas tant Au regard du profil Qu\'un petit habitant Lui f\'sait sous le nombril',
				'points' => 38,
				'round' => 2,
			],
			[
				'title' => 'Ma philosophie',
				'video_file' => ' ',
				'artist' => 'Amel Bent',
				'lyrics_to_find' => 'Bien plus d\'amour que de misère Bien plus de coeur que de pierre',
				'points' => 28,
				'round' => 2,
			],
			[
				'title' => 'Emmenez-moi',
				'video_file' => ' ',
				'artist' => 'Charles Aznavour',
				'lyrics_to_find' => 'Sans aucun remords Sans bagage et le coeur libéré En chantant très fort',
				'points' => 26,
				'round' => 2,
			],
		];

		Song::insert($song_array);

		// Song::factory()->count(40)->create();
		// Player::factory()->count(20)->create();
		// Game::factory()->count(5)->create();

		// $games = Game::all();
		// $teams = [];
		// foreach ($games as $game) {
		// 	$teams_amount = $faker->numberBetween(3, 5);
		// 	$data = Team::factory($teams_amount)->raw([
		// 		'game_id' => $game->id
		// 	]);
		// 	$teams = array_merge($teams, $data);
		// }
		// Team::insert($teams);

		// $players = Player::all();
		// $team_players = [];
		// $team_jokers = [];
		// $rounds = [];
		// foreach ($games as $game) {
		// 	$teams = $game->teams;
		// 	$available_player_ids = $players->pluck('id')->toArray();
		// 	foreach ($teams as $team) {
		// 		$players_amount = $faker->numberBetween(3, 4);
		// 		for ($i = 0; $i < $players_amount; $i++) {
		// 			$random_player_id = $faker->randomElement($available_player_ids);
		// 			$team_players[] = [
		// 				'team_id' => $team->id,
		// 				'player_id' => $random_player_id
		// 			];
		// 			$available_player_ids = array_diff($available_player_ids, [$random_player_id]);
		// 		}
		// 		$team_jokers[] = [
		// 			'team_id' => $team->id,
		// 			'type' => 'half',
		// 			'amount' => 3
		// 		];
		// 		$team_jokers[] = [
		// 			'team_id' => $team->id,
		// 			'type' => 'friend_call',
		// 			'amount' => 3
		// 		];
		// 		$team_jokers[] = [
		// 			'team_id' => $team->id,
		// 			'type' => 'times_two',
		// 			'amount' => 3
		// 		];
		// 		$team_jokers[] = [
		// 			'team_id' => $team->id,
		// 			'type' => 'song_steal',
		// 			'amount' => 3
		// 		];
		// 	}

		// 	$rounds_amount = $faker->numberBetween(2,3);
		// 	for ($i = 0; $i < $rounds_amount; $i++) {
		// 		$rounds[] = [
		// 			'game_id' => $game->id,
		// 			'name' => 'Round ' . ($i + 1),
		// 			'order' => $i + 1
		// 		];
		// 	}
		// }

		// TeamPlayer::insert($team_players);
		// TeamJoker::insert($team_jokers);
		// Round::insert($rounds);

		// $songs = Song::all();

		// $round_songs = [];

		// foreach ($games as $game) {
		// 	$rounds = $game->rounds;
		// 	$available_song_ids = $songs->pluck('id')->toArray();
		// 	foreach ($rounds as $round) {
		// 		$songs_amount = $faker->numberBetween(3, 5);
		// 		for ($i = 0; $i < $songs_amount; $i++) {
		// 			$random_song_id = $faker->randomElement($available_song_ids);
		// 			$completed = $game->ended_at ? $faker->boolean(50) : false;
		// 			$round_songs[] = [
		// 				'round_id' => $round->id,
		// 				'song_id' => $random_song_id,
		// 				'completed' => $completed,
		// 				'success' => $completed ? $faker->boolean(50) : null,
		// 				'team_id' => $completed ? $faker->randomElement($game->teams->pluck('id')->toArray()) : null
		// 			];
		// 			$available_song_ids = array_diff($available_song_ids, [$random_song_id]);
		// 		}
		// 	}
		// }

		// RoundSong::insert($round_songs);
	}
}
