import request from '@/requestAndSecurity/request'

export default {
  /**
   * 1.登录
   * @param {*} param
   * @returns
   */
  login (param) {
    return request({
      url: '/user/login',
      method: 'post',
      data: param
    })
  },

  /**
   * 2.管理员注册
   * @param {*} param
   * @returns
   */
  managerRegister (param) {
    return request({
      url: '/user/registerManager',
      method: 'post',
      data: param
    })
  },
  /**
   * 3.普通用户注册
   * @param {*} param 
   * @returns 
   */
  userRegister(param) {
    return request({
      url: '/user/register',
      method: 'post',
      data: param
    })
  },
 
  /**
   * 4.管理员首页信息获取
   * @param {*} param 
   * @returns 
   */
  managerHomePage() {
    return request({
      url: '/user/managerHomePage',
      method: 'get',

    })
  },
   /**
   * 5.普通用户首页信息获取
   * @param {*} param 
   * @returns 
   */
   userHomePage() {
    return request({
      url: '/user/userHomePage',
      method: 'get'
    })
  },
  
}
