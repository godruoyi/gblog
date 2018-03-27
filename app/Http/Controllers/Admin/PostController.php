<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Handlers\ImageUploadHandler;
use App\Http\Requests\Admin\PostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with('category', 'user')->paginate();

        return view('admin.posts.index')->with(compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.posts.create', ['categories' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request, Post $post)
    {
        $post->fill($request->prepareStorePost());
        $post->user_id = \Auth::id();
        $post->save();

        flash('文章发布成功！')->success();

        return redirect()->route('admin.posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categories = Category::all();
        $post       = Post::findOrFail($id);

        return view('admin.posts.edit')->with(compact('post', 'categories'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $categories = Category::all();
        $post       = Post::findOrFail($id);

        return view('admin.posts.edit')->with(compact('post', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $id)
    {
        Post::findOrFail($id)->update($request->prepareUpdatePost());

        flash('更新文章成功！')->success();

        return redirect(route('admin.posts.show', $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::findOrFail($id)->delete();

        flash('删除文章成功')->success();

        return redirect(route('admin.posts.index'));
    }

    /**
     * 编辑器文件上传
     */
    public function sieditorUpload(Request $request, ImageUploadHandler $uploader)
    {
        if ($request->upload_files && ($path = $uploader->resize(500)->upload($request->upload_files, 'posts', \Auth::id()))) {
            return [
                'filename' => $path
            ];
        }

        return ['error' => '上传失败'];
    }
}
