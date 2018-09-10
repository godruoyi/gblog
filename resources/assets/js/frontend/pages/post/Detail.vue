<template>
    <main class="site-main" id="wrap">
        <div class="container wrapper">
            <transition enter-active-class="animated flash">
                <div>
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
                    <comment :comments="comments" :post-id="post.id"></comment>
                </div>
            </transition>

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

    import Comment from './Comment'

    export default {
        components: {Share, Comment},
        data () {
            return {
                post: {},
                show: false,
                comments: []
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
                url += '?include=category,comments'

                this.$http.get(url).then(response => {
                    this.post = response
                    this.comments = response.comments.data
                    this.show = true
                }, error => {})
            }
        }
    }
</script>

<style lang="scss">
    #post-content {
        font-size: 15px;
        line-height: 1.3;
        overflow: hidden;
        line-height: 1.6;
        word-wrap: break-word;
    }

    .markdown-reply {
        font-size: 15px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 1.3;
        overflow: hidden;
        line-height: 1.6;
        word-wrap: break-word;

        img {
            width: 100%;
        }
    }

    .box {
        background-color: #fff;
        padding: 10px;
        margin: 0 0 20px 0;
        -webkit-box-shadow: 0 0.2em 0 0 #ddd, 0 0 0 1px #ddd;
        box-shadow: 0 0.2em 0 0 #ddd, 0 0 0 1px #ddd;
    }

    .post__content {
        padding: 60px 40px;
    }

    .meta, .operate {
        color: #a9a7a7;
        font-size: 12px;
    }
</style>
