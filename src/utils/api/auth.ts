import $http from "@/utils/http"
import $state from '@/store'

export async function getKey(){
    let res=await $http.get('/auth/key',{
        // @ts-ignore
        allow_no_key: true,
    })
    $state.commit('setAuthToken',res.data)
}