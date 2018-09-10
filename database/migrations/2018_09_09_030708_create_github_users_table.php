<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGithubUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('github_users', function (Blueprint $table) {
            $table->increments('id');

            $table->string('username', 100)->index();
            $table->string('nickname', 100)->index();
            $table->string('name', 100)->index();
            $table->string('email', 100)->index();

            $table->string('avatar')->nullable();
            $table->string('html_url')->nullable();
            $table->string('company')->nullable();

            $table->string('blog', 191)->nullable();

            $table->string('location')->nullable();
            $table->string('bio')->nullable();

            $table->integer('public_repos')->index()->default(0)->index();
            $table->integer('followers')->index()->default(0)->index();
            $table->integer('following')->index()->default(0)->index();

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
        Schema::dropIfExists('github_users');
    }
}
