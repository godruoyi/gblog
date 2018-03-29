<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\Post::class, function (Faker $faker) {
    return [
        'title'       => $faker->sentence,
        'slug'        => $faker->unique()->slug,
        'banner'      => '/vendor/images/detail-bg.jpg',
        'content'     => $faker->text,
        'excerpt'     => $faker->text(200),

        'created_at'  => \Carbon\Carbon::now(),
        'updated_at'  => \Carbon\Carbon::now(),
    ];
});
