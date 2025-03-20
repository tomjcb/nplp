<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property int $id
 * @property int $round_id
 * @property int $song_id
 * @property int|null $team_id
 * @property int $completed
 * @property int|null $success
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereRoundId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereSongId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereSuccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoundSong whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RoundSong extends Model
{
	protected $fillable = [
		'round_id',
		'song_id',
		'completed',
		'success',
	];

	public function round(): BelongsTo
	{
		return $this->belongsTo(Round::class, 'round_id', 'id');
	}

	public function song(): BelongsTo
	{
		return $this->belongsTo(Song::class, 'song_id', 'id');
	}
}
