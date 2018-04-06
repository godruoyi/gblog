<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Console\Input\InputOption;

class GblogInstall extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gblog:install {--T|test : Generate test data for gblog}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install gblog';

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
        $this->info('Migrating the database tables into your application.');
        $this->call('migrate');

        $this->info('Dumping the autoloaded files and reloading all new files.');

        $process = new Process('composer dump-autoload');
        $process->setWorkingDirectory(base_path())->run();

        \Log::error('options', $this->options());

        if ($this->option('test')) {
            $this->getLaravel()->make('GblogDatabaseSeeder')->run();
        }

        $this->info('Adding the storage symlink to your public folder');
        $this->call('storage:link');

        $this->info('Successfully installed gblog! Enjoy');
    }
}
