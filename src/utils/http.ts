import {AxiosError, AxiosStatic, default as axios} from "axios"
import {notification} from "ant-design-vue"
import $router from '@/router'
import useStore from "@/store";

const timeout = 10000

interface MyAxios extends AxiosStatic {
    loading: boolean,
    show_success_message: true,
    show_error_message: true,
}

let myAxios = <MyAxios>axios.create({
    baseURL: (import.meta.env.VITE_APP_API_BASE_URL || '/admin'),
    timeout,
})

myAxios.loading = true
myAxios.show_success_message = true
myAxios.show_error_message = true


myAxios.interceptors.request.use(async (config) => {
    const store = useStore()
    if (myAxios.loading) {
        store.global_loading = true
    }
    myAxios.loading = true

    const auth_token = sessionStorage.getItem('auth_token')
    if (config.headers && auth_token) {
        config.headers['Authorization'] = auth_token
    }
    return config
}, error => {
    const store = useStore()
    store.global_loading = false

    return Promise.reject(error)
})

myAxios.interceptors.response.use(response => {
    const store = useStore()
    store.global_loading = false

    if (/(json|JSON)/.test(response.headers['content-type'])) {
        const res = response.data
        const message = res?.message
        if (myAxios.show_success_message && message) {
            notification.success({
                message: message
            })
        }

        return res
    }
    myAxios.show_success_message = true
    return response
}, (error: AxiosError) => {
    const store = useStore()
    store.global_loading = false

    if (error.response?.status === 401) {
        notification.error({
            message: '未授权，请重新登录'
        })
        $router.replace({path: '/login'})
        return
    }

    // @ts-ignore
    const res = error.response?.data?.apifoxError || error.response?.data
    let message = res?.message || '网络请求错误，请稍候重试'

    if (myAxios.show_error_message) {
        notification.error({
            message: message
        })
    }

    myAxios.show_error_message = true
    return Promise.reject(error)
})

export default myAxios
