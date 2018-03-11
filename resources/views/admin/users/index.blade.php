@extends('admin.layouts.layout')

@section('styles')
    <style>
        .user-avatar {
             border-radius:50%;
             height: 50px;
             width: 50px;
        }
        .voyager .table>tbody>tr>td {
            line-height: 50px;
        }
    </style>
@endsection

@section('content')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-lock"></i> 角色列表
        </h1>
        <a href="{{ route('admin.users.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>添加用户</span>
        </a>
        <!-- <a class="btn btn-danger" id="bulk_delete_btn"><i class="voyager-trash"></i> <span>删除选中</span></a> -->
        <!-- /.modal -->
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
                                                    <td>姓 名</td>
                                                    <td>邮 箱</td>
                                                    <td>文章数</td>
                                                    <td>头像</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($users as $user)
                                                    <tr>
                                                        <td>{{ $user->id }}</td>
                                                        <td>{{ $user->name }}</td>
                                                        <td>{{ $user->email }}</td>
                                                        <td>{{ $user->posts_count }}</td>
                                                        <td><img src="{{ $user->avatar ?? '/vendor/images/captain-avatar.png' }}" class="user-avatar"></td>
                                                        <td class="no-sort no-click" id="bread-actions">
                                                            <a href="{{ route('admin.users.edit', $user->id) }}" class="btn btn-sm btn-warning">
                                                                <i class="voyager-trash"></i>
                                                                <span class="hidden-xs hidden-sm">编 辑</span>
                                                            </a>
                                                            <a href="javascript:;" data-id="{{ $user->id }}" class="btn btn-sm btn-warning delete">
                                                                <i class="voyager-edit"></i>
                                                                <span class="hidden-xs hidden-sm">删 除</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="dataTables_info" id="dataTable_info">显示第 1 至 2 项结果，共 2 项</div>
                                    </div>
                                    <div class="col-sm-7">{{ $users->links() }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form action="{{ route('admin.users.index') }}" method="post" id="delete-form">
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
