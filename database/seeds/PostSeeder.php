<?php

use Illuminate\Database\Seeder;

use App\Models\Post;
use App\Models\Category;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker       = app(Faker\Generator::class);
        $categoryIds = Category::all()->pluck('id')->toArray();

        $posts = factory(Post::class)->times(100)->make()->each(function ($post) use ($faker, $categoryIds) {
            $post->user_id     = 1;
            $post->category_id = $faker->randomElement($categoryIds);
        })->toArray();

        Post::insert($posts);
    }
}
