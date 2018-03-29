import Master from './layouts/Master'
import Post from './post'
import Category from './categories'

export default [
    {
        path: '/',
        component: Master,
        // redirect: {name: 'frontend.home'},
        children: [
            ...Post,
            ...Category
        ]
    },
]
