<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('title', '191')->index();
            $table->string('slug', '191')->nullable()->index();

            $table->integer('order')->default(0);
            $table->enum('is_draft', ['yes', 'no'])->index()->default('no');
            $table->string('banner')->nullable();

            $table->integer('reply_count')->default(0)->index();
            $table->integer('view_count')->default(0)->index();

            $table->text('content')->nullable();
            $table->text('excerpt')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
