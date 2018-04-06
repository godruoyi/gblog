<template>
    <div class="md-col md-col-5 lg-col-4 sidebar">
        <div class="card card--gray mb3" id="top-posts">
            <header class="card__header">
                <h2>文章推荐</h2>
                <img class="header__icon" src="/vendor/images/icon-newsletter.png">
            </header>
            <div class="card__content">
               <ul class="list-unstyled">
                   <li :class="key == 0 ? 'first' : ''" v-for="(post, key) in posts" :key="post.id" :title="post.title">
                        <router-link :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">
                            {{ key == 0 ? '🏆' : ((key + 1)) }}、{{ post.title | title }}
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
                    <template v-for="link in links">
                        <dt><a :href="link.link" class="link--white" rel="nofollow">{{ link.name }}</a></dt>
                        <dd>{{ link.desc }}</dd>
                    </template>
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
        props: {
            links: {
                type: Array,
                required: true
            }
        },
        data () {
            return {
                posts: []
            }
        },
        created: function () {
            this.$http.get(this.$endpoints.posts.recommend).then(response => {
                this.posts = response.data
            }, error => {})
        },
        filters: {
            title: function (title) {
                if (title && title.length > 30) {
                    title = title.substring(0, 30) + '...'
                }

                return title
            }
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
    .sponsor.sponsor.sponsor{
        min-width: auto;
    }
</style>
