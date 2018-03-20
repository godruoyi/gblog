import Detail from './Detail'

export default [
    {
        path: '/',
        component: require('./Index'),
        name: 'frontend.home'
    },
    {
        path: 'posts/:slug',
        component: Detail,
        name: 'frontend.post.detail'
    }
]
