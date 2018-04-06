<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer :links="links.bottom"></app-footer>
    </div>
</template>

<script>
    import {default as AppHeader} from './Header'
    import {default as AppFooter} from './Footer'

    export default {
        components: {AppFooter, AppHeader},
        data () {
            return {
                links: {
                    left: [],
                    bottom: []
                }
            }
        },
        created: function () {
            this.$http.get(this.$endpoints.links.index).then(links => {
                let lefts = []
                let bottoms = []

                links.data.forEach(link => {
                    if (link.type === 'left') {
                        lefts.push(link)
                    } else {
                        bottoms.push(link)
                    }
                })

                this.links.left = lefts
                this.links.bottom = bottoms
            }, e => {})
        }
    }
</script>
