import useStore, {AdminTabOption} from '@/store'
import {Modal} from "ant-design-vue";
import {createVNode, getCurrentInstance, h, withCtx} from "vue";
import $http from "@/utils/http"
import {ExclamationCircleOutlined} from "@ant-design/icons-vue"
import ModalContainer from "@/components/TabContent/NodeContent/ModalContainer.vue"
import container from "@/container";

export function replaceUrl(url: string, replace?: any) {
    let matches = url.match(/{\w+}/g) || url.match(/__\w+__/g)
    if (!replace) {
        return url
    }
    if (matches) {
        matches.map((name: string) => {
            name = name.replace(/[{}]|__/g, '')
            if (replace[name] === undefined) {
                return
            }
            url = url.replace(`{${name}}`, replace[name])
            url = url.replace(`__${name}__`, replace[name])
        })
    }
    return url
}

export function replaceBody(body?: any, replace?: any) {
    if (!body) {
        return body
    }
    if (!replace) {
        return body
    }

    switch (typeof body) {
        case "object":
            for (const key in body) {
                body[key] = replaceBody(body[key], replace)
            }
            break
        case "string":
            let matches = body.match(/^{(\w+)}$/)
            if (!matches) {
                matches = body.match(/^__(\w+)__$/)
            }
            if (!matches) {
                break
            }
            const name = matches[1]
            if (replace[name] !== undefined) {
                body = replace[name]
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
        onClose() {

        },
        replace: {},
        body: {},
    }, option)
    option.url = replaceUrl(option.url, option.replace)
    const appContext = option?.instance?.appContext || getCurrentInstance()?.appContext

    let res: any = {};
    if (option.type === 'node_content' && !option.node_data) {
        res = await request({
            ...option,
            onSuccess() {
            },
        })

        option.node_data = res?.data
    }

    const modalVm = container.getCommonObject('modal').info({
        title: option.title,
        centered: true,
        appContext,
        content() {
            return h(ModalContainer, {
                option: option,
                getModal() {
                    return modalVm
                },
                style: {
                    width: '100%',
                },
            })
        },
        style: {
            minWidth: '720px',
            maxWidth: '1000px',
            width: '60vw',
        },
        icon: null,
        keyboard: false,
        closable: true,
        cancelText: false,
        class: 'tab-content-modal',
        afterClose() {
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

function navigate(option: any) {
    option = Object.assign({}, <AdminTabOption>{
        title: '',
        url: '',
        type: 'node_content',
        closable: true,
        replace: null
    }, option)

    withCtx(() => {
        option.url = replaceUrl(option.url, option.replace)
        const ncSetOption = option.instance.proxy.ncSetOption
        request(option).then((res: any) => {
            if (!ncSetOption) {
                return
            }
            ncSetOption(res.data)
        })
    }, option.instance.context)()

}

function add_tab(option: any) {
    const store = useStore()

    option = Object.assign({}, <AdminTabOption>{
        title: '',
        url: '',
        type: 'node_content',
        closable: true,
        replace: null
    }, option)

    option.url = replaceUrl(option.url, option.replace)
    store.pushAdminTab(option)
}

export declare interface RequestOption {
    url: String,
    method: String,
    body?: Object | any,
    confirm?: boolean,
    onSuccess?: Function,
    onError?: Function,
    reload_menu?: boolean,
}

export async function request(option: any) {

    option = Object.assign({}, <RequestOption>{
        url: '',
        method: 'get',
        replace: null,
        onSuccess() {
        },
        onError() {
        },
    }, option)

    if (option.confirm) {
        const r = await new Promise(resolve => {
            Modal.confirm({
                title: replaceUrl(option.confirm, option.replace) || '确定要操作吗？',
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
        if (!r) {
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
    } catch (err) {
        option.onError(err)
        throw err
    }
}

export declare interface OperationType {
    [key: string]: Function
}

export default <OperationType>{
    navigate,
    goto_as_a,
    add_tab,
    modal,
    request
}
