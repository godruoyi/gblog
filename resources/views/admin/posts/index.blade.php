@extends('admin.layouts.layout')
@section('title', '文章列表')
@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-tree"></i> 文章列表
        </h1>
        <a href="{{ route('admin.posts.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>发布文章</span>
        </a>
    </div>
    <div class="page-content browse container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        @include('admin.common.pagination_table', [
                            'datas'  => $posts,
                            'name'   => 'posts',
                            'fields' => [
                                'id'         => '#',
                                'slug'       => ['name' => '标题', 'callback' => function ($slug, $post) {
                                    $url = sprintf('//%s/posts/%s', config('app.home_domain'), $slug);

                                    return '<a target="_blank" href="'.$url.'">'. str_limit($post->title, 50) .'</a>';
                                }],
                                'view_count' => '阅读量',
                                'is_draft'   => ['name' => '状态', 'callback' => function ($isdraft) {
                                    return $isdraft
                                        ? '<span class="tag label label-warning">草稿</span>'
                                        : '<span class="tag label label-success">已发布</span>';
                                }],
                                'created_at' => '发布时间',
                            ]
                        ])
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
