import axios from 'axios'
import interceptors from './interceptors'
import { ApibaseURI } from 'src/config'

export const http = axios.create({
    baseURL: ApibaseURI,
    headers: {
        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]'),
        'Accept': `application/vnd.godruoyi.v1+json`,
    }
})

export default function install(Vue, { router }) {
    // when vue plugins is install, register axios interceptors
    interceptors(http, router)

    Object.defineProperty(Vue.prototype, '$http', {
        get() {
            return http
        },
    })
}
