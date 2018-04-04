@extends('admin.layouts.layout')

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-lock"></i> 分类列表
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
                        <div class="table-responsive">
                            <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-hover no-footer" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>名 称</td>
                                                    <td>sulg</td>
                                                    <td>文章数量</td>
                                                    <td>描述信息</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($categories as $category)
                                                    <tr>
                                                        <td>{{ $category->id }}</td>
                                                        <td>{{ $category->name }}</td>
                                                        <td>{{ $category->slug }}</td>
                                                        <td>{{ $category->posts_count }}</td>
                                                        <td>{{ $category->description }}</td>
                                                        <td class="no-sort no-click" id="bread-actions">
                                                            <a href="{{ route('admin.categories.edit', $category->id) }}" class="btn btn-sm btn-info">
                                                                <i class="voyager-edit"></i>
                                                                <span class="hidden-xs hidden-sm">编 辑</span>
                                                            </a>
                                                            <a href="javascript:;" data-id="{{ $category->id }}" class="btn btn-sm btn-warning delete">
                                                                <i class="voyager-trash"></i>
                                                                <span class="hidden-xs hidden-sm">删 除</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                @include('admin.common.pagination', ['data' => $categories])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form action="{{ route('admin.categories.index') }}" method="post" id="delete-form">
        {{ csrf_field() }}
        {{ method_field('DELETE') }}
    </form>
@endsection

@section('javascript')
    <script>
        $(document).ready(function () {
            $('.delete').click(function () {
                var $form = $('#delete-form');
                var action = $form.attr('action');

                $form.attr('action', action + "/" + $(this).data('id'))

                alert($form.attr('action'))
                $form.submit();
            })
        });
    </script>
@endsection
