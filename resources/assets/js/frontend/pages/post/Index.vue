<template>
    <main class="site-main">
        <div class="container wrapper">
            <div class="callout my1"></div>

            <div class="gutter">
                <div class="md-col md-col-7 lg-col-8">
                    <div class="card card--post mt0 mb3" v-for="post in posts" :key="post.id">
                        <div class="post__image">
                            <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">
                                <img src="https://i0.wp.com/wp.laravel-news.com/wp-content/uploads/2018/03/null-coalesce.png?resize=1400%2C709" alt="">
                            </router-link>
                        </div>
                        <div class="post__content truncate">
                            <span class="label">
                                {{ post.category.name }}
                                <span class="text--gray"> / </span>
                                <span class="text--gray">{{ post.created_at }}</span>
                            </span>
                            <h2 class=""><a href="/blade-templates-null-coalesce-operator">{{ post.title }}</a></h2>
                            <p>ddddddddd ads ad jaiodj aiosj daoij aoijdoaisjd aoijdoaisj oiajd aoij aoisj oiadj aiojd aosddddddddd ads ad jaiodj aiosj daoij aoijdoaisjd aoijdoaisj oiajd aoij aoisj oiadj aiojd aos </p>
                            <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}" class="truncate__link">
                                Read more…
                            </router-link>
                        </div>
                    </div>

                    <pagination></pagination>
                </div>
                <index-sidebar></index-sidebar>
            </div>
        </div>
    </main>
</template>

<script>
    import IndexSidebar from 'frontend/components/Sidebar'
    import Pagination from 'frontend/components/Pagination'

    export default {
        data () {
            return {
                posts: [],
                include:'?include=category'
            }
        },
        components: {
            IndexSidebar, Pagination
        },
        created: function () {
            this.$http.get(this.$endpoints.posts.index + this.include).then(posts => {
                this.posts = posts
            }).catch(e => {})
        }
    }
</script>
