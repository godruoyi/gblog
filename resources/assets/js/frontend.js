import Vue from 'vue'
import {router} from 'frontend/index'

/**
* set http instance base axios
*/
import httpPlugin from './plugins/http'

import App from 'frontend/App'

Vue.use(httpPlugin, {router});

Vue.prototype.$config = require("./config")
Vue.prototype.$endpoints = require("frontend/endpoints").default

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
