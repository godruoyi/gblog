@extends('admin.layouts.layout')

@section('styles')
    <style>
        .voyager input[type=file] {padding: 6px;}
        .user-avatar {width:120px; height:auto; clear:both; display:block; padding:2px; border:1px solid #ddd; margin-bottom:10px;}
    </style>
@endsection

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-group"></i> 用户
        </h1>
        <a href="" class="btn btn-success">
            <i class="voyager-plus"></i> <span>返回用户列表</span>
        </a>
    </div>

    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <form role="form" class="form-horizontal" action="{{ isset($user) ? route('admin.users.update', $user->id) : route('admin.users.store') }}" method="POST">
                        <div class="panel-body">
                            {{ csrf_field() }}
                            @isset($user)
                                {{ method_field('PUT') }}
                            @endisset

                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">姓 名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="请输入姓名" value="{{ isset($user) ? $user->name : '' }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-sm-2 control-label">邮 箱</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="请输入邮箱" value="{{ isset($user) ? $user->email : '' }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="avatar" class="col-sm-2 control-label">头 像</label>
                                <div class="col-sm-8">
                                    @isset($user)
                                        <img src="{{ $user->avatar }}" class=" user-avatar">
                                        {{ method_field('PUT') }}
                                    @endisset
                                    <input type="file" class="form-control" name="avatar" id="avatar">
                                </div>
                            </div>
                        </div><!-- panel-body -->

                        <div class="panel-footer">
                            <button type="submit" class="btn btn-primary"> 保 存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
