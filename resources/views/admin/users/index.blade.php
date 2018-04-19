@extends('admin.layouts.layout')
@section('title', '用户列表')
@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-lock"></i> 角色列表
        </h1>
        <a href="{{ route('admin.users.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>添加用户</span>
        </a>
    </div>
    <div class="page-content browse container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        @include('admin.common.pagination_table', [
                            'datas'  => $users,
                            'name'   => 'users',
                            'fields' => [
                                'id'          => '#',
                                'name'        => '姓 名',
                                'email'       => '邮 箱',
                                'posts_count' => '文章数',
                                'avatar'      => ['name' => '头像', 'callback' => function ($avatar) {
                                    $avatar = $avatar ?? '/vendor/images/captain-avatar.png';
                                    return '<img src="'.$avatar.'" class="user-avatar">';
                                }],
                            ]
                        ])
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
