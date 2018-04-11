<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    //
    protected $fillable = ['title','description','imgurl','card_status_id'];

    /** 
     * Get the status of this card
     */
    public function status() {
        return $this->belongsTo('App\CardStatus','card_status_id');
    }
}
