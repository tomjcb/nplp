<?php

namespace App\Models;

use Database\Factories\SongFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $artist
 * @property string $video_file
 * @property string $lyrics_to_find
 * @property string $lyrics_time_code
 * @property int $points
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\TFactory|null $use_factory
 * @method static \Database\Factories\SongFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereArtist($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereLyricsTimeCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereLyricsToFind($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereYoutubeLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song withoutTrashed()
 * @mixin \Eloquent
 */
class Song extends Model
{
	use HasFactory;
	use SoftDeletes;

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
		'video_file',
		'lyrics_to_find',
		'lyrics_time_code',
		'points',
		'round',
		'has_been_played'
	];

	protected static function newFactory()
	{
		return SongFactory::new();
	}
}
