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

                <div class="form-group" v-loading="loading" element-loading-text="正在使用 code 登录中">
                    <markdown-editor :configs="configs" :value="initialValue" :attachments="attachments" @change="markdownInput"></markdown-editor>
                </div>

                <div class="form-group reply-post-submit">
                    <div class="pull-left meta">
                        <a href="javascript:;" class="action popover-with-html">支持 MD</a>
                    </div>
                    <div class="pull-right">
                        <a href="javascript:;" class="btn btn-primary btn-sm" @click="submitComment"> 发送</a>
                    </div>
                </div>
            </form>

            <div class="clearfix"></div>
            <div class="box preview markdown-reply" id="preview-box" v-html="commentContent" v-show="commentContent"
                style="border: dashed 1px #ccc;background: #ffffff;border-radius: 6px;box-shadow:none;margin-top: 20px;margin-bottom: 6px;">
            </div>
        </div>
    </div>
</template>

<script>
    import {default as markdown} from 'utils/markdown'
    import swal from 'sweetalert'
    import MarkdownEditor from 'frontend/components/MarkdownEditor'
    import { ApibaseURI } from 'src/config'

    export default {
        components: {
            MarkdownEditor
        },
        props: {
            postId: Number
        },
        data () {
            return {
                initialValue: '',
                configs: {
                    toolbar: false,
                    autofocus: true,
                    status: false,
                    tabSize: 4,
                    toolbarTips: false,
                    placeholder: '请使用 Markdown 格式书写～_～，支持图片拖拽和剪切板上传。',
                    spellChecker: false,
                },
                attachments: {
                    uploadUrl: ApibaseURI + this.$endpoints.fileupload,
                    uploadFieldName: 'upload_files',
                    extraHeaders: {
                        Accept: 'application/vnd.godruoyi.v1+json'
                    },
                },
                commentContent: '',
                user: {},
                loading: false
            }
        },
        created: function () {
            if (this.$route.query.code && this.$route.query.state == 'godruoyi' ) {
                let code = this.$route.query.code
                this.$router.replace({path: document.location.pathname + '#reply_notice', query: {}})
                this.loading = true

                this.$http.post(this.$endpoints.github, {code: code}).then(response => {
                    localStorage.setItem('access_token', response.access_token)
                    localStorage.setItem('user_info', JSON.stringify(response.user))

                    this.loading = false
                }, error => {
                    this.loading = false
                })
            }

            this.initialValue = localStorage.getItem('comment')
        },
        methods: {
            submitComment: function () {
                if (this.checkAuth()) {
                    const user = this.paresUserInfo()
                    let url    = this.$endpoints.comment.replace(':post', this.postId)

                    const comment = {
                        id: Math.random(),
                        content: this.commentContent,
                        user: user
                    }

                    this.$http.post(url, {content: this.commentContent}).then(response => {
                        this.$emit('publish', comment)

                        localStorage.removeItem('comment')
                    }, error => {})
                }

            },

            markdownInput: function (value) {
                this.originContent  = value
                this.commentContent = markdown.render(value)
            },

            paresUserInfo: function () {
                const user = localStorage.getItem('user_info')

                if (user && typeof user === 'string') {
                    try {
                        return JSON.parse(user)
                    } catch(e) {
                    }
                }

                return {
                    username: '游客',
                    home_page: '',
                    avatar: 'https://images.godruoyi.com/avatars/github/unknow_1536570935_CBDKowkcB6.png'
                }
            },

            checkAuth: function () {
                let _this = this
                if (this.commentContent && ! localStorage.getItem('access_token')) {
                    swal({
                        title: "您还没有登录",
                        text: "确定跳转到 Github 登录吗？",
                        icon: "warning",
                        buttons: ["取 消", "确 定"],
                    })
                    .then((yes) => {
                        if (yes) {
                            let currentUrl = location.origin + location.pathname
                            currentUrl = encodeURIComponent(currentUrl)
                            let url = 'https://github.com/login/oauth/authorize?client_id=393f40cf9a2f7ff41916&redirect_uri='+currentUrl+'&scopes=user&state=godruoyi'

                            localStorage.setItem('comment', _this.originContent)

                            location.href = url
                        }
                    });

                    return false
                }

                return true
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
</style>
