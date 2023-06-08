import request from '@/requestAndSecurity/request'
// 包裹模块接口
export default {
/**
   * 1.获取个人主页信息
   * 
   * @returns 
   */
    personInformation() {
    return request({
      url: '/center/personInformation',
      method: 'get',
    })
  },
  /**
   * 2.修改个人中心
   * @param {*} data 
   * @returns 
   */
  modifyUserInformation(data) {
    return request({
      url: '/center/modifyUserInformation',
      method: 'post',
      data:data
    })
  },
/**
   * 3.修改密码
   * @param {*} data 
   * @returns 
   */
    modifyPassword(data) {
    return request({
      url: '/center//center/modifyPassword',
      method: 'post',
      data:data
    })
  },
}