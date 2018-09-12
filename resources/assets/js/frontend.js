import Vue from 'vue'
import {router} from 'frontend/index'

/**
* set http instance base axios
*/
import httpPlugin from './plugins/http'

import {default as timeago} from './utils/timeago'

Vue.filter('timeago', timeago)

import App from 'frontend/App'

import { Loading } from 'element-ui'
Vue.use(Loading.directive)

Vue.use(httpPlugin, {router});

require('animate.css')

Vue.prototype.$config = require("./config")
Vue.prototype.$endpoints = require("frontend/endpoints").default

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
