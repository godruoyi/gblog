<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Support\Uploader;
use App\Http\Requests\Admin\PostRequest;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with('category', 'user')->orderBy('created_at', 'desc')->paginate(8);

        return view('admin.posts.index')->with(compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Post $post)
    {
        return view('admin.posts.add_or_edit', ['categories' => Category::all(), 'post' => $post]);
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

        return view('admin.posts.add_or_edit')->with(compact('post', 'categories'));
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

        return view('admin.posts.add_or_edit')->with(compact('post', 'categories'));
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

        return redirect(route('admin.posts.index'));
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
     * 编辑器文件上传，文章内图，只优化，不裁剪
     */
    public function sieditorUpload(Request $request)
    {
        if ($request->upload_files && ($path = Uploader::optimizeUpload($request->upload_files, 'posts'))) {
            return [
                'filename' => $path
            ];
        }

        return ['error' => '上传失败'];
    }

    /**
     * Slim 文件上传，文字 banner 图，只优化，不裁剪
     *
     * @param  Request            $request
     *
     * @return mixed
     */
    public function slimFileUpload(Request $request)
    {
        $file = collect($request->allFiles())->first();
        if (! is_null($file)) {
            $path = Uploader::optimizeUpload($file, 'banners');

            return ['status' => 'success', 'name' => $file->getClientOriginalName(), 'path' => $path];
        }

        return response('上传失败!', 400);
    }
}
