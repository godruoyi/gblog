<?php

use Illuminate\Database\Seeder;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(User::class)->times(10)->make()->toArray();

        $users[0]['email'] = 'admin@admin.com';

        User::insert($users);
    }
}
