@extends('admin.layouts.layout')
@section('title', $post->id > 0 ? '编辑文章' : '创建文章')
@push('styles')
    <style>
        body {color: #525252;}
        ul.list {margin: 0;padding-left: 11px;color: #524e4e;}
        .text-center {text-align: center;}
        .form-control {margin-bottom: 20px;}
        #reply_notice {margin-bottom: 15px;padding: 16px;background-color: #fff;border: 1px dashed #d9d9d9;}
        #reply_notice .slim {max-height: 400px;}
        .helpblock {line-height: 30px;margin-bottom: 0px;}
        .editor-toolbar.fullscreen {z-index: 9999 !important;}
        .CodeMirror-fullscreen {z-index: 9999 !important;}
        .post-banner {height: 240px;}
        .voyager input[type=file] {padding: 5px;}
    </style>
@endpush

@section('content')
    <div class="page-content edit-add container-fluid">
        <div class="panel panel-bordered">
            <form role="form" class="form-horizontal"
                action="{{ $post->id > 0 ? route('admin.posts.update', $post->id) : route('admin.posts.store') }}"
                method="POST" enctype="multipart/form-data"
                accept-charset="UTF-8">
                <div class="panel-body">
                    {{ csrf_field() }}
                    @if ($post->id )
                        {{ method_field('PUT') }}
                    @endif
                    @include('admin.layouts.partials.errors')

                    <h2 class="text-center">创造文章</h2>
                    <hr>
                    <input type="text" class="form-control title" name="title" value="{{ $post->title ?? old('title') }}" placeholder="请输入文章标题">
                    <select class="form-control" name="category_id" placeholder="请选择分类">
                        <option value="">请选择分类</option>
                        @foreach($categories as $category)
                            @if ($post->category_id == $category->id)
                                <option value="{{ $category->id }}" selected>{{ $category->name }}</option>
                            @else
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endif
                        @endforeach
                    </select>

                    <div id="reply_notice">
                        <div class="slim"
                            data-download="true"
                            data-ratio="6:3"
                            data-service="/slim/imageupload"
                            data-default-input-name='banner'
                            data-save-initial-image="true"
                            data-label='请上传文章 Banner 图！'>

                            @if (! empty($post->banner))
                                <img src="{{ $post->banner }}" alt="">
                            @endif
                        </div>
                    </div>

                   {{--  <div id="reply_notice" class="">
                        <ul class="helpblock list rm-link-color add-link-underline">
                          <li>请注意单词拼写，以及中英文排版，<a href="https://github.com/sparanoid/chinese-copywriting-guidelines">参考此页</a></li>
                          <li>支持 Markdown 格式, <strong>**粗体**</strong>、~~删除线~~、<code>`单行代码`</code>, 更多语法请见这里 <a href="https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md">Markdown 语法</a></li>
                          <li>上传图片, 支持拖拽和剪切板黏贴上传, 格式限制 - jpg, png, gif</li>
                          <li>发布框支持本地存储功能，会在内容变更时保存，「提交」按钮点击时清空</li>
                        </ul>
                    </div> --}}

                    <textarea name="content"
                        class="form-control" id="sieditor-id"
                        data-upload-url="{{ route('admin.upload.sieditor') }}"
                        data-upload-token="{{ csrf_token() }}">{{ $post->content ?? old('content') }}</textarea>

                    <button type="submit" class="btn btn-primary submit-btn">发布</button>&nbsp;&nbsp;or&nbsp;&nbsp;
                    <input type="hidden" name="is_draft" value="no" id="draft">
                    <button type="button" class="btn btn-basic" id="save-draft">保存草稿</button>
                    <div class=""></div>
                </div><!-- panel-body -->
            </form>
        </div>
    </div>
@endsection

@include('admin.common.upload')

@push('javascript')
    <script src="{{ mix('js/admin-sieditor.js') }}"></script>
@endpush
