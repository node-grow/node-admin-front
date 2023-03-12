import {AxiosError, AxiosInstance, default as axios} from "axios"
import {notification} from "ant-design-vue"
import $router from '@/router'
import $store from '@/store'

const timeout = 10000
interface MyAxios extends AxiosInstance{
    loading: boolean,
    show_success_message: true,
    show_error_message: true,
}

let myAxios = <MyAxios>axios.create({
    baseURL: (process.env.VUE_APP_API_BASE_URL || '/admin',
        timeout,
})

myAxios.loading=true
myAxios.show_success_message=true
myAxios.show_error_message=true

myAxios.interceptors.request.use(async (config)=>{
    if (myAxios.loading) {
        $store.commit('setGlobalLoading', true)
    }
    myAxios.loading=true

    if (config.headers && $store.state.auth_token) {
        config.headers['Authorization'] = $store.state.auth_token
    }
    return config
},error => {
    $store.commit('setGlobalLoading',false)

    return Promise.reject(error)
})

myAxios.interceptors.response.use(response=>{
    $store.commit('setGlobalLoading',false)

    if (/(json|JSON)/.test(response.headers['content-type'])){
        const res = response.data
        const message=res?.message
        if (myAxios.show_success_message && message){
            notification.success({
                message: message
            })
        }

        return res
    }
    myAxios.show_success_message=true
    return response
},(error:AxiosError) => {
    $store.commit('setGlobalLoading',false)

    if (error.response?.status===401){
        notification.error({
            message: '未授权，请重新登录'
        })
        $router.replace({path:'/login'})
        return
    }

    const res=error.response?.data?.apifoxError || error.response?.data
    let message=res?.message||'网络请求错误，请稍候重试'

    if (myAxios.show_error_message) {
        notification.error({
            message: message
        })
    }

    myAxios.show_error_message=true
    return Promise.reject(error)
})

export default myAxios
