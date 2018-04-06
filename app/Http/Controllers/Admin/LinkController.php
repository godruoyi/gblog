<?php

namespace App\Http\Controllers\Admin;

use App\Models\Link;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LinkRequest;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.links.index')->with(['links' => Link::orderBy('created_at', 'desc')->paginate()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Link $link)
    {
        return view('admin.links.add_or_edit')->with(compact('link'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LinkRequest $request)
    {
        Link::create($request->prepare());

        flash('新增友链成功！')->success();

        return redirect(route('admin.links.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $link = Link::findOrFail($id);

        return view('admin.links.add_or_edit')->with(compact('link'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $link = Link::findOrFail($id);

        return view('admin.links.add_or_edit')->with(compact('link'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LinkRequest $request, $id)
    {
        Link::findOrFail($id)->update($request->prepare());

        flash('更新友链成功！')->success();

        return redirect(route('admin.links.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Link::findOrFail($id)->delete();

        flash('删除链接成功！')->success();

        return redirect(route('admin.links.index'));
    }
}
