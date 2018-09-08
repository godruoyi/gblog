<template>
    <div>
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

        <comment-publish></comment-publish>
    </div>
</template>

<script>
    import CommentPublish from './CommentPublish'
    export default {
        components: {CommentPublish},
    }
</script>

<style scoped lang="scss">
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
</style>
