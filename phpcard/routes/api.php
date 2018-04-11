<?php

use Illuminate\Http\Request;
use App\Card;
use App\CardStatus;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
** Basic Routes for a RESTful service:
**
** Route::get($uri, $callback);
** Route::post($uri, $callback);
** Route::put($uri, $callback);
** Route::delete($uri, $callback);
**
**/
 
Route::get('cards', 'CardsController@index');
 
Route::get('cards/{card}', 'CardsController@show');
 
Route::post('cards','CardsController@store');
 
Route::put('cards/{card}','CardsController@update');
 
Route::delete('cards/{card}', 'CardsController@delete');

Route::get('card_statuses','CardStatusesController@index');