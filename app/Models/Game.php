<?php

namespace App\Models;

use Database\Factories\GameFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 *
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $started_at
 * @property string|null $ended_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property Team[] $teams
 * @property Round[] $rounds
 * @method static \Database\Factories\GameFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereEndedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Game withoutTrashed()
 * @mixin \Eloquent
 */
class Game extends Model
{
	use SoftDeletes;
	use HasFactory;
	protected $fillable = [
		'name',
		'started_at',
		'ended_at',
	];

	public function teams(): HasMany
	{
		return $this->hasMany(Team::class, 'game_id', 'id');
	}

	public function rounds(): HasMany
	{
		return $this->hasMany(Round::class, 'game_id', 'id');
	}

	public static function newFactory()
	{
		return GameFactory::new();
	}
}
