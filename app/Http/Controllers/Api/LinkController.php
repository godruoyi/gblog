<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Link;
use App\Transformers\LinkTransformer;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->response->collection(Link::all(), new LinkTransformer);
    }
}
