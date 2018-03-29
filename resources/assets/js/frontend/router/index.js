import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    routes,
    linkActiveClass: '',
    mode: 'history', // do not use /#/.
})

export default router
