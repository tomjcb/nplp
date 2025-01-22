<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 * @property int $id
 * @property string $title Le titre de la chanson
 * @property string $artist L'artiste de la chanson
 * @property string $youtube_link Le lien YouTube de la chanson
 * @property string $round La manche/round du jeu
 * @property int $points Le nombre de points attribués
 * @property string $lyrics_to_find Les paroles à trouver
 * @property string $lyrics_time_code Le time code des paroles dans la vidéo
 * @property string $created_at Date de création
 * @property string $updated_at Date de dernière modification
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Song newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Song newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Song query()
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereArtist($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereYoutubeLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereRound($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereLyricsToFind($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereLyricsTimeCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Song whereUpdatedAt($value)
 */
class Song extends Model
{
	/**
	 * La table associée au modèle.
	 *
	 * @var string
	 */
	protected $table = 'songs';

	/**
	 * Les attributs qui sont mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'title',
		'artist',
		'youtube_link',
		'round',
		'points',
		'lyrics_to_find',
		'lyrics_time_code',
	];
}
