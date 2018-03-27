import Frontend from '../pages'
import Master from './../pages/layouts/Master'

const NotFound = {
    path: '/',
    component: Master,
    children: [
        {
            path: '404',
            name: '404',
            component: require('frontend/components/NotFound.vue')
        }
    ]
}

export default [...Frontend, NotFound]
