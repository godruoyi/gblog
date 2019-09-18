<template>
    <div>
        <div class="post mt2">
            <ul class="replies">
                <li class="list-group-item media card mt1" v-for="comment in comments" :key="comment.id">
                    <a :name="'reply' + comment.id" :id="'reply' + comment.id" aria-hidden="true"></a>
                    <div class="user-avatar">
                        <a :href="comment.user.home_page">
                            <img class="media-object img-thumbnail avatar" :src="comment.user.avatar">
                        </a>
                    </div>
                    <div class="details">
                        <div class="media-right">
                            <a :href="comment.user.home_page" class="user-name"><strong>{{ comment.user.username }}</strong></a>
                        </div>
                        <div class="infos">
                            <div class="media-body markdown-reply content-body" v-html="comment.content"></div>
                            <span class="meta operation">
                                <span class="meta action" title="">{{ comment.created_at | timeago }}</span>
                                <!-- <a class="action" href="javascript:void(0)" :title="'回复' + comment.user.username " @click="repliyUser(comment.user.username)"><i class="fa fa-reply"></i></a> -->
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <comment-publish :post-id="postId" @publish="published"></comment-publish>
    </div>
</template>

<script>
    import CommentPublish from './CommentPublish'
    export default {
        props: {
            comments: Array,
            postId: Number
        },
        components: {CommentPublish},
        methods: {
            published: function (comment) {
                this.comments.push(comment)
            },

            repliyUser: function (username) {

            }
        }
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
                padding: 18px 1px 18px 0;
                width: calc(100% - 48px);

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
                    padding-right: 10px;

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

                        img {
                            width: 100%;
                        }
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

    .markdown-reply img {
        width: 100%;
    }
</style>
