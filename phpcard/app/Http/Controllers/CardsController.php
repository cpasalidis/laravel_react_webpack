<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Card;

class CardsController extends Controller
{
 
    public function index()
    {
        return Card::all();
    }
 
    public function show(Card $card)
    {
        return $card;
    }
 
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|unique:cards|max:255',
            'description' => 'required',
        ]);
        $card = Card::create($request->all());
 
        return response()->json($card, 201);
    }
 
    public function update(Request $request, Card $card)
    {
        $card->update($request->all());
 
        return response()->json($card, 200);
    }
 
    public function delete(Card $card)
    {
        $card->delete();
 
        return response()->json(null, 204);
    }
 
}
