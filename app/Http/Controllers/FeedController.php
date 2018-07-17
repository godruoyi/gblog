<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::isNotDraft()->orderBy('created_at', 'desc')->get();
        $lastcreateAt = $posts->first()->updated_at;

        return response()->view('feed.index', ['items' => $posts, 'lastat' => $lastcreateAt])->header('Content-Type', 'text/xml');
    }
}
