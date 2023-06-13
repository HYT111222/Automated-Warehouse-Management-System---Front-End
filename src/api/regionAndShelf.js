import request from '@/requestAndSecurity/request'
// 库区模块接口
export default {
    /**
     * 1.查询对应库区信息
     * @returns 
     */
    searchRegion(param) {
      return request({
        url: '/regionAndShelf/searchRegion',
        method: 'get',
        params: {
          regionName:param
        }
      })
    },
    /**
   * 2、查询货架信息
   * @returns 
   */
    searchShelf(param) {
    return request({
      url: '/regionAndShelf/searchShelf',
      method: 'get',
      params: {
        regionId:param
      }
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
      data:{regionId:data}
    })
  },
   /**
   * 4、查询所有货架信息
   * @param {*} data 
   * @returns 
   */
    allShelf(param) {
    return request({
      url: '/regionAndShelf/allShelf',
      method: 'get',
      params: {
        regionId:param
      }
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