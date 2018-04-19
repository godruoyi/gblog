@extends('admin.layouts.layout')
@section('title', '友情链接')

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-anchor"></i> 友情链接
        </h1>
        <a href="{{ route('admin.links.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>添加友接</span>
        </a>
    </div>
    <div class="page-content browse container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        @include('admin.common.pagination_table', [
                            'datas'  => $links,
                            'name'   => 'links',
                            'fields' => [
                                'id'          => '#',
                                'name'        => ['name' => '名 称', 'callback' => function ($name, $link) {
                                    return '<a href="'. $link->link .'">'. $name .'</a>';
                                }],
                                'logo'        => ['name' => 'Logo',  'callback' => function ($logo) {
                                    return $logo ? '<img class="user-avatar" src="'. $logo .'"/>' : ' - ';
                                }],
                                'description' => ['name' => '描 述', 'callback' => function ($desc) {
                                    return str_limit($desc, 30);
                                }],
                                'type'        => '类 型',
                            ]
                        ])
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
