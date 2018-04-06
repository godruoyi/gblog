<?php

use Illuminate\Database\Seeder;

class GblogDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(LinkSeeder::class);
        $this->call(PostSeeder::class);
    }
}
