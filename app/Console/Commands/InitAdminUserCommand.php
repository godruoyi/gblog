<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class InitAdminUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gblog:adduser';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add a admin account.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email    = $this->ask('What is your email?');
        $name     = $this->ask('Waht is your name?');
        $password = $this->secret('Waht is the password?');

        $user = User::create([
            'name'       => $name,
            'email'      => $email,
            'password'   => bcrypt($password),
            'created_at' => \Carbon\Carbon::now()
        ]);

        $this->info('Created user successfull, this user id is:'. $user->id);
    }
}
