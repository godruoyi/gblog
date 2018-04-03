export default [
    {
        path: '/categories',
        component: require('./Index.vue'),
        name: 'frontend.category'
    },
    {
        path: '/categories/:slug',
        component: require('./Detail.vue'),
        name: 'frontend.category.detail'
    }
]
