<template>
    <div class="md-col md-col-5 lg-col-4 sidebar">
        <div class="card card--gray mb3" id="top-posts">
            <header class="card__header">
                <h2>文章推荐</h2>
                <img class="header__icon" src="/vendor/images/icon-newsletter.png">
            </header>
            <div class="card__content">
               <ul class="list-unstyled">
                   <li :class="key == 0 ? 'first' : ''" v-for="(post, key) in posts" :key="post.id">
                        <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">
                            {{ key == 0 ? '🏆' : ((key + 1)) }}、{{ post.title }}
                        </router-link>
                    </li>
               </ul>
            </div>
        </div>
        <div class="card card--gray mb3">
            <header class="card__header">
                <h2>友情链接</h2>
                <img class="header__icon" src="/vendor/images/icon-chair.png">
            </header>
            <div class="card__content">
                <dl class="list-unstyled">
                    <dt><a href="https://laravel-china.org/" class="link--white" rel="nofollow">Laravel China</a></dt>
                    <dd>高品质的 Laravel 开发者社区</dd>
                    <dt><a href="https://laravel-news.com/" class="link--white" rel="nofollow">Laravel News</a></dt>
                    <dd>最新 laravel 资讯、教程</dd>
                    <dt><a href="https://laravel-china.org/docs" class="link--white" rel="nofollow">Laravel 社区文档</a></dt>
                    <dd>优质的社区翻译文档，包括 laravel 中文文档、设计模式、Dingo API 中文文档，</dd>
                </dl>
            </div>
        </div>

        <div class="card sponsor sponsor--block mb3">
            <a href="https://github.com/godruoyi/gblog/issues/new">
                <span style="margin-top: 7px;display: inline-block;">
                      <i class="fa fa-heart" aria-hidden="true" style="color: rgba(232, 146, 136, 0.89);"></i> 建议反馈？请私信 Godruoyi
                </span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                posts: []
            }
        },
        created: function () {
            this.$http.get(this.$endpoints.posts.recommend).then(response => {
                this.posts = response.data
            }, error => {})
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        margin-bottom: 20px;
    }
    #top-posts {
        background-color: #f4645f;
        .list-unstyled {
            li a {
                color: #fff;
            }
            .first {
                margin-left: -7px;
            }
        }
    }
    dl dt {margin-bottom: 3px;}
    .link--white {color: #e2dcdc!important;}
    .sponsor--block {
        padding: 18px!important;
        color: #a5a5a5;
        a {
            color: #a5a5a5;
        }
    }
</style>
