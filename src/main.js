import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'



Vue.use(Element)
Vue.config.productionTip = false
window.localStorage.removeItem('token')
// window.localStorage.setItem('token',JSON.stringify({
//   token: "okkk"
// }))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
