<template>
    <main class="site-main">
        <div class="wrapper bg--white center">
            <div class="container">
                <div class="page__header pt6 pb5 clearfix gutter sm-col-10 md-col-8 sm-offset-1 md-offset-2">
                    <div class="header__content col lg-col-12 mb4 lg-mb0 text-center">
                        <p>我们真的尽力了，但还是没找到您要的内容。</p>
                        <router-link :to="{name: 'frontend.home'}" class="btn btn--teal">返回首页</router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .container {min-height: 380px;}
</style>
