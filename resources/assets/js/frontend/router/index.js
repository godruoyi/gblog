import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    routes,
    linkActiveClass: '',
    mode: 'history', // do not use /#/.
    scrollBehavior: function (to, from, savedPosition) {
        if (to.hash) {
            return {selector: to.hash}
        }

        return savedPosition ? savedPosition : {x: 0, y: 0}
    }
})

export default router
