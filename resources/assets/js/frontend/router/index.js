import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {Title} from 'src/config'

Vue.use(Router)

const router = new Router({
    routes,
    linkActiveClass: '',
    mode: 'history', // do not use /#/.
    scrollBehavior: function (to, from, savedPosition) {
        if (to.hash) {
            return {selector: to.hash}
        }

        return {x: 0, y: 0}
    }
})

router.beforeEach((to, from, next) => {
    let title = to.meta.title
        ? (to.meta.title + ' | ' + Title)
        : Title

    window.document.title = title

    return next()
})


export default router
