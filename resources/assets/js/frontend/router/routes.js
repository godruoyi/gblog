import Frontend from '../pages'
import Master from './../pages/layouts/Master'

const NotFound = {
    path: '/',
    component: Master,
    children: [
        {
            path: '*',
            name: '404',
            component: require('frontend/components/NotFound.vue'),
            meta: {
                title: '404 NotFound'
            }
        },
        {
            path: '404',
            name: 'notfound',
            component: require('frontend/components/NotFound.vue'),
            meta: {
                title: '404 NotFound'
            }
        }
    ]
}

export default [...Frontend, NotFound]
