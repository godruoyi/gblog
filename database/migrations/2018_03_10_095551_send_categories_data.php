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
                'title'       => 'This is php category',
                'description' => 'PHP 是世界上最好的语言！',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
            [
                'slug'        => 'life',
                'name'        => '生活',
                'title'       => 'This is my life',
                'description' => '生活不止眼前的枸杞，还有保温杯！',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
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
