<template>
    <main class="site-main" id="wrap">
        <div class="container wrapper">
            <comment></comment>

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
