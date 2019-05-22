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
    },
    links: {
        index: '/links'
    },
    comment: '/posts/:post/comments',
    search: '/search',
    fileupload: 'images/upload',
    github: '/socials/github/authorizations',
    anonymous: '/socials/anonymous/authorizations',
}
