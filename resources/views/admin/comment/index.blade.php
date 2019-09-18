@extends('admin.layouts.layout')
@section('title', '评论列表')
@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-tree"></i> 评论列表
        </h1>
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
                                                    <td>标 题</td>
                                                    <td>内 容</td>
                                                    <td>评论时间</td>
                                                    <td>操 作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($comments as $comment)
                                                    <tr>
                                                        <td><a href="https://godruoyi.com/posts/{{ $comment->post->slug }}" target="_blank">{{ $comment->post->title }}</a></td>
                                                        <td title="{{ $comment->content }}">{{ substr($comment->content, 0, 20) . '...' }}</td>
                                                        <td>{{ $comment->created_at->toDateTimeString() }}</td>
                                                        <td class="no-sort no-click" id="bread-actions">
                                                            <a href="{{ route('admin.comments.edit', $comment->id) }}" class="btn btn-sm btn-info">
                                                                <i class="voyager-hammer"></i>
                                                                <span class="hidden-xs hidden-sm">查看/编辑</span>
                                                            </a>
                                                            <a href="javascript:;" data-id="{{ $comment->id }}" class="btn btn-sm btn-warning iwantdelete">
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
                                @include('admin.common.pagination', ['data' => $comments])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <form action="{{ route('admin.comments.index') }}" method="POST" id="delete-form">
            {{ csrf_field() }}
            {{ method_field('DELETE') }}
        </form>
    </div>
@endsection
@push('javascript')
    <script>
        $(document).ready(function () {
            $('.iwantdelete').click(function () {
                var $form = $('#delete-form');
                var action = $form.attr('action');
                $form.attr('action', action + "/" + $(this).data('id'))
                $form.submit();
            })
        });
    </script>
@endpush
