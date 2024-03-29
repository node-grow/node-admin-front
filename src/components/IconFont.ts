import useStore from "@/store";
import {createFromIconfontCN} from "@ant-design/icons-vue";

const store = useStore()
let icon_url='//at.alicdn.com/t/font_3332360_8cknlj6abln.js'
if (store.system_config.iconfont_url) {
    icon_url = store.system_config.iconfont_url
}
const IconFont = createFromIconfontCN({
    scriptUrl: icon_url
})

export default IconFont