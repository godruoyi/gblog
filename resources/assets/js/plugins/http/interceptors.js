export default (http, router) => {
    //https://github.com/axios/axios#interceptors
    http.interceptors.response.use(response => response.data, (error) => {
        const { response } = error

        console.log('error...........')
        console.error(response)

        return Promise.reject(error)
    })
}
