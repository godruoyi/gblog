export default {
    posts: {
        index: '/posts',
        detail: '/posts/:slug',
        recommend: '/posts/recommend'
    },
    categories: {
        index: '/categories',
        detail: '/categories/:slug',
        posts: '/categories/:slug/posts'
    }
}
