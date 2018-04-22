<template>
    <nav class="site-nav">
        <div class="container wrapper">
            <div class="nav__header">
                <router-link :to="{name: 'frontend.home'}" class="nav__logo">
                    <img src="/vendor/images/44x44.png">
                    <p class="logo__title">godruoyi</p>
                </router-link>
                <button type="button" class="nav__hamburger js-menu-toggle" v-on:click="ismini = !ismini">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </button>
            </div>
            <div :class="showminiCss">
                <div class="nav__search">
                    <div class="search">
                        <input type="text" placeholder="SEARCH" @keyup.enter="search" name="q" v-model="keyword">
                        <button type="button" v-on:click="search"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use></svg></button>
                    </div>
                </div>
                <div class="nav__main">
                    <ul>
                        <li v-on:click="ismini = ! ismini" class="nav__item"><router-link :to="{name: 'frontend.home'}">Home</router-link></li>
                        <li v-on:click="ismini = ! ismini" class="nav__item"><router-link :to="{name: 'frontend.category'}">Categories</router-link></li>
                        <li v-on:click="ismini = ! ismini" class="nav__item"><router-link :to="{name: 'frontend.post.detail', params: {slug: 'the-about-gblog'}}">About</router-link></li>
                        <li class="nav__item"><a target="_blank" href="https://github.com/godruoyi/gblog">Github</a></li>
                    </ul>
                </div>
                <ul class="nav__social social social--lg">
                    <li><a href="https://github.com/godruoyi/gblog" rel="nofollow" class="social__icon icon--github">
                            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-github"></use></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data () {
            return {
                ismini: false,
                keyword: ''
            }
        },
        computed: {
            showminiCss: function () {
                return this.ismini ? 'nav__container js-menu is-active' : 'nav__container js-menu'
            },
        },
        methods: {
            search: function () {
                this.ismini = false

                this.$router.push({ name: 'frontend.search', query: { q: this.keyword }})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .social.social--lg {
        // margin-top: 50px;

        li {
            width: 70px;
            margin: auto;

            img {
                border: 0;
                width: 100%;
                border-radius: 50%;
                background-size: cover;
                background-position: 50%;
            }
        }
    }

</style>
