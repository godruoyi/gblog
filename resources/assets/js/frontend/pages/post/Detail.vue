<template>
    <main class="site-main" id="wrap">
        <div class="container wrapper">
            <!-- <transition enter-active-class="animated fadeInUp"> -->
                <div class="card post mt2" v-if="show">
                    <div class="post__image">
                        <img :src="post.banner" :alt="post.title">
                    </div>
                    <div class="post__content clearfix">
                        <div class="col lg-col-12 margin-bottom40">
                            <header class="post__header">
                                <span class="label">
                                    <router-link :to="{name: 'frontend.category.detail', params: {slug: post.category ? post.category.slug : ''}}">{{ post.category ? post.category.name : '' }}</router-link>
                                    <span class="text--gray"> / </span>
                                    <span class="text--gray">{{ post.created_at | timeago }}</span>
                                </span>
                                <h1 class="post__title">{{ post.title }}</h1>
                            </header>
                            <p></p>
                            <div v-html="content" id="post-content"></div>
                        </div>
                        <!-- <share></share> -->
                    </div>
                </div>
            <!-- </transition> -->

            <div class="post mt2">
                <ul class="replies">
                    <li class="list-group-item media card mt1">
                        <a name="reply59179" id="reply59179" aria-hidden="true"></a>
                        <div class="user-avatar">
                            <a href="https://laravel-china.org/users/10512">
                                <img class="media-object img-thumbnail avatar" src="https://lccdn.phphub.org/uploads/avatars/10512_1513244746.jpeg?imageView2/1/w/100/h/100">
                            </a>
                        </div>
                        <div class="details">
                            <div class="media-right">
                                <a href="https://laravel-china.org/users/10512" class="user-name"><strong>Jourdon</strong></a>
                            </div>
                            <div class="infos">
                                <div class="media-body markdown-reply content-body">
                                    <p>还是喜欢文字版的，上班时间有时候也会看看，看录像不方便。</p>
                                </div>
                                <span class="meta operation">
                                    <span class="meta action" title="2018-08-06 16:26:40">1个月前</span>
                                    <a class="action" href="javascript:void(0)" title="回复 Jourdon"><i class="fa fa-reply"></i></a>
                                </span>
                            </div>
                        </div>
                    </li>

                    <li class="list-group-item media card mt1">
                        <a name="reply59179" id="reply59179" aria-hidden="true"></a>
                        <div class="user-avatar">
                            <a href="https://laravel-china.org/users/10512">
                                <img class="media-object img-thumbnail avatar" src="https://lccdn.phphub.org/uploads/avatars/10512_1513244746.jpeg?imageView2/1/w/100/h/100">
                            </a>
                        </div>
                        <div class="details">
                            <div class="media-right">
                                <a href="https://laravel-china.org/users/10512" class="user-name"><strong>Jourdon</strong></a>
                            </div>
                            <div class="infos">
                                <div class="media-body markdown-reply content-body">
                                    <p>还是喜欢文字版的，上班时间有时候也会看看，看录像不方便。</p>
                                </div>
                                <span class="meta operation">
                                    <span class="meta action" title="2018-08-06 16:26:40">1个月前</span>
                                    <a class="action" href="javascript:void(0)" title="回复 Jourdon"><i class="fa fa-reply"></i></a>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

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
                            <textarea class="form-control" rows="5" placeholder="请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。"
                                style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 164px;" id="reply_content" name="body" cols="50"></textarea>
                        </div>
                        <div class="form-group reply-post-submit">
                            <div class="pull-right">
                                <button class="btn btn-primary btn-sm " type="submit">
                                <i class="fa fa-send"></i> 发送
                                </button>
                            </div>
                        </div>
                    </form>

                    <div class="clearfix"></div>
                    <div class="box preview markdown-reply" id="preview-box" style="display:none;border: dashed 1px #ccc;background: #ffffff;border-radius: 6px;box-shadow:none;margin-top: 20px;margin-bottom: 6px;"></div>
                </div>
            </div>

            <div class="partners my4">
                <div class="container">
                    <div class="label label--divider"><span>Godruoyi</span></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import Share from 'frontend/components/Share'
    import {default as markdown} from 'utils/markdown'

    export default {
        components: {Share},
        data () {
            return {
                post: {},
                show: false
            }
        },
        computed: {
            content: function () {
                let content = this.post.body

                return content ? markdown.render(content) : ''
            }
        },
        created: function () {
            this.fetchPost()
        },
        beforeRouteUpdate: function (to, from, next) {
            this.$route.params.slug = to.params.slug
            this.fetchPost()

            next()
        },
        methods: {
            fetchPost: function () {
                let url = this.$endpoints.posts.detail.replace(':slug', this.$route.params.slug)
                url += '?include=category'

                this.$http.get(url).then(response => {
                    this.post = response
                    this.show = true
                }, error => {})
            }
        }
    }
</script>

<style lang="scss" scoped>
    #post-content {
        font-size: 15px;
        line-height: 1.3;
        overflow: hidden;
        line-height: 1.6;
        word-wrap: break-word;
    }

    .post__content {
        padding: 60px 40px;
    }

    .meta, .operate {
        color: #a9a7a7;
        font-size: 12px;
    }

    .replies {
        margin-bottom: 0px;
        padding-left: 0;

        .media {
            margin-left: 0;
            margin-right: 0;
        }

        .list-group-item {
            padding: 0px 15px;
            border: none;
            margin-bottom: 0px;
            border-bottom: 1px solid #f2f2f2;

            .user-avatar {
                margin-top: 14px;
                padding: 3px;

                .img-thumbnail {
                    display: inline-block;
                    max-width: none;
                    border-radius: 50%;
                    line-height: 1.42857143;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    transition: all 0.2s ease-in-out;
                    vertical-align: middle;
                    width: 48px;
                    height: 48px;
                    padding: 3px;
                }
            }

            .details {
                padding: 18px 0;

                .media-right {
                    padding-left: 10px;
                    display: table-cell;
                    vertical-align: top;

                    .user-name {
                        margin-right: 4px;

                        strong {
                            color: #f4645f;
                        }
                    }
                }

                .infos {
                    margin-left: 10px;
                    margin-top: 10px;

                    .media-body {
                        vertical-align: top;
                        zoom: 1;
                        overflow: hidden;
                        padding-left:0;
                        padding-right:0;
                    }

                    .markdown-reply {
                        font-size: 15px;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                        line-height: 1.3;
                        overflow: hidden;
                        line-height: 1.6;
                        word-wrap: break-word;
                    }

                    .content-body {
                        display: block;
                        width: 100%;
                    }

                    .operation {
                        font-size: 13px;
                        margin-top: 5px;
                        display: block;

                        .action {
                            display: inline-block;
                            margin-right: 6px;
                        }
                    }
                }
            }
        }
    }

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
            }
        }
    }
</style>
