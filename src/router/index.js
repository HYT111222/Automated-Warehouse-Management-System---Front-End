import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/welcome/welcome.vue'
import Login from '@/components/welcome/Login.vue'
import Home from '@/menu/Home.vue'
import Plan from '@/menu/plan.vue'
import Cost from '@/menu/cost.vue'
import Data from '@/menu/data.vue'
//https://registry.npm.taobao.org
import Register from '@/components/welcome/Register.vue';
import Seek from '@/menu/seekParcel.vue'
import User from '@/menu/personalPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/welcome', component: Welcome },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', redirect: '/welcome' },
  {
    path: '/home',
    component: Home,
    children: [
      // 写子路由  显示在主区域
      { path: '/plan', component: Plan },
      { path: '/seek', component: Seek },
      { path: '/personalPage', component: User},
      { path: '/cost', component: Cost},
      { path: '/data', component: Data}
      // ,
      // { path: '/home', redirect: '/plan'}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  
  if(to.path == '/login' || to.path == '/register'|| to.path == '/welcome'){
      next()
  }else {
    let token = JSON.parse(window.sessionStorage.getItem("Token"))
    if ( token.token != ""){
      next()
    }else {
      alert("请先进行登录操作")
      next('/login')
    }
  }
})
export default router
