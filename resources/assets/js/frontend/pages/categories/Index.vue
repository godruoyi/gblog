<template>
    <main class="site-main">
        <div class="wrapper bg--white">
            <div class="container">
                <div class="page__header pt6 pb5 clearfix gutter ">
                    <div class="header__content col lg-col-7 mb4 lg-mb0">
                        <h1 class="bold">Laravel 5.6</h1>
                        <p>Laravel 5.6 was released on February 7th, 2018.</p>
                    </div>
                    <div class="lg-col card card--gray sponsor right"></div>
                </div>
            </div>
        </div>
        <div class="container wrapper py5 tab__container">
            <div class="category mb4">
                <header class="category__header">
                    <h2 class="category__title">{{ category.description }}</h2>
                </header>
                <div class="gutter grid--2-col lg-grid--3-col grid--left">
                    <router-link class="card col mb1 sm-mb2"
                        :to="{name: 'frontend.post.detail', params: {slug: post.slug}}"
                        v-for="post in posts" :key="post.id">

                        <div class="card__image">
                            <img :src="post.banner" :alt="post.title">
                        </div>
                        <div class="card__content">
                            <span class="label">{{ post.created_at }}</span>
                            <h4>{{ post.title }}</h4>
                        </div>
                    </router-link>
                </div>
            </div>
            <pagination></pagination>
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
                include: '?include=posts'
            }
        },
        created: function () {
            let url = this.$endpoints.categories.detail.replace(':slug', this.$route.params.slug)

            this.$http.get(url + this.include).then(response => {
                this.category = response
                this.posts = response.posts.data
            }).catch(e => {})
        }
    }
</script>
