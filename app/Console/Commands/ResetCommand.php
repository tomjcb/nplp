<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ResetCommand extends Command
{
	protected $signature = 'db:reset';

	protected $description = 'Command that is a combination of migrate fresh and db seed';

	public function handle(): void
	{
		$nplp_db_name = env('NPLP_DATABASE', 'nplp');
		//DB::statement("CREATE DATABASE IF NOT EXISTS {$nplp_db_name}");

		$this->info("Executing migrate:fresh...");
		$this->call('migrate:fresh');

		$this->info('Executing db:seed...');
		$this->call('db:seed');

		console_success($this, "{$nplp_db_name} database migrated and seeded");
	}
}
