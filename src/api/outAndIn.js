import request from '@/requestAndSecurity/request'
/*出入库模块接口
*/
export default {
  /**
   * 1.入库界面查询
   * @param {*} param 
   * @returns 
   */
  searchIn(param) {
    return request({
      url: '/outAndIn/searchIn',
      method: 'post',
      data:param
    })
  },
  /**
   * 2.出库界面查询
   * @param {*} param 
   * @returns 
   */
  searchOut(param) {
    return request({
      url: '/outAndIn/searchOut',
      method: 'post',
      data:param
    })
  },
  /**
   * 3.入库界面获取全部
   * @returns 
   */
  showIn() {
    return request({
      url: '/outAndIn/showIn',
      method: 'get'
    })
  },
  /**
   * 4.出库界面获取全部
   * @returns 
   */
  showOut() {
    return request({
      url: '/outAndIn/showOut',
      method: 'get'
    })
  },
  /**
   * 5.添加入库单
   * @param {*} param 
   * @returns 
   */
  addInOrder(param) {
    return request({
      url: '/outAndIn/addInOrder',
      method: 'post',
      data:param
    })
  },
  /**
   * 6.添加出库单
   * @param {*} param 
   * @returns 
   */
  addOutOrder(param) {
    return request({
      url: '/outAndIn/addOutOrder',
      method: 'post',
      data:param
    })
  },
  /**
   * 7.获取可以出库的包裹
   * @returns 
   */
  showParcel() {
    return request({
      url: '/outAndIn/showParcel',
      method: 'get'
    })
  },
  /**
   * 8.获取入库交接人姓名
   * @returns 
   */
  fetchInPeopleNameList() {
    return request({
      url: '/outAndIn/fetchInPeopleNameList',
      method: 'get'
    })
  },
  /**
   * 9.获取出库交接人姓名
   * @returns 
   */
  fetchOutPeopleNameList() {
    return request({
      url: '/outAndIn/fetchOutPeopleNameList',
      method: 'get'
    })
  },
  /**
   * 10.删除多数量入库单
   * @param {*} data 
   * @returns 
   */
  InDelMultitude(data) {
    return request({
      url: '/outAndIn/InDelMultitude',
      method: 'delete',
      data:data
    })
  },
  /**
   * 11.删除多数量出库单
   * @param {*} data 
   * @returns 
   */
  OutDelMultitude(data) {
    return request({
      url: '/outAndIn/OutDelMultitude',
      method: 'delete',
      data:data
    })
  },
  /**
   * 12.修改入库单
   * @param {*} data 
   * @returns 
   */
  ExamineIn(data) {
    return request({
      url: '/outAndIn/ExamineIn',
      method: 'put',
      data:data
    })
  },
  /**
   * 13.修改出库单
   * @param {*} data 
   * @returns 
   */
  ExamineOut(data) {
    return request({
      url: '/outAndIn/ExamineOut',
      method: 'put',
      data:data
    })
  },
  /**
   * 14.获取待审核入库单
   * @returns 
   */
  InNeedTocheck() {
    return request({
      url: '/outAndIn/InNeedTocheck',
      method: 'get'
    })
  },
  /**
   * 15.获取待审核出库单
   * @returns 
   */
  OutNeedTocheck() {
    return request({
      url: '/outAndIn/OutNeedTocheck',
      method: 'get'
    })
  },
  /**
   * 16.获取单个入库单详情
   * @param {*} data 
   * @returns 
   */
  singleInOrderDetail(param) {
    return request({
      url: '/outAndIn/singleInOrderDetail',
      method: 'get',
      param: param
    })
  },
  /**
   * 17.获取单个出库单详情
   * @returns 
   */
  singleOutOrderDetail(param) {
    return request({
      url: '/outAndIn/singleOutOrderDetail',
      method: 'get',
      param:param
    })
  },
  /**
   * 18.获取本用户申请的待入库的入库单列表
   * @returns 
   */
  InNeedToEnter() {
    return request({
      url: '/outAndIn/InNeedToEnter',
      method: 'get'
    })
  },
  /**
   * 19.获取本用户申请的待出库的出库单
   * @returns 
   */
  OutNeedToOut() {
    return request({
      url: '/outAndIn/OutNeedToOut',
      method: 'get'
    })
  },
  /**
   * 20.根据ID获取包裹信息
   */
  searchParcel() {
    return request({
      url: '/parcel/searchParcel',
      method: 'post'
    })
  },
}