<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Transformers\CategoryTransformer;
use App\Transformers\PostTransformer;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->response->paginator(Category::paginate(4), new CategoryTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $where = is_numeric($id) ? ['id' => $id] : ['slug' => $id];

        $category  = Category::where($where)->firstOrFail();

        return $this->response->item($category, new CategoryTransformer);
    }

    /**
     * Current category posts
     *
     * @return \Illuminate\Http\Response
     */
    public function posts($id)
    {
        $where = is_numeric($id) ? ['id' => $id] : ['slug' => $id];

        $category  = Category::where($where)->firstOrFail();

        return $this->response->paginator($category->posts()
            ->isNotDraft()
            ->select('id', 'title', 'slug', 'user_id', 'category_id', 'banner')->paginate(9), new PostTransformer)
            ->addMeta('category', $category->setVisible(['id', 'name', 'slug', 'description', 'title']));
    }
}
