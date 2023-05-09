import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/other/welcome.vue'
import Login from '@/components/menu/User/Login.vue'
import Home from '@/components/menu/Home2.vue'
import Enter from '@/components/menu/peopleManage/Enter.vue'
import Outer from '@/components/menu/peopleManage/Outer.vue'
import Company from '@/components/menu/peopleManage/Company.vue'
import inStock from '@/components/menu/outAndIn/inStock.vue'
import outStock from '@/components/menu/outAndIn/outStock.vue'
import Area from '@/components/menu/StockManage/Area.vue'
import Shelf from '@/components/menu/StockManage/Shelf.vue'
import data from '@/components/menu/data.vue'
import Parcel from '@/components/menu/parcelManage.vue'
//https://registry.npm.taobao.org
import Register from '@/components/menu/User/Register.vue';
import User from '@/components/menu/personalPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/welcome', component: Welcome },
  { path: '/login', component: Login ,},
  { path: '/register', component: Register },
  { path: '/', redirect: '/welcome' },
  {
    path: '/home',
    component: Home,
    children: [
      // 写子路由  显示在主区域
      { path: '/enter', component: Enter },
      { path: '/outer', component: Outer },
      { path: '/personalPage', component: User},
      { path: '/company', component: Company},
      
      { path: '/outStock', component: outStock},
      { path: '/area', component: Area},
      { path: '/shelf', component: Shelf},
      { path: '/parcel', component: Parcel},
      { path: '/data', component: data},
      { path: '/inStock', component: inStock }
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
    // let token = JSON.parse(window.localStorage.getItem("Token"))
    let token = localStorage.getItem('Authorization')
    console.log(token)
    if (  token == null || token === '' ){
      alert("请先进行登录操作")
      next('/login')
    }else {
      next()
    }
  }
})
export default router
