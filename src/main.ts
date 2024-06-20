import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import VueAxios from "vue-axios"
import http from '@/utils/http'
import Operation from "@/components/TabContent/NodeContent/Operation";
import initProvide from "@/utils/initProvide"
import 'viewerjs/dist/viewer.min.css'
import VueViewer from "v-viewer";
import {AxiosStatic} from "axios";
import {createPinia} from "pinia";
import container from "@/utils/container";

if (typeof window !== 'undefined') {
    window.$container = container;
}

createApp(App)
    .use(createPinia())
    .use(initProvide)
    .use(VueViewer)
    .use(router)
    .use(VueAxios, http as AxiosStatic)
    .provide('operation',Operation)
    .provide('axios', http)  // provide 'axios'
    .mount('#app')
