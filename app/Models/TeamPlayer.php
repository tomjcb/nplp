<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property int $id
 * @property int $team_id
 * @property int $player_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer wherePlayerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamPlayer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TeamPlayer extends Model
{
	protected $fillable = [
		'team_id',
		'player_id',
	];

	public function player(): BelongsTo
	{
		return $this->belongsTo(Player::class, 'player_id', 'id');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class, 'team_id', 'id');
	}
}
