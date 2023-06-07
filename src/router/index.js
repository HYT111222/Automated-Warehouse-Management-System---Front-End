import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'
import Enter from '@/components/menu/peopleManage/Enter.vue'
import Outer from '@/components/menu/peopleManage/Outer.vue'
import Staff from '@/components/menu/peopleManage/Staff.vue'
import Company from '@/components/menu/peopleManage/Company.vue'
import inStock from '@/components/menu/outAndIn/inStock.vue'
import addIn from '@/components/menu/outAndIn/addInOrder.vue'
import outStock from '@/components/menu/outAndIn/outStock.vue'
import Area from '@/components/menu/StockManage/Area.vue'
import data from '@/components/menu/data.vue'
import Parcel from '@/components/menu/parcelManage.vue'
// import inNeedToCheck from '@/components/menu/outAndIn/managerCheck.vue'
import addNewOUt from '@/components/menu/outAndIn/addOutOrder.vue'
//https://registry.npm.taobao.org
import User from '@/components/menu/personalPage.vue'
import Transaction from '@/components/menu/peopleManage/Transaction.vue'
import error from '@/components/other/404.vue'
const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/login' },
  { path: '/404', component: error ,},
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    meta: {
      roles: ['manager','user']
    }, 
    children: [
      // 写子路由  显示在主区域
      { path: '/enter', component: Enter ,meta: {roles: ['manager','user']}},
      { path: '/outer', component: Outer ,meta: {roles: ['manager','user']}},
      { path: '/staff', component: Staff ,meta: {roles: ['manager']}},//
      { path: '/personalPage', component: User ,meta: {roles: ['manager','user']}},
      { path: '/company', component: Company ,meta: {roles: ['manager']}},//
      { path: '/transaction',component: Transaction ,meta: {roles: ['manager','user']}} ,
      { path: '/addNewIn', component: addIn ,meta: {roles: ['manager','user']}},
      { path: '/outStock', component: outStock ,meta: {roles: ['manager','user']}},
      { path: '/area', component: Area ,meta: {roles: ['manager','user']}},
      { path: '/parcel', component: Parcel ,meta: {roles: ['manager','user']}},
      { path: '/data', component: data ,meta: {roles: ['manager','user']}},
      { path: '/inStock', component: inStock ,meta: {roles: ['manager','user']} },
      { path: '/HomePage', component: HomePage ,meta: {roles: ['manager','user']}},
      { path: '/managerCheck', 
        meta: {
          roles: ['manager']
        }, 
        component: inNeedToCheck},//路由懒加载
      { path: '/addNewOut', component: addNewOUt ,meta: {roles: ['manager','user']}},
    ]
  }
]


const router = new VueRouter({
  routes
})

// 路由守卫（加别的页面跳转判断，如添加等）
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404')
  }else {
    if(to.path == '/login' || to.path == '/' || to.path == '/404'){
        next()
    }else {
      let role = localStorage.getItem('authority')
      // if(to.meta.roles.includes(role)){
      //   next() //放行
      // }
      // let token = JSON.parse(window.localStorage.getItem("Token"))
      let token = localStorage.getItem('token')
      console.log(token)
      if (  token == null || token === '' ){
        alert("请先进行登录操作")
        next('/login')
      }else {
        if(to.meta.roles.includes(role)){
          next() //放行
        }else{
          alert("没有权限查看")
        }
      }
    }
  }
 
})
export default router
