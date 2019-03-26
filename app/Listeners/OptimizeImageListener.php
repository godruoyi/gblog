<?php

namespace App\Listeners;

use App\Events\OptimizeImageEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class OptimizeImageListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OptimizeImageEvent  $event
     * @return void
     */
    public function handle(OptimizeImageEvent $event)
    {
        //
    }
}
