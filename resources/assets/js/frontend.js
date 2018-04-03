import Vue from 'vue'
import {router} from 'frontend/index'

/**
* set http instance base axios
*/
import httpPlugin from './plugins/http'

import {default as timeago} from './utils/timeago'

Vue.filter('timeago', timeago)

import App from 'frontend/App'

Vue.use(httpPlugin, {router});

Vue.prototype.$config = require("./config")
Vue.prototype.$endpoints = require("frontend/endpoints").default

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
