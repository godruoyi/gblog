<template>
    <div class="app1 s-bgcolor_f2f3f5">
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {default as AppHeader} from './Header'
    import {default as AppFooter} from './Footer'

    export default {
        components: {AppFooter, AppHeader}
    }
</script>

<style lang="scss">
    .app1 { position:relative }
    .app1.s-bgcolor_f2f3f5 { background-color:#f2f3f5 }
    body {margin: 0;}
</style>
