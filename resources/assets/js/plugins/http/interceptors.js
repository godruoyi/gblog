import swal from 'sweetalert'

export default (http, router) => {
    http.interceptors.response.use(response => response.data, (error) => {
        const { response } = error

        if (response && response.status == 404) {
            return router.push({name: 'notfound'})
        } else if (response && response.status == 401) {
            let title = localStorage.getItem('access_token')
                ? '登录失败，是否需要重新登录？'
                : '您还没有登录，请选择下列方式登录'

            swal({
                title: title,
                text: response.data.message,
                icon: "error",
                buttons: {
                    cancel: "取 消",
                    anonymous: {
                        text: '匿名登录',
                        value: 'anonymous'
                    },
                    github: {
                        text: 'GitHub 登录',
                        value: 'github'
                    }
                }
            })
            .then((yes) => {
                let currentUrl = location.origin + location.pathname
                if ('github' == yes) {
                    currentUrl = encodeURIComponent(currentUrl)
                    let url = 'https://github.com/login/oauth/authorize?client_id=393f40cf9a2f7ff41916&redirect_uri='+currentUrl+'&scopes=user&state=github'

                    location.href = url
                } else if (yes == 'anonymous') {
                    location.href = currentUrl + '?code=anonymous&state=anonymous'
                }
            });

            localStorage.removeItem('access_token')
            localStorage.removeItem('user_info')

            this.$router.replace({path: document.location.pathname, query: {}})

            return Promise.reject(error)
        }

        swal("您成功的发现一枚 Bug", response.data.message, "error")

        return Promise.reject(error)
    })

    http.interceptors.request.use(config => {
        let p = /\/posts\/[0-9]+\/comments/

        if (p.test(config.url)) {
            const token = 'Bearer ' + localStorage.getItem('access_token')

            if (token) {
                config.headers['Authorization'] = token
            }
        }

        return config
    }, error => {
        return Promise.reject(error)
    })
}
