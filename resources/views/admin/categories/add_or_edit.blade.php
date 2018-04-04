@extends('admin.layouts.layout')

@section('title', isset($category) ? '编辑分类' : '创建分类')

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-group"></i> 分类
        </h1>
        <a href="{{ route('admin.categories.index') }}" class="btn btn-success">
            <i class="voyager-list"></i> <span>返回分类列表</span>
        </a>
    </div>

    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <form role="form" class="form-horizontal"
                        action="{{ isset($category) ? route('admin.categories.update', $category->id) : route('admin.categories.store') }}"
                        method="POST" enctype="multipart/form-data"
                        accept-charset="UTF-8">
                        <div class="panel-body">
                            {{ csrf_field() }}
                            @isset($category)
                                {{ method_field('PUT') }}
                            @endisset

                            @include('admin.layouts.partials.errors')

                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">名称</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="请输入分类名称" value="{{ isset($category) ? $category->name : old('name') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="col-sm-2 control-label">分类标题</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="title" id="title" placeholder="请输入分类标题" value="{{ isset($category) ? $category->title : old('title') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description" class="col-sm-2 control-label">描述</label>
                                <div class="col-sm-8">
                                    <textarea name="description" class="form-control" id="description" rows="4" cols="80" placeholder="请输入分类描述">{{ isset($category) ? $category->description : old('description') }}</textarea>
                                </div>
                            </div>

                            <button type="submit" class="col-md-offset-2 btn btn-primary"> 保 存</button>
                        </div><!-- panel-body -->
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
