import {AsyncComponentLoader, defineAsyncComponent} from "vue";
import useStore from "@/store";
import {sleep} from "@/utils/helpers";
import Loading from "@/components/Common/Loading.vue";

export type Container = {
    register(key: string, loader: AsyncComponentLoader): void
    get(key: string): AsyncComponentLoader,
    registerCommonObject(key: string, value: any): void
    getCommonObject(key: string): any
}

const components = <{ [key: string]: AsyncComponentLoader }>{}
const commonObject = <{ [key: string]: any }>{}

const container: Container = {
    registerCommonObject(key: string, value: any) {
        if (commonObject[key]) {
            throw new Error(`common object ${key} is already registered`)
        }
        commonObject[key] = value
    },
    getCommonObject(key: string) {
        return commonObject[key]
    },

    register(key: string, loader: AsyncComponentLoader) {
        if (components[key]) {
            throw new Error(`component ${key} is already registered`)
        }
        components[key] = loader
    },
    get(key: string) {
        if (!components[key]){
            throw new Error(`component ${key} is not registered`)
        }
        const store = useStore()

        return defineAsyncComponent({
            loadingComponent: Loading,
            onError(error, retry, fail, attempts) {
                if (attempts<3){
                    return retry()
                }
                fail()
            },
            loader: async () => {
                try {
                    await new Promise(async (resolve) => {
                        while (store.loadedExtraScript === false) {
                            await sleep(100)
                        }
                        resolve(true)
                    })
                    if (components[key] instanceof Function) {
                        return components[key]()
                    }
                    return components[key]
                } catch (e) {
                    console.error(`component ${key} is load error`)
                    throw e
                }
            },
        })
    }
}

if (typeof window !== 'undefined') {
    window.$container = container;
}

export default container