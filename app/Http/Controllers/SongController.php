<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class SongController extends Controller
{
	public function index()
	{
		$songs = Song::latest()->paginate(10);

		return Inertia::render('Songs/Index', [
			'songs' => $songs
		]);
	}
	public function create()
	{
		return Inertia::render('Songs/Create');
	}

	public function store(Request $request)
	{
		$validated = $request->all();

		$song = Song::create($validated);

		return redirect()->route('songs.index')
			->with('message', 'Chanson créée avec succès.');
	}

	public function edit(Song $song)
	{
		return Inertia::render('Songs/Edit', [
			'song' => $song
		]);
	}

	public function update(Request $request, Song $song)
	{
		$validated = $request->all();

		$song->update($validated);

		return redirect()->route('songs.index')
			->with('message', 'Chanson mise à jour avec succès.');
	}

	public function destroy(Song $song)
	{
		$song->delete();

		if (request()->wantsJson()) {
			return response()->json(['message' => 'Chanson supprimée avec succès.']);
		}

		return redirect()->route('songs.index')
			->with('message', 'Chanson supprimée avec succès.');
	}
}
