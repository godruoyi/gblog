<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class QueryLogListener
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
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        if (app()->environment() == 'local') {
            $sql = str_replace("?", "'%s'", $event->sql);

            $log = vsprintf($sql, $event->bindings);

            \Log::info($log);
        }
    }
}
