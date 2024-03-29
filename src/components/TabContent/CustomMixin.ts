import {getCurrentInstance, onMounted, onUnmounted} from "vue"
import {externalComponent} from "@/utils/helpers";
import http from "@/utils/http";

export default {
    setup(props:any){
        const ins = getCurrentInstance()
        let vm:any
        onMounted(async ()=>{
            try {
                if (ins) {
                    // @ts-ignore
                    ins.http = http
                }
                const vmFunc = await externalComponent(props.option.url)
                // @ts-ignore
                vm = vmFunc.default({
                    ...props,
                    http,
                    instance: ins,
                })
                vm.mount('#' + props.uuid)
            }catch (e){
                console.error(e)
            }
        })

        onUnmounted(()=>{
            if (vm) {
                vm.unmount()
            }
        })

        return {
            uuid: props.uuid
        }
    }
}
