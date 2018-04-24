<template>
    <main class="site-main">
        <div class="container wrapper">
            <div class="callout my1"></div>
            <div class="gutter">
                <div class="md-col md-col-8">
                    <div style="float: right;">Powered by Elasticsearch</div>
                    <h2>Results for: "{{ keyword }}"</h2>
                    <div class="gutter mb4">
                        <transition-group name="list" tag="p" appear>
                            <div class="md-col md-col-12 lg-col-12 mb4" v-for="post in posts" :key="post.id">
                                <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">
                                    <div class="card__content">
                                        <h2 v-html="getTitle(post)"></h2>
                                        <p v-html="getContent(post)"></p>
                                    </div>
                                </router-link>
                            </div>
                        </transition-group>
                        <pagination :pagination="pagination" :paginationclass="'md-col md-col-12 lg-col-12'" :fetchData="fetchData"></pagination>
                    </div>
                </div>
                <transition appear>
                    <index-sidebar name="list" :links="links"></index-sidebar>
                </transition>
            </div>
        </div>
    </main>
</template>

<script>
    import {default as IndexSidebar} from 'frontend/components/Sidebar'
    import Pagination from 'frontend/components/Pagination'

    export default {
        data () {
            return {
                keyword: '',
                links: [],
                posts: [],
                pagination: {}
            }
        },
        components: {
            IndexSidebar, Pagination
        },
        created: function () {
            this.keyword = this.$route.query.q
            this.fetchData()
        },
        beforeRouteUpdate: function (to, from, next) {
            this.keyword = to.query.q
            this.fetchData()

            next()
        },
        methods: {
            fetchData: function (page) {
                this.$http.get(this.$endpoints.search + '?q=' + this.keyword + '&page=' + page).then(response => {
                    this.posts      = response.data
                    this.pagination = {
                        total_pages: response.total,
                        current_page: response.current_page
                    }
                }).catch(e => {})
            },
            getContent: function (post) {
                return post.highlight && post.highlight.content
                    ? this.getHighlight(post.highlight.content)
                    : post.excerpt
            },
            getTitle: function (post) {
                return post.highlight && post.highlight.title
                    ? this.getHighlight(post.highlight.title)
                    : post.title
            },
            getHighlight: function (values) {
                let html = []
                values.forEach( function(element, index) {
                    html.push(element)
                })

                return html.join('')
            }
        },
        updated: function () {
            this.links = this.$parent.links.left
        },
    }
</script>

<style scoped lang="scss">
    em,i {
        color: red!important;
    }
    .gutter a {
        color: #525252;
    }
    .card__content {
        background-color: #fff;

        em {
            color: red!important;
        }
    }
</style>
