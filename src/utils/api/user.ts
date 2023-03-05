import $http from '@/utils/http'

export function getCurrentMenu(){
    return $http.get('/user/current/menu')
}

export function getCurrentInfo(){
    return $http.get('/user/current/info')
}