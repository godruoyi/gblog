export default [
    {
        path: '/categories',
        component: require('./Index.vue'),
        name: 'frontend.category',
        meta: {
            title: '分类'
        }
    },
    {
        path: '/categories/:slug',
        component: require('./Detail.vue'),
        name: 'frontend.category.detail'
    }
]
