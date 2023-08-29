import $http from '@/utils/http'

export function getCurrentMenu(module: string) {
    return $http.get(`/user/current/menu/${module}`)
}

export function getCurrentModule() {
    return $http.get('/user/current/module')
}

export function getCurrentInfo(){
    return $http.get('/user/current/info')
}