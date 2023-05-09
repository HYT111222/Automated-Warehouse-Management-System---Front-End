import Vue from 'vue'
import Vuex from 'vuex'
 
/*登录操作
import { mapMutations } from 'vuex'
 ...mapMutations(['$_setStorage'])
 _this.$_setStorage({Authorization:res.data.token})
*/
Vue.use(Vuex)
const key = 'Token'
const store = new Vuex.Store({
    state () {
        return {
          token: localStorage.getItem('Token')?localStorage.getItem('Token'):''
        }
    },
    getters: {
        getSortage: function(state) {
            if(!state.token){
                state.token =JSON.parse(localStorage.getItem(key))
            }
            return state.token
        }
    },
    mutations: {
        $_setStorage(state,value){
            state.token = value
            localStorage.setItem(key,JSON.stringify(value))
        },
        $_removeStorage(state){
            state.token = null;
            localStorage.removeItem(key)
        }
    }
})
export default store;