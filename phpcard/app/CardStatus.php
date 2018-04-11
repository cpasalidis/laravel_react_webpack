<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CardStatus extends Model
{
    protected $table = 'card_statuses'; 
    public $incrementing = false;
    //

    /**
     * get the cards on this status
     */
    public function cards() {
        return $this->hasMany('App\Card','card_status_id');
    }
}
