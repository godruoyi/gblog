import Frontend from '../pages'

const NotFound = {
    path: '*',
    name: '404',
    component: require('frontend/components/NotFound.vue')
}

export default [...Frontend, NotFound]
