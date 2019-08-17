<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Support\Downloader;
use App\Support\Uploader;
use App\Support\ImageOptimizer;
use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Console\Input\InputOption;

class OptimizePostBanner extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gblog:post_banner_optimize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimoze post banners';

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
        Post::all(['id', 'banner'])->each(function ($post) {
            if (! \Cache::has($key = ('banner-optimize:' . $post->id))) {
                $path = Uploader::optimizeUpload($post->banner, 'logos');

                $post->fill(['banner' => $path])->save();

                \Cache::put($key, 1);

                $this->info('Update new banner success, post id:' . $post->id);
            }
        });

        $this->info('Successfully installed gblog! Enjoy');
    }
}
