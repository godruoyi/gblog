<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SendCategoriesData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $createdAt = \Carbon\Carbon::now();

        DB::table('categories')->insert([
            [
                'slug'        => 'php',
                'name'        => 'PHP',
                'description' => 'This is php category',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
            [
                'slug'        => 'life',
                'name'        => 'Life',
                'description' => 'This is my life',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
            [
                'slug'        => 'other',
                'name'        => 'Other',
                'description' => 'I xxx',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
