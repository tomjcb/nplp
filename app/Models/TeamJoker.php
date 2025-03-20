<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property int $id
 * @property int $team_id
 * @property string $type
 * @property int $amount
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeamJoker whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TeamJoker extends Model
{
	protected $fillable = [
		'team_id',
		'type',
		'amount',
	];

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class, 'team_id', 'id');
	}
}
