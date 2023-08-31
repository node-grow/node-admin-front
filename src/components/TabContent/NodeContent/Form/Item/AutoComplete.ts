import {ref, watch} from "vue";
import {debounce} from "lodash-es";
import http from "@/utils/http";

export function useAutoComplete(props: any) {
    const autoOptions = ref<any[]>([])
    if (props.option.auto_complete_options?.length) {
        autoOptions.value = props.option.auto_complete_options
    }

    if (props.option.auto_complete_options_url) {
        watch(() => props.value, () => {
            debounce(async () => {
                let url = props.option.auto_complete_options_url
                url += (url.indexOf('?') ? '&' : '?') + 'search=' + props.value
                const res = await http.get(url)
                autoOptions.value = res.data
            }, 500)
        })
    }

    return {autoOptions}
}