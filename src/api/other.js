import request from '@/request'

export default {
  /**
   * 1.入库请求
   * @returns
   */
  enterStock (param) {
    return request({
      url: '/other/enter',
      method: 'post',
      data: param
    })
  },

  /**
   * 2.出库请求
   */
  outStock (param) {
    return request({
      url: '/other/out',
      method: 'post',
      data: param
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
   */
  getInTable (token) {
    return request({
      url: '/other/DBrecordIn',
      method: 'get',
      params: token
    })
  },
  /**
   * 5.获取出库记录表格
   */
  getOutTable (token) {
    return request({
      url: '/other/DBrecordOut',
      method: 'get',
      params: token
    })
  },
  
}
