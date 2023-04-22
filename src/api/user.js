import request from '@/request'

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
   * 2.注册
   * @param {*} param
   * @returns
   */
  register (param) {
    return request({
      url: '/user/register',
      method: 'post',
      data: param
    })
  },


  /**
   * 3.仓库初始化(不能写成：
   * data：{param，token}， 后端会读不到，所以只能在表单的数据对象里全部写完，否则后端接受的就是两个变量)
   */
  initStock(param) {
    return request({
      url: '/user/initStock',
      method: 'post',
      data: param
    })
  },
  /**
   * 4.获取用户个人主页信息
   */
  getUserInfo(param) {
    return request({
      url: '/user/information',
      method: 'get',
      params: {
        token: param
      }
    })
  },
  /**
   * 5.旧用户获取初始化仓库数据
   */
  getInitStock(param) {
    return request({
      url: '/user/getOldInitStock',
      method: 'get',
      params:  {
        token: param
      }
    })
  },
  /**
   * 6.修改个人信息
   */
  changeInfo(param) {
    return request({
      url: '/user/changeInfo',
      method: 'post',
      params: param
    })
  },
  /**
   * 7.修改密码
   */
  changePassword(param) {
    return request({
      url: '/user/changePassword',
      method: 'post',
      params: param
    })
  }
}
