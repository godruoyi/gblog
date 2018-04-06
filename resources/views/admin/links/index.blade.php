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
                        <div class="table-responsive">
                            <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-hover no-footer" id="dataTable" data-deletename="links">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>名称</td>
                                                    <td>logo</td>
                                                    <td>描述</td>
                                                    <td>类型</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($links as $link)
                                                    <tr>
                                                        <td>{{ $link->id }}</td>
                                                        <td><a href="{{ $link->link }}">{{ $link->name }}</a></td>
                                                        <td>
                                                            @empty(! $link->logo)
                                                                <img class="user-avatar" src="{{ $link->logo }}"/>
                                                            @endempty
                                                        </td>
                                                        <td>{{ $link->description }}</td>
                                                        <td>{{ $link->type }}</td>
                                                        <td class="no-sort no-click" id="bread-actions">
                                                            <a href="{{ route('admin.links.edit', $link->id) }}" class="btn btn-sm btn-info">
                                                                <i class="voyager-edit"></i>
                                                                <span class="hidden-xs hidden-sm">编 辑</span>
                                                            </a>
                                                            <a href="javascript:;" data-id="{{ $link->id }}" class="btn btn-sm btn-warning delete">
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
                                @include('admin.common.pagination', ['data' => $links])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
