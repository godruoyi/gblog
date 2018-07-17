<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function index()
    {
        $post     = Post::isNotDraft()->orderBy('created_at', 'desc')->first();
        $category = Category::orderBy('created_at', 'desc')->first();

        return response()->view('sitemap.index', compact('post', 'category'))->header('Content-Type', 'text/xml');
    }

    public function posts()
    {
        $posts = Post::isNotDraft()->get();

        return response()->view('sitemap.posts', compact('posts'))->header('Content-Type', 'text/xml');
    }

    public function categories()
    {
        $categories = Category::all();

        return response()->view('sitemap.categories', compact('categories'))->header('Content-Type', 'text/xml');
    }
}
