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

$factory->define(App\Models\Link::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'logo' => '',
        'description' => $faker->text,
        'link' => $faker->url,
        'type' => $faker->randomElement(['left', 'bottom']),

        'created_at'  => \Carbon\Carbon::now(),
        'updated_at'  => \Carbon\Carbon::now(),
    ];
});
