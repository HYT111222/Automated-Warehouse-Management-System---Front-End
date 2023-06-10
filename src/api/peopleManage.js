import request from '@/requestAndSecurity/request'
/**
 * 人员管理模块接口
 */
export default {
    /**
     * 1.入库人信息查询
     * @param{*} param
     * @returns
     */
   checkInBoundPeorsonInformation(param){
       return request({
           url:'/peopleManage/checkInBoundPeopleInformation',
           method:'post',
           data:param
       })
    },
    /**
     * 2.出库人信息查询
     * @param{*} param
     * @returns
     */
    checkFetchOutPeopleInformation(param){
        return request({
            url:'/peopleManage/checkFetchOutPeopleInformation',
            method:'post',
            data:param
        })
    },
    /**
     * 3.客户信息查询
     * @param{*} param
     * @returns
     */
    checkCustomInformation(param){
        return request({
            url:'/peopleManage/checkCustomInformation',
            method:'post',
            data:param
        })
    },
    /**
     * 4.获取客户流水信息
     * @param{*} param
     * @returns
     */
    checkCustomTransaction(param){
        return request({
            url:'/peopleManage/checkCustomTransaction',
            method:'post',
            data:param
        })
    },
    /**
     * 5.删除客户数据项
     * @param{*} data
     * @returns
     */
    delCustomInformation(data){
        return request({
            url:'/peopleManage/delCustomInformation',
            method:'delete',
            data:data
        })
    },
    /**
     * 6.删除入库核实人信息
     * @param{*} data
     * @returns
     */
    delFetchInPeopleInformation(data){
        return request({
            url:'/peopleManage/delFetchInPeopleInformation',
            method:'delete',
            data:data
        })
    },
    /**
     * 7.删除出库核实人信息
     * @param{*} data
     * @returns
     */
    delFetchOutPeopleInformation(data){
        return request({
            url:'/peopleManage/delFetchOutPeopleInformation',
            method:'delete',
            data:data
        })
    },
    /**
     * 8.增加客户应付款
     * @param{*} param
     * @returns
     */
    incAccountsPayment(param){
        return request({
            url:'/peopleManage/incAccountsPayment',
            method:'post',
            data:param
        })
    },
    /**
     * 9.客户结款
     * @param{*} param
     * @returns
     */
    balanceAccountsPayment(param){
        return request({
            url:'/peopleManage/balanceAccountsPayment',
            method:'post',
            data:param
        })
    },
    /**
     * 10.员工（即用户）信息查询
     * @param{*} param
     * @returns
     */
    checkStaffInformation(param){
        return request({
            url:'/peopleManage/checkStaffInformation',
            method:'post',
            data:param
        })
    },
    /**
     * 11.增加入库人
     * @param{*} param
     * @returns
     */
    addInBoundPeople(param){
        return request({
            url:'/peopleManage/addInBoundPeople',
            method:'post',
            data:param
        })
    },
    /**
     * 12.增加出库人
     * @param{*} param
     * @returns
     */
    addFetchOutPeople(param){
        return request({
            url:'peopleManage/addFetchOutPeople',
            method:'post',
            data:param
        })
    },
    /**
     * 13.删除员工信息
     * @param{*} data
     * @returns
     */
    delStaffInformation(data){
        return request({
            url:'/peopleManage/delStaffInformation',
            method:'delete',
            data:data
        })
    },
    /**
     * 14.获取入库人所有信息
     * @returns
     */
    getInBoundPeopleInformationAll() {
        return request({
            url: '/peopleManage/getInBoundPeopleInformationAll',
            method: 'get'
        })
    },
    /**
     * 15.获取出库人所有信息
     * @returns
     */
    getFetchOutPeopleInformationAll() {
        return request({
            url: '/peopleManage/getFetchOutPeopleInformationAll',
            method: 'get'
        })
    },
    /**
     * 16.获取客户所有信息
     * @returns
     */
    getCustomInformationAll() {
        return request({
            url: '/peopleManage/getCustomInformationAll',
            method: 'get'
        })
    },
    /**
     * 17.获取员工所有信息
     * @returns
     */
    getStaffInformationAll(){
        return request({
            url: '/peopleManage/getStaffInformationAll',
            method: 'get'
        })
    },
    /**
     * 18.获取员工姓名列表
     * @returns
     */
    getStaffNameList(){
        return request({
            url: '/peopleManage/getStaffNameList',
            method: 'get'
        })
    },
    /**
     * 19.添加客户及相关信息
     * @param {*} param
     * @returns
     */
    addCustom(param){
        return request({
            url: '/peopleManage/addCustom',
            method: 'post',
            data:param
        })
    },
    /**
     * 20.获取客户姓名列表
     * @returns
     */
    getCustomNameList(){
        return request({
            url: '/peopleManage/getCustomNameList',
            method: 'get'
        })
    }
}
