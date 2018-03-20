import Master from './layouts/Master'
import Post from './post'

export default [
    {
        path: '/',
        component: Master,
        // redirect: {name: 'frontend.home'},
        children: [
            ...Post
        ]
    },
]
