import $http from "@/utils/http"

// export function getNodeContent(url: string){
//     return $http.get(url)
// }

export function getDataList(url: string){
    return $http.get(url)
}
