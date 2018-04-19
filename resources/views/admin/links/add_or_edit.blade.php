@extends('admin.layouts.layout')
@section('title', $link->id > 0 ? '编辑友链' : '新增友链')
@push('styles')
    <style>
        .voyager input[type=file] {padding: 6px;}
        .user-avatar {width:120px; height:auto; clear:both; display:block; padding:2px; border:1px solid #ddd; margin-bottom:10px;}
    </style>
@endpush

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-anchor"></i> 友情链接
        </h1>
        <a href="{{ route('admin.links.index') }}" class="btn btn-success">
            <i class="voyager-list"></i> <span>返回列表</span>
        </a>
    </div>

    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <form role="form" class="form-horizontal"
                        action="{{ $link->id > 0 ? route('admin.links.update', $link->id) : route('admin.links.store') }}"
                        method="POST" enctype="multipart/form-data"
                        accept-charset="UTF-8">
                        <div class="panel-body">
                            {{ csrf_field() }}
                            @if($link->id > 0)
                                {{ method_field('PUT') }}
                            @endif

                            @include('admin.layouts.partials.errors')

                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">名 称</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="请输入链接名称" value="{{ $link->name ?? old('name') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="link" class="col-sm-2 control-label">链 接</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="link" id="link" placeholder="请输入链接地址" value="{{ $link->link ?? old('link') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="link" class="col-sm-2 control-label">类 型</label>
                                <div class="col-sm-8">
                                    <select class="form-control" name="type" placeholder="请选择链接类型">
                                        <option value="">请选择链接类型</option>
                                        <option value="left" {{ $link->type === 'left' ? 'selected' : '' }}>left</option>
                                        <option value="bottom" {{ $link->type === 'bottom' ? 'selected' : '' }}>bottom</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="description" class="col-sm-2 control-label">描 述</label>
                                <div class="col-sm-8">
                                    <textarea name="description" class="form-control" id="description" rows="4" cols="80" placeholder="请输入链接描述">{{ $link->description ?? old('description') }}</textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="logo" class="col-sm-2 control-label">Logo</label>
                                <div class="col-sm-8">
                                    @if(! empty($link->logo))
                                        <img src="{{ $link->logo }}" class="user-avatar">
                                    @endif
                                    <input type="file" class="form-control" name="logo" id="logo">
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
