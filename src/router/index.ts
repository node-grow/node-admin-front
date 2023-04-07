import {createRouter, createWebHashHistory} from 'vue-router'
import $store from '@/store'
import {importAsyncModule} from "@/utils/helpers";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => importAsyncModule('@/views/Home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => importAsyncModule('@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => importAsyncModule('@/views/Dashboard.vue'),
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
  if ($store.state.auth_token){
    return
  }
  router.replace('/login')
})

export default router
