import $http from '@/utils/http'

export function getConfig(url:string,params:object){
    return $http.get(url,{
        params: params
    })
}