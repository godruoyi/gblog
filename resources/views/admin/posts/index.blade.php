@extends('admin.layouts.layout')

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
                        <div class="table-responsive">
                            <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-hover no-footer" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>分类</td>
                                                    <td>作者</td>
                                                    <td>标题</td>
                                                    <td>阅读量</td>
                                                    <td>回复量</td>
                                                    <td>草稿</td>
                                                    <td>发布时间</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @forelse ($posts as $post)
                                                    <tr>
                                                        <td>{{ $post->id }}</td>
                                                        <td>{{ $post->category->name }}</td>
                                                        <td>{{ $post->user->name }}</td>
                                                        <td>{{ $post->title }}</td>
                                                        <td>{{ $post->view_count }}</td>
                                                        <td>{{ $post->reply_count }}</td>
                                                        @if ($post->is_draft == 'yes')
                                                            <td><span class="tag label label-warning">草稿</span></td>
                                                        @else
                                                            <td><span class="tag label label-success">已发布</span></td>
                                                        @endif
                                                        <td>{{ $post->created_at }}</td>
                                                        <td class="no-sort no-click" id="bread-actions">
                                                            <a href="{{ route('admin.posts.edit', $post->id) }}" class="btn btn-sm btn-success">
                                                                <i class="voyager-hammer"></i>
                                                                <span class="hidden-xs hidden-sm">查 看</span>
                                                            </a>
                                                            <a href="{{ route('admin.posts.edit', $post->id) }}" class="btn btn-sm btn-info">
                                                                <i class="voyager-edit"></i>
                                                                <span class="hidden-xs hidden-sm">编 辑</span>
                                                            </a>
                                                            <a href="javascript:;" data-id="{{ $post->id }}" class="btn btn-sm btn-warning delete">
                                                                <i class="voyager-x"></i>
                                                                <span class="hidden-xs hidden-sm">删 除</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @empty
                                                    <tr><td colspan="9" align="center">暂无数据</td></tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="dataTables_info" id="dataTable_info">显示第 1 至 2 项结果，共 2 项</div>
                                    </div>
                                    <div class="col-sm-7 pull-right">{{ $posts->links() }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form action="{{ route('admin.posts.index') }}" method="post" id="delete-form">
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
