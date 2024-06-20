import {createRouter, createWebHashHistory} from 'vue-router'
import {importDynamicComponent} from "@/utils/helpers";


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
  if (route.path==='/login'){
    return
  }
    const auth_token = sessionStorage.getItem('auth_token')
    if (auth_token) {
    return
  }
  router.replace('/login')
})

export default router
