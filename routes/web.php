<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SongController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
	Route::get('/songs', [SongController::class, 'index'])->name('songs.index');
	Route::get('/songs/create', [SongController::class, 'create'])->name('songs.create');
	Route::post('/songs', [SongController::class, 'store'])->name('songs.store');
	Route::get('/songs/{song}/edit', [SongController::class, 'edit'])->name('songs.edit');
	Route::put('/songs/{song}', [SongController::class, 'update'])->name('songs.update');
	Route::delete('/songs/{song}', [SongController::class, 'destroy'])->name('songs.destroy');
});

require __DIR__.'/auth.php';
