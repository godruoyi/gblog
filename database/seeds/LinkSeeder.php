<?php

use Illuminate\Database\Seeder;

use App\Models\Link;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Links = factory(Link::class)->times(10)->make()->toArray();

        Link::insert($Links);
    }
}
