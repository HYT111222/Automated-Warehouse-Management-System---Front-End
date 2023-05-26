import request from '@/requestAndSecurity/request'
/*出入库模块接口
*/
export default {
    /*1.入库界面查询请求
    */
    searchIn(param) {
        return request({
          url: '/outAndIn/searchIn',
          method: 'post',
          data: param
        })
    },
    /*2.出库界面查询请求
    */
      searchOut(param) {
        return request({
          url: '/outAndIn/searchOut',
          method: 'post',
          data: param
        })
    },
    /*3.入库界面获取全表请求
    */
    showIn() {
        return request({
          url: '/outAndIn/showIn',
          method: 'get'
        })
    },
    /*4.出库界面获取全表请求
    */
    showOut() {
        return request({
          url: '/outAndIn/showOut',
          method: 'get'
        })
    },
    /*5.添加入库单
    */
    addInOrder(param) {
      return request({
        url: '/outAndIn/addInOrder',
        method: 'post',
        data: param
      })
    },
    /*6.添加出库单
    */
    addOutOrder(param) {
      return request({
        url: '/outAndIn/addOutOrder',
        method: 'post',
        data: param
      })
    },
    /*7.获取已在库中，可以入库的包裹列表
    */
    showParcel() {
      return request({
        url: '/outAndIn/showParcel',
        method: 'get'
      })
    },
    /**
     * 8.获取入库人姓名列表
     */
    fetchInPeopleNameList(){
      return request({
        url: '/outAndIn/fetchInPeopleNameList',
        method: 'get'
      })
    },
    /**
     * 9.获取出库人姓名列表
     */
    fetchOutPeopleNameList(){
      return request({
        url: '/outAndIn/fetchOutPeopleNameList',
        method: 'get'
      })
    }


}