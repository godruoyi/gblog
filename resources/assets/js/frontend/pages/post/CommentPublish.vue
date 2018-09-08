<template>
    <div class="publish-content mt2">
        <div class="panel-body">
            <form id="reply-form">
                <div id="reply_notice" class="">
                    <ul class="helpblock list rm-link-color add-link-underline">
                        <li>请注意单词拼写，以及中英文排版，<a href="https://github.com/sparanoid/chinese-copywriting-guidelines">参考此页</a></li>
                        <li>支持 Markdown 格式, <strong>**粗体**</strong>、~~删除线~~、<code>`单行代码`</code>, 更多语法请见这里 <a href="https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md">Markdown 语法</a></li>
                        <li>上传图片, 支持拖拽和剪切板黏贴上传, 格式限制 - jpg, png, gif</li>
                        <li>发布框支持本地存储功能，会在内容变更时保存，「提交」按钮点击时清空</li>
                    </ul>
                </div>
                <br>
                <div class="form-group">
                    <textarea class="form-control" rows="5" id="reply_content"></textarea>
                </div>
                <div class="form-group reply-post-submit">
                    <div class="pull-left meta">
                        <a href="javascript:;" class="action popover-with-html">支持 MD</a>
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-primary btn-sm " type="submit"> 发送</button>
                    </div>
                </div>
            </form>

            <div class="clearfix"></div>
            <div class="box preview markdown-reply" id="preview-box"
                style="border: dashed 1px #ccc;background: #ffffff;border-radius: 6px;box-shadow:none;margin-top: 20px;margin-bottom: 6px;">
                    <p>dadadadad</p>
                </div>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'

    require('inline-attachment/src/inline-attachment.js')
    require('inline-attachment/src/codemirror-4.inline-attachment.js')

    require('simplemde/src/css/simplemde.css')

    export default {
        data () {
            return {
            }
        },
        mounted: function () {
            this.initSimplemde()
        },
        created: function () {
        },
        methods: {
            initSimplemde: function () {
                const simplemde = new SimpleMDE({
                    element: document.getElementById("reply_content"),
                    toolbar: false,
                    autofocus: true,
                    status: false,
                    tabSize: 4,
                    toolbarTips: false,
                    //     enabled: true,
                    //     uniqueId: 'simplemde-auto-unique-id',
                    // },
                    placeholder: '请使用 Markdown 格式书写～_～，支持图片拖拽和剪切板上传。',
                    spellChecker: false,
                });

                inlineAttachment.defaults.uploadUrl = '/upload';
                // inlineAttachment.defaults.extraParams = {_token: $('#sieditor-id').data('upload-token')};
                inlineAttachment.defaults.uploadFieldName = 'upload_files';

                inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, {
                    onFileUploadResponse: function(xhr) {
                        var result = JSON.parse(xhr.responseText),
                        filename = result[this.settings.jsonFieldName];

                        if (result && filename) {
                            var newValue;
                            if (typeof this.settings.urlText === 'function') {
                                newValue = this.settings.urlText.call(this, filename, result);
                            } else {
                                newValue = this.settings.urlText.replace(this.filenameTag, filename);
                            }
                            var text = this.editor.getValue().replace(this.lastValue, newValue);
                            this.editor.setValue(text);
                            this.settings.onFileUploaded.call(this, filename);
                        }
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .publish-content {
        border-radius: 0px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid #dde2e8;
        margin-bottom: 20px;
        background-color: #fff;

        .panel-body {
            padding-top: 20px;
            border: none;
            padding: 15px;

            #reply_notice {
                color: gray;
                padding: 16px;
                border: dashed 1px;

                ul {
                    margin: 0;
                    padding-left: 11px;
                    color: #606060;

                    li {
                        line-height: 30px;
                        margin-bottom: 0px;
                        color: #606060;
                        font-size: 14px;
                        color: #525252;
                        font-family: "Helvetica Neue", NotoSansHans-Regular,AvenirNext-Regular,arial,Hiragino Sans GB,"Microsoft Yahei","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;

                        a {
                            text-decoration: underline;
                            color: #606060;
                        }

                        code {
                            padding: 2px 4px;
                            font-size: 90%;
                            color: #c7254e;
                            background-color: #f9f2f4;
                            border-radius: 4px;
                        }
                    }
                }

            }

            .form-group {
                margin-bottom: 15px;

                .form-control {
                    font-size: 15px;
                    line-height: 30px;

                    border-color: #dde2e8;
                    font-size: 15px;
                    line-height: 30px;
                    font-family: inherit;
                    display: block;
                    width: 100%;
                    height: 34px;
                    padding: 6px 12px;
                    font-size: 14px;
                    line-height: 1.42857143;
                    color: #555555;
                    background-color: #fff;
                    background-image: none;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                    -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
                    -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
                    transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
                    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
                    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
                }
                .form-control:focus {
                    border-color: #00b5ad;
                    outline: 0;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 181, 173, 0.6);
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 181, 173, 0.6);
                }

                .pull-left {
                    font-size: 1em;
                    color: #a9a7a7;
                    float: left !important;

                    .action {
                        display: inline-block;
                        margin-right: 12px;
                        padding: 1px 2px;
                        color: #a9a7a7;
                        text-decoration: none;
                    }
                }

                .pull-right {
                    float: right !important;

                    .btn-sm, .btn-group-sm > .btn {
                        padding: 5px 10px;
                        font-size: 12px;
                        line-height: 1.5;
                        border-radius: 3px;
                    }
                }
            }
        }
    }

    .CodeMirror, .CodeMirror-scroll {
        min-height: 120px;
    }
</style>
