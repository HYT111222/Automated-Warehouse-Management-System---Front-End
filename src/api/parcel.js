import request from '@/requestAndSecurity/request'
// 包裹模块接口
export default {
    /**
     * 1.包裹查询
     * @param {*} param 
     * @returns 
     */
    searchParcel(param) {
      return request({
        url: '/parcel/searchParcel',
        method: 'post',
        data:param
      })
    },
    /**
   * 2.获取包裹详情
   * @param {*} data 
   * @returns 
   */
    searchParcelDetail(param) {
    return request({
      url: '/parcel/searchPacelDetail',
      method: 'get',
      param: param
    })
  },
    /**
   * 3.删除包裹信息
   * @param {*} data 
   * @returns 
   */
    deleteParcel(data) {
    return request({
      url: '/parcel/deleteParcel',
      method: 'delete',
      data:data
    })
  },
  /**
   * 3.获取全部包裹信息
   * @returns 
   */
  allParcel() {
    return request({
      url: '/parcel/allParcel',
      method: 'get',
    })
  }
}