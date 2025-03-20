<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class SongController extends Controller
{
	public function index()
	{
		$songs = Song::orderBy('round')->get();

		return Inertia::render('Songs/Index', [
			'songs' => $songs
		]);
	}

	public function show(Song $song)
	{
		return Inertia::render('Songs/Show', [
			'song' => $song
		]);
	}

	public function create()
	{
		return Inertia::render('Songs/Create');
	}

	public function store(Request $request)
	{
		Log::info('Début de la création de la chanson', [
			'request' => $request->all(),
			'files' => $request->allFiles(),
			'has_file' => $request->hasFile('video_file'),
			'file_valid' => $request->file('video_file') ? $request->file('video_file')->isValid() : false,
			'file_size' => $request->file('video_file') ? $request->file('video_file')->getSize() : 0,
			'file_name' => $request->file('video_file') ? $request->file('video_file')->getClientOriginalName() : null,
		]);

		// Vérifier si le fichier est présent
		if (!$request->hasFile('video_file')) {
			Log::error('Aucun fichier vidéo n\'a été envoyé');
			return back()->withErrors(['video_file' => 'Le fichier vidéo est requis.']);
		}

		// Vérifier si le fichier est valide
		if (!$request->file('video_file')->isValid()) {
			Log::error('Le fichier vidéo n\'est pas valide', [
				'error' => $request->file('video_file')->getError()
			]);
			return back()->withErrors(['video_file' => 'Le fichier vidéo n\'est pas valide.']);
		}

		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'artist' => 'required|string|max:255',
			'video_file' => 'required|file|mimes:mp4,mpeg4',
			'lyrics_to_find' => 'required|string',
			'round' => 'required|integer',
			'points' => 'required|integer',
		]);

		Log::info('Validation réussie', ['validated' => $validated]);

		try {
			// Générer un nom de fichier unique
			$fileName = Str::uuid() . '.mp4';
			
			// Stocker le fichier
			$path = $request->file('video_file')->storeAs('videos', $fileName, 'public');

			Log::info('Fichier stocké', [
				'path' => $path,
				'original_name' => $request->file('video_file')->getClientOriginalName(),
				'mime_type' => $request->file('video_file')->getMimeType(),
				'size' => $request->file('video_file')->getSize(),
			]);

			// Créer la chanson avec le nom du fichier
			$song = Song::create([
				'title' => $validated['title'],
				'artist' => $validated['artist'],
				'video_file' => $fileName,
				'lyrics_to_find' => $validated['lyrics_to_find'],
				'round' => $validated['round'],
				'points' => $validated['points'],
			]);

			Log::info('Chanson créée', ['song' => $song]);

			return redirect()->route('songs.index')
				->with('message', 'Chanson créée avec succès.');
		} catch (\Exception $e) {
			Log::error('Erreur lors de la création de la chanson', [
				'error' => $e->getMessage(),
				'trace' => $e->getTraceAsString()
			]);
			throw $e;
		}
	}

	public function edit(Song $song)
	{
		return Inertia::render('Songs/Edit', [
			'song' => $song
		]);
	}

	public function update(Request $request, Song $song)
	{
		Log::info('Début de la mise à jour de la chanson', [
			'request' => $request->all(),
			'files' => $request->allFiles()
		]);

		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'artist' => 'required|string|max:255',
			'video_file' => 'nullable|file|mimes:mp4',
			'lyrics_to_find' => 'required|string',
			'round' => 'required|integer',
			'points' => 'required|integer',
		]);

		Log::info('Validation réussie', ['validated' => $validated]);

		try {
			// Si un nouveau fichier est uploadé
			if ($request->hasFile('video_file')) {
				// Supprimer l'ancien fichier
				if ($song->video_file) {
					Storage::disk('public')->delete('videos/' . $song->video_file);
				}

				// Générer un nouveau nom de fichier unique
				$fileName = Str::uuid() . '.mp4';
				
				// Stocker le nouveau fichier
				$path = $request->file('video_file')->storeAs('videos', $fileName, 'public');

				Log::info('Nouveau fichier stocké', ['path' => $path]);

				// Mettre à jour le nom du fichier
				$validated['video_file'] = $fileName;
			} else {
				// Si aucun nouveau fichier n'est fourni, on garde l'ancien
				unset($validated['video_file']);
			}

			$song->update($validated);

			Log::info('Chanson mise à jour', ['song' => $song]);

			return redirect()->route('songs.index')
				->with('message', 'Chanson mise à jour avec succès.');
		} catch (\Exception $e) {
			Log::error('Erreur lors de la mise à jour de la chanson', [
				'error' => $e->getMessage(),
				'trace' => $e->getTraceAsString()
			]);
			throw $e;
		}
	}

	public function destroy(Song $song)
	{
		try {
			// Supprimer le fichier vidéo
			if ($song->video_file) {
				Storage::disk('public')->delete('videos/' . $song->video_file);
			}

			$song->delete();

			if (request()->wantsJson()) {
				return response()->json(['message' => 'Chanson supprimée avec succès.']);
			}

			return redirect()->route('songs.index')
				->with('message', 'Chanson supprimée avec succès.');
		} catch (\Exception $e) {
			Log::error('Erreur lors de la suppression de la chanson', [
				'error' => $e->getMessage(),
				'trace' => $e->getTraceAsString()
			]);
			throw $e;
		}
	}

	public function togglePlayed(Song $song)
	{
		$song->update([
			'has_been_played' => !$song->has_been_played
		]);

		return back();
	}
}
