import {createRouter, createWebHashHistory} from 'vue-router'
import {importDynamicComponent} from "@/utils/helpers";
import useStore from "@/store";


const routes = [
  {
    path: '/',
    name: 'home',
      component: () => importDynamicComponent('@/views/Home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
      component: () => importDynamicComponent('@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
      component: () => importDynamicComponent('@/views/Dashboard.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((route)=>{
  const store = useStore()
  if (route.path==='/login'){
    return
  }
  if (store.auth_token) {
    return
  }
  router.replace('/login')
})

export default router
