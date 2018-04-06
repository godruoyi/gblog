<template>
    <main class="site-main">
        <div class="container wrapper">
            <div class="callout my1"></div>
            <div class="gutter">
                <div class="md-col md-col-7 lg-col-8">
                    <transition-group name="list" tag="p" appear>
                    <div class="card card--post mt0 mb3" v-for="post in posts" :key="post.id">
                        <div class="post__image">
                            <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">
                                <img :src="post.banner" alt="">
                            </router-link>
                        </div>
                        <div class="post__content truncate">
                            <span class="label">
                                <router-link :to="{name: 'frontend.category.detail', params: {slug: post.category.slug}}">
                                    {{ post.category.name }}
                                </router-link>
                                <span class="text--gray"> / </span>
                                <span class="text--gray">{{ post.created_at | timeago }}</span>
                            </span>
                            <h2 class=""><router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">{{ post.title }}</router-link></h2>
                            <p>{{ post.excerpt }}</p>
                            <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}" class="truncate__link">
                                查看更多...
                            </router-link>
                        </div>
                    </div>
                    </transition-group>
                    <pagination :pagination="meta.pagination" :fetchData="fetchData"></pagination>
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
                posts: [],
                include:'?include=category',
                meta: {},
                links: []
            }
        },
        components: {
            IndexSidebar, Pagination
        },
        created: function () {
            this.fetchData()

        },
        updated: function () {
            this.links = this.$parent.links.left
        },
        methods: {
            fetchData: function (page) {
                this.$http.get(this.$endpoints.posts.index + this.include + '&page=' + page).then(response => {
                    this.posts = response.data
                    this.meta = response.meta
                }).catch(e => {})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 0.5s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
</style>
