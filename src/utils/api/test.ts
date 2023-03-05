import $http from "@/utils/http"

export function testNoAuth(){
    return $http.get('/user/current/info?apifoxResponseId=33709349')
}