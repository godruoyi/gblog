<template>
    <main class="site-main">
        <div class="container wrapper">
            <div class="card post mt2">
                <div class="post__image">
                    <img :src="post.banner" :alt="post.title">
                </div>
                <div class="post__content clearfix">
                    <div class="col lg-col-9">
                        <header class="post__header">
                            <span class="label">
                                <router-link :to="{name: 'frontend.category', params: {slug: post.category.slug}}">{{ post.category.name }}</router-link>
                                <span class="text--gray"> / </span>
                                <span class="text--gray">{{ post.created_at }}</span>
                            </span>
                            <h1 class="post__title">{{ post.title }}</h1>
                        </header>
                        <p></p>
                        <div v-html="content" id="post-content"></div>
                    </div>

                    <share></share>
                </div>
            </div>

            <div class="partners my4">
                <div class="container">
                    <div class="label label--divider"><span>Laravel News Partners</span></div>
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
                post: {}
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
        methods: {
            fetchPost: function () {
                let url = this.$endpoints.posts.detail.replace(':slug', this.$route.params.slug)
                url += '?include=category'

                this.$http.get(url).then(response => {
                    this.post = response
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
</style>
