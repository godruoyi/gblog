import swal from 'sweetalert'

export default {
    login: function (response) {
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
                let url = 'https://github.com/login/oauth/authorize?client_id=393f40cf9a2f7ff41916&redirect_uri='+currentUrl+'&scopes=user&state=godruoyi'

                location.href = url
            } else if (yes == 'anonymous') {
                location.href = currentUrl + '?xxxx=xxxx&xxx=xxxxx'
            }
        });
    }
}
