import $http from "@/utils/http"

export interface PostUserRequest {
    username:string,
    password:string,
    captcha?:string,
    captcha_key?:string,
}
export function postUser(x:PostUserRequest){
    return $http.post('/login/user',x)
}

export function getValidateCode(){
    return $http.get('/login/validateCode')
}

export function deleteUser(){
    return $http.delete('/login/user')
}