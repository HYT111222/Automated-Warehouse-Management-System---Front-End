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
   * 3.仓库初始化
   */
  initStock(param,token) {
    return request({
      url: '/user/initStock',
      method: 'post',
      data: {
        token,
        param
      }
    })
  },
  /**
   * 4.获取用户个人主页信息
   */
  getUserInfo(token) {
    return request({
      url: 'user/information',
      method: 'get',
      params: token
    })

  }

}
