import {computed, ref, watch} from "vue";
import {debounce} from "lodash-es";
import http from "@/utils/http";

export function useAutoComplete(props: any) {
    const autoOptions = ref<any[]>([])
    if (props.option.auto_complete_options?.length) {
        autoOptions.value = props.option.auto_complete_options.map((v: string) => {
            return {
                value: v
            }
        })
    }

    if (props.option.auto_complete_options_url) {
        watch(() => props.value, () => {
            debounce(async () => {
                let url = props.option.auto_complete_options_url
                url += (url.indexOf('?') ? '&' : '?') + 'search=' + props.value
                const res = await http.get(url)
                autoOptions.value = res.data.map((v: string) => {
                    return {
                        value: v
                    }
                })
            }, 500)
        })
    }
    const s = ref('')

    const computedOptions = computed(() => {
        return autoOptions.value.filter(o => {
            return o.value.includes(s.value)
        })
    })

    const handleSearch = (v: string) => {
        s.value = v
    }

    return {autoOptions, computedOptions, handleSearch}
}