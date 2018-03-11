<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as BaseController;

class Controller extends BaseController
{
    public function success(string $message = 'Success')
    {
    }

    public function error(string $message = 'Error')
    {
    }
}
