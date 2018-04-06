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

        User::insert($users);

        if ($user = User::find(1)) {
            $user->email = 'admin@admin.com';
            $user->save();
        }
    }
}
