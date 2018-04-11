<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCardStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('card_statuses', function (Blueprint $table) {
            DB::table('card_statuses')->insert(
                array(
                    array('id'=> 1,'description'=>'ACTIVE'),
                    array('id'=> 2,'description'=>'COMPLETED'),
                    array('id'=> 3,'description'=>'SCHEDULED'),
                    array('id'=> 4,'description'=>'PAUSED'),
                    array('id'=> 5,'description'=>'CANCELLED')
                )
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('card_statuses', function (Blueprint $table) {
            $table->whereIn('id',[1,2,3,4,5])->delete();
        });
    }
}
