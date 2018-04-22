@extends('admin.layouts.layout')
@section('title', '分类列表')

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-crop"></i> 分类列表
        </h1>
        <a href="{{ route('admin.categories.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>添加分类</span>
        </a>
    </div>
    <div class="page-content browse container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        @include('admin.common.pagination_table', [
                            'datas'  => $categories,
                            'name'   => 'categories',
                            'fields' => [
                                'id'          => '#',
                                'name'        => '名 称',
                                'slug'        => 'Slug',
                                'posts_count' => '文章数量',
                                'description' => '描述信息',
                            ]
                        ])
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
