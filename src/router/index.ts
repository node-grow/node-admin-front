import {createRouter, createWebHashHistory} from 'vue-router'
import $store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/Home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: ()=>import('@/views/Dashboard.vue'),
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
