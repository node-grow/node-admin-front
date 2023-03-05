import $http from '@/utils/http'

export function getSystemConfig(){
    return $http.get('/common/config/backend')
}

export function getSystemInfo(){
    return $http.get('/common/system/info')
}