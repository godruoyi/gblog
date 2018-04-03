<template>
    <main class="site-main">
        <div class="container wrapper py4 md-py6">
            <div class="category mb4" v-for="category in categories" :key="category.id">
                <header class="category__header">
                    <h2 class="category__title">{{ category.title }}</h2>
                    <router-link :to="{name: 'frontend.category.detail', params: {slug: category.slug}}" class="category__link link--black">查看所有 {{ category.name }} 文章</router-link>
                </header>
                <div class="gutter grid--2-col lg-grid--3-col grid--left">
                    <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}" class="card col mb1 sm-mb2" v-for="post in category.posts.data" :key="post.id">
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
        </div>
    </main>
</template>

<script>
    export default {
        data () {
            return {
                categories: [],
                include: '?include=posts:fields(id|slug|title|banner|created_at):limit(9)'
            }
        },
        created: function () {
            this.fetchData()
        },
        methods: {
            fetchData: function (page) {
                this.$http.get(this.$endpoints.categories.index + this.include + '&page=' + page).then(response => {
                    this.categories = response.data
                }, error => {})
            }
        }
    }
</script>
