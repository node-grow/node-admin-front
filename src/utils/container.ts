import {AsyncComponentLoader, defineAsyncComponent} from "vue";
import useStore from "@/store";
import {sleep} from "@/utils/helpers";
import Loading from "@/components/Common/Loading.vue";

export type Container = {
    register(key: string, loader: AsyncComponentLoader): void
    get(key: string): AsyncComponentLoader
}

const components = <{ [key: string]: AsyncComponentLoader }>{}

const container: Container = {
    register(key: string, loader: AsyncComponentLoader) {
        if (components[key]) {
            throw new Error(`component ${key} is already registered`)
        }
        components[key] = loader
    },
    get(key: string) {
        const store = useStore()

        return defineAsyncComponent({
            loadingComponent: Loading,
            loader: async () => {
                await new Promise(async (resolve) => {
                    while (store.loadedExtraScript === false) {
                        await sleep(100)
                    }
                    resolve(true)
                })
                return components[key]()
            },
        })
    }
}

export default container