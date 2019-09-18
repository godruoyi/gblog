@extends('admin.layouts.layout')
@section('title', '评论创建/编辑')
@push('styles')
    <style>
        .voyager input[type=file] {padding: 6px;}
        .user-avatar {width:120px; height:auto; clear:both; display:block; padding:2px; border:1px solid #ddd; margin-bottom:10px;}
    </style>
@endpush

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-group"></i> 评论
        </h1>
        <a href="{{ route('admin.comments.index') }}" class="btn btn-success">
            <i class="voyager-list"></i> <span>返回评论列表</span>
        </a>
    </div>

    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <form role="form" class="form-horizontal"
                        action="{{ isset($comment) ? route('admin.comments.update', $comment->id) : route('admin.comments.store') }}"
                        method="POST"
                        accept-charset="UTF-8">
                        <div class="panel-body">
                            {{ csrf_field() }}
                            @isset($comment)
                                {{ method_field('PUT') }}
                            @endisset

                            @include('admin.layouts.partials.errors')

                            <div class="form-group">
                                <label for="password_confirmation" class="col-sm-2 control-label">评论内容</label>
                                <div class="col-sm-10">
                                    <textarea name="content" class="form-control" id="content" cols="30" rows="10">{{ $comment ? $comment->content : '' }}</textarea>
                                </div>
                            </div>
                            <button type="submit" class="col-sm-2 col-md-offset-2 btn btn-primary"> 保 存</button>
                        </div><!-- panel-body -->
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
