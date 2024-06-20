import $http from "@/utils/http"
import useStore from '@/store'

export async function getKey(){
    let res=await $http.get('/auth/key',{
        // @ts-ignore
        allow_no_key: true,
    })
    const store = useStore()
    store.auth_token = res.data

}