import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'
import Enter from '@/components/menu/peopleManage/Enter.vue'
import Outer from '@/components/menu/peopleManage/Outer.vue'
import Company from '@/components/menu/peopleManage/Company.vue'
import inStock from '@/components/menu/outAndIn/inStock.vue'
import addIn from '@/components/menu/outAndIn/addInOrder.vue'
import outStock from '@/components/menu/outAndIn/outStock.vue'
import Area from '@/components/menu/StockManage/Area.vue'
import data from '@/components/menu/data.vue'
import Parcel from '@/components/menu/parcelManage.vue'
import inNeedToCheck from '@/components/menu/outAndIn/managerCheck.vue'
import addNewOUt from '@/components/menu/outAndIn/addOutOrder.vue'
//https://registry.npm.taobao.org
import User from '@/components/menu/personalPage.vue'

// const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/Login' },
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    children: [
      // 写子路由  显示在主区域
      { path: '/enter', component: Enter },
      { path: '/outer', component: Outer },
      { path: '/personalPage', component: User},
      { path: '/company', component: Company},
      { path: '/addNewIn', component: addIn},
      { path: '/outStock', component: outStock},
      { path: '/area', component: Area},
      { path: '/parcel', component: Parcel},
      { path: '/data', component: data},
      { path: '/inStock', component: inStock },
      { path: '/HomePage', component: HomePage},
      { path: '/managerCheck', component: inNeedToCheck},//路由懒加载
      { path: '/addNewOut', component: addNewOUt},
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫（加别的页面跳转判断，如添加等）
// router.beforeEach((to, from, next) => {
//   if(to.path == '/login' || to.path == '/'){
//       next()
//   }else {
//     // let token = JSON.parse(window.localStorage.getItem("Token"))
//     let token = localStorage.getItem('token')
//     console.log(token)
//     if (  token == null || token === '' ){
//       alert("请先进行登录操作")
//       next('/login')
//     }else {
//       next()
//     }
//   }
// })
// export default router
