<template>
    <main class="site-main">
        <div class="wrapper bg--white">
            <div class="container">
                <div class="page__header pt6 pb5 clearfix gutter ">
                    <div class="header__content col lg-col-7 mb4 lg-mb0">
                        <h1 class="bold">{{ category.name }}</h1>
                        <p>{{ category.description }}</p>
                    </div>
                    <div class="lg-col card card--gray sponsor right"></div>
                </div>
            </div>
        </div>
        <div class="container wrapper py5 tab__container">
            <div class="category mb4">
                <header class="category__header">
                    <h2 class="category__title">{{ category.title }}</h2>
                </header>
                <div class="gutter grid--2-col lg-grid--3-col grid--left">
                    <router-link class="card col mb1 sm-mb2"
                        :to="{name: 'frontend.post.detail', params: {slug: post.slug}}"
                        v-for="post in posts" :key="post.id">

                        <div class="card__image">
                            <img :src="post.banner" :alt="post.title">
                        </div>
                        <div class="card__content">
                            <span class="label">{{ post.created_at | timeago }}</span>
                            <h4>{{ post.title }}</h4>
                        </div>
                    </router-link>
                </div>
            </div>
            <pagination :pagination="pagination" :fetchData="fetchData"></pagination>
        </div>
    </main>
</template>

<script>
    import Pagination from 'frontend/components/Pagination'

    export default {
        components: {Pagination},
        data () {
            return {
                category: {},
                posts: [],
                pagination: {}
            }
        },
        created: function () {
            let url = this.$endpoints.categories.posts.replace(':slug', this.$route.params.slug)

            this.$http.get(url).then(response => {
                this.category = response.meta.category
                this.pagination = response.meta.pagination
                this.posts = response.data
            }).catch(e => {})
        },
        created: function () {
            this.fetchData()
        },
        methods: {
            fetchData: function (page) {
                let url = this.$endpoints.categories.posts.replace(':slug', this.$route.params.slug)
                url += '?page=' + page

                this.$http.get(url).then(response => {
                    this.category = response.meta.category
                    this.pagination = response.meta.pagination
                    this.posts = response.data
                }).catch(e => {})
            }
        }
    }
</script>
