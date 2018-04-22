@extends('admin.layouts.layout')
@section('title', '用户创建/编辑')
@push('styles')
    <style>
        .voyager input[type=file] {padding: 6px;}
        .user-avatar {width:120px; height:auto; clear:both; display:block; padding:2px; border:1px solid #ddd; margin-bottom:10px;}
    </style>
@endpush

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-group"></i> 用户
        </h1>
        <a href="{{ route('admin.users.index') }}" class="btn btn-success">
            <i class="voyager-list"></i> <span>返回用户列表</span>
        </a>
    </div>

    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <form role="form" class="form-horizontal"
                        action="{{ isset($user) ? route('admin.users.update', $user->id) : route('admin.users.store') }}"
                        method="POST" enctype="multipart/form-data"
                        accept-charset="UTF-8">
                        <div class="panel-body">
                            {{ csrf_field() }}
                            @isset($user)
                                {{ method_field('PUT') }}
                            @endisset

                            @include('admin.layouts.partials.errors')

                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">姓 名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="请输入姓名" value="{{ isset($user) ? $user->name : old('name') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-sm-2 control-label">邮 箱</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="请输入邮箱" value="{{ isset($user) ? $user->email : old('email') }}">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-sm-2 control-label">密 码</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" name="password" id="password" placeholder="请输入密码">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation" class="col-sm-2 control-label">确认密码</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" name="password_confirmation" id="password_confirmation" placeholder="请输入确认密码">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-offset-2 col-sm-8">
                                    <div class="slim user-avatar"
                                        data-size="240,240"
                                        data-service="/slim/imageupload"
                                        data-ratio="1:1"
                                        data-push="true"
                                        data-default-input-name='avatar'
                                        data-label='请上传头像'>
                                        @if (isset($user) && ! empty($user->avatar))
                                            <img src="{{ $user->avatar }}" alt="">
                                        @endif
                                    </div>
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
@include('admin.common.upload')
