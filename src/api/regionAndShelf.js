import request from '@/requestAndSecurity/request'
// 库区模块接口
export default {
    /**
     * 1.查询对应库区信息
     * @param {*} data
     * @returns 
     */
    searchParcel(data) {
      return request({
        url: '/regionAndShelf/searchRegion',
        method: 'post',
        data:data
      })
    },
    /**
   * 2、查询货架信息
   * @param {*} data 
   * @returns 
   */
    searchShelf(param) {
    return request({
      url: '/regionAndShelf/searchShelf',
      method: 'get',
      param: param
    })
  },
  
  /**
     * 3.添加货架
     * @param {*} data
     * @returns 
     */
    addShelf(data) {
    return request({
      url: '/regionAndShelf/addShelf',
      method: 'post',
      data:data
    })
  },
   /**
   * 4、查询货架信息
   * @param {*} data 
   * @returns 
   */
    allShelf(param) {
    return request({
      url: '/regionAndShelf/allShelf',
      method: 'get',
      param: param
    })
  },
  
    /**
   * 3.删除货架信息
   * @param {*} data 
   * @returns 
   */
    deleteShelf(data) {
    return request({
      url: '/regionAndShelf/deleteShelf',
      method: 'delete',
      data:data
    })
  }
}