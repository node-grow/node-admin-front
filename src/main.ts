import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueAxios from "vue-axios"
import http from '@/utils/http'
import Operation from "@/components/TabContent/NodeContent/Operation";
import initProvide from "@/utils/initProvide"
import initStorePersistence from "@/store/store.persistence"
import 'viewerjs/dist/viewer.min.css'
import VueViewer from "v-viewer";

initStorePersistence(store)
console.log(process.env)

createApp(App)
    .use(initProvide)
    .use(store)
    .use(router)
    .use(VueViewer)
    // .use(Antd)
    .use(VueAxios,http)
    .provide('operation',Operation)
    .provide('axios', http)  // provide 'axios'
    .mount('#app')
