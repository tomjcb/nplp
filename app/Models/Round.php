<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 *
 *
 * @property int $id
 * @property int $game_id
 * @property string $name
 * @property int $order
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Round whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Round extends Model
{
	protected $fillable = [
		'name',
		'game_id',
		'order'
	];

	public function game(): BelongsTo
	{
		return $this->belongsTo(Game::class, 'game_id', 'id');
	}

	public function roundSongs(): HasMany
	{
		return $this->hasMany(RoundSong::class, 'round_id', 'id');
	}

	public function songs(): HasManyThrough
	{
		return $this->hasManyThrough(Song::class, RoundSong::class, 'round_id', 'song_id');
	}
}
