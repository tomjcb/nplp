<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with('players')
            ->latest()
            ->paginate(5);

        $games = Game::all();

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
            'games' => $games
        ]);
    }

    public function create()
    {
        $games = Game::all();
        
        return Inertia::render('Teams/Create', [
            'games' => $games
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'game_id' => 'required|exists:games,id'
        ]);

        $team = Team::create($validated);

        return redirect()->route('teams.index')
            ->with('message', 'Équipe créée avec succès.');
    }

    public function edit(Team $team)
    {
        $games = Game::all();
        
        return Inertia::render('Teams/Edit', [
            'team' => $team->load('players'),
            'games' => $games
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'game_id' => 'required|exists:games,id'
        ]);

        $team->update($validated);

        return redirect()->route('teams.index')
            ->with('message', 'Équipe mise à jour avec succès.');
    }

    public function destroy(Team $team)
    {
        $team->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Équipe supprimée avec succès.']);
        }

        return redirect()->route('teams.index')
            ->with('message', 'Équipe supprimée avec succès.');
    }
} 