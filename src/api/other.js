import request from '@/request'

export default {
  /**
   * 1.入库请求
   * @returns
   */
  enterStock (parcel) {
    return request({
      url: '/other/enter',
      method: 'post',
      data: parcel
    })
  },

  /**
   * 2.出库请求
   */
  outStock (parcel) {
    return request({
      url: '/other/out',
      method: 'post',
      data: parcel
    })
  },

  /**
   * 3.根据id查询包裹请求
   */
  checkParcel (parcel) {
    return request({
      url: '/other/checkParcel',
      method: 'post',
      data: parcel
    })
  },
  /**
   * 4.获取入库记录表格
   * params:用户名（如果每次都要传用户名的话则需要）
   */
  getInTable (params) {
    return request({
      url: '/other/DBrecordIn',
      method: 'get',
      params
    })
  },
  /**
   * 5.获取出库记录表格
   * @param {*} params :用户名
   * @returns 
   */
  getOutTable (params) {
    return request({
      url: '/other/DBrecordOut',
      method: 'get',
      params
    })
  },
}
