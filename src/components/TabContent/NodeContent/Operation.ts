import $store, {AdminTabOption} from '@/store'
import {Modal} from "ant-design-vue";
import {createVNode, getCurrentInstance, h} from "vue";
import $http from "@/utils/http"
import {ExclamationCircleOutlined} from "@ant-design/icons-vue"
import ModalContainer from "@/components/TabContent/NodeContent/ModalContainer.vue"

export function replaceUrl(url:string,replace?:any){
    let matches = url.match(/{\w+}/g) || url.match(/__\w+__/g)
    if (!replace){
        return url
    }
    if (matches){
        matches.map((name:string)=>{
            name=name.replace(/[{}]|__/g,'')
            if (replace[name]===undefined){
                return
            }
            url=url.replace(`{${name}}`,replace[name])
            url=url.replace(`__${name}__`,replace[name])
        })
    }
    return url
}

export function replaceBody(body?:any,replace?:any){
    if (!body){
        return body
    }
    if (!replace){
        return body
    }

    switch (typeof body){
        case "object":
            for (const key in body) {
                body[key]=replaceBody(body[key],replace)
            }
            break
        case "string":
            let matches=body.match(/^{(\w+)}$/)
            if(!matches){
                matches=body.match(/^__(\w+)__$/)
            }
            if (!matches){
                break
            }
            const name = matches[1]
            if (replace[name] !== undefined){
                body=replace[name]
            }
            break
    }

    return body
}

async function modal(option: any) {
    option = Object.assign({}, <AdminTabOption>{
        title: '',
        url: '',
        type: 'node_content',
        closable: true,
        onClose(){

        },
        replace: {},
        body: {},
    }, option)
    option.url= replaceUrl(option.url,option.replace)
    const appContext = option.appContext || getCurrentInstance()?.appContext

    let res:any={};
    if (option.type==='node_content'){
        res=await request({
            ...option,
            onSuccess(){},
        })
    }

    const modal = Modal.info({
        title: option.title,
        centered: true,
        appContext,
        content(){
            return h(ModalContainer, {
                option: option,
                getModal(){
                    return modal
                },
                style: {
                    width: '100%',
                },
                nodePreload: res?.data
            })
        },
        icon: null,
        keyboard: false,
        closable: true,
        cancelText: false,
        class: 'tab-content-modal',
        width: '60vw',
        afterClose(){
            option.onClose()
        }
    })

}

function goto_as_a(option: any) {
    option = Object.assign({}, {
        url: '',
        target: '_blank',
    }, option)

    option.url = replaceUrl(option.href || option.url, option.replace)
    const a = document.createElement('a')
    a.href = option.url
    a.target = option.target
    a.click()

}

function add_tab(option: any) {
    option = Object.assign({}, <AdminTabOption>{
        title: '',
        url: '',
        type: 'node_content',
        closable: true,
        replace: null
    }, option)

    option.url=replaceUrl(option.url,option.replace)
    $store.commit('pushAdminTab', option)
}

export declare interface RequestOption{
    url: String,
    method: String,
    body?: Object|any,
    confirm?: boolean,
    onSuccess?: Function,
    onError?: Function,
}

async function request(option: any){
    option = Object.assign({},<RequestOption>{
        url: '',
        method: 'get',
        replace: null,
        onSuccess(){},
        onError(){},
    },option)

    if (option.confirm){
        const r = await new Promise(resolve => {
            Modal.confirm({
                title: replaceUrl(option.confirm,option.replace),
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    resolve(true)
                },
                onCancel() {
                    option.onClose()
                    resolve(false)
                },
            });
        })
        if (!r){
            return r;
        }
    }

    option.url = replaceUrl(decodeURIComponent(option.url), option.replace)
    option.body = replaceBody(option.body, option.replace)

    try {
        const res = await $http(option.url, {
            data: option.body,
            method: option.method,
        })
        option.onSuccess(res)
        return res
    }catch (err){
        option.onError(err)
        throw err
    }
}

export declare interface OperationType {
    [key: string]: Function
}

export default <OperationType>{
    goto_as_a,
    add_tab,
    modal,
    request
}
