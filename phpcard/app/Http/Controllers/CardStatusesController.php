<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CardStatus;

class CardStatusesController extends Controller
{
    public function index()
    {
        return CardStatus::all();
    }
}
