import axios from 'axios'
import interceptors from './interceptors'
import { ApibaseURI, AcceptHerader } from 'src/config'

export const http = axios.create({
    baseURL: ApibaseURI,
    headers: {
        'Accept': AcceptHerader
    }
})

export default function install(Vue, { router }) {
    interceptors(http, router)

    Object.defineProperty(Vue.prototype, '$http', {
        get() {
            return http
        },
    })
}
