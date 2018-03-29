<template>
    <div>
        <app-header></app-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
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
