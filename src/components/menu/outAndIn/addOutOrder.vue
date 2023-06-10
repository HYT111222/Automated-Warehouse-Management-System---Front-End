<template>
    <div>
        <el-card style="text-align:center;">
            <div style="float: left;" v-if="isNew_out==='false'">
                <el-switch
                v-model="isEdit"
                active-text="编辑"
                :disabled="switch_disable">
                </el-switch>
            </div>
            <div style="float: right;">
                <el-button icon="el-icon-d-arrow-right" size="large" circle style="border: transparent !important;" @click="backToInSock"></el-button>
            </div>
            <el-form :model="newOutOrder" label-width="100px" ref="newOutOrder" :rules="rules"
            style="width: 500px; text-align:center;display: inline-block;height: 170px;">
                <el-form-item  style="display: inline-block">
                    <span slot="label"  class="span-text">出库单号:</span>
                    <el-tag type="success" class="tag">{{ newOutOrder.outID }}</el-tag>
                </el-form-item>
                <el-form-item style="display: inline-block">
                    <span slot="label"  class="span-text">订单号:</span>
                    <el-tag v-if="isEdit===false" class="tag">{{ newOutOrder.orderID }}</el-tag>
                    <el-input  placeholder="数字组成" clearable v-model="newOutOrder.orderID" class="tag"
                    v-else></el-input>
                </el-form-item>
                <el-form-item prop="" class="" style="display: inline-block">
                    <span slot="label"  class="span-text">出库交接人:</span>
                    <el-tag v-if="isEdit===false" class="tag">{{ newOutOrder.outPeopleName }}</el-tag>
                    <el-select v-else v-model="newOutOrder.outPeopleName"  clearable placeholder="请选择"
                    class="tag">
                        <el-option
                        v-for="item in outPeopleNameList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  class="el-form-item-span" v-if="isNew_out=='false'">
                    <!--可修改：处于编辑状态，管理员，状态为待审核/已拒绝-->
                    <span slot="label"  class="span-text">订单状态:</span>
                    <el-tag v-if="isEdit===false" class="tag">{{ newOutOrder.outStatus }}</el-tag>
                    <el-radio-group v-model="newOutOrder.outStatus" size="medium" v-else>
                    <el-radio-button label="已拒绝" ></el-radio-button>
                    <el-radio-button label="待审核"></el-radio-button>
                    <el-radio-button label="待出库"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <div v-if="isNew_out=='false'">
                <el-form-item  class="el-form-item-span" >
                    <span slot="label"  class="span-text">申请人:</span>
                    <span style="font-size: 16px;">{{ newOutOrder.userName }}</span>
                </el-form-item>
                <el-form-item  class="el-form-item-span" >
                    <span slot="label"  class="span-text">审批人:</span>
                    <span style="font-size: 16px;">{{ newOutOrder.managerName }}</span>
                </el-form-item>
                <el-form-item class="el-form-item-span" v-if="newOutOrder.outStatus === '已出库'">
                    <span slot="label"  class="span-text">出库时间:</span>
                    <span style="font-size: 16px;">{{ newOutOrder.outTime }}</span>
                </el-form-item>
            </div>
            </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
            <div style="margin-bottom: 10px;text-align: center;">
                <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;"
                v-if="isEdit===true"
                @click="addParcel">添加包裹</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; "
                v-if="isEdit===true"
                @click="Delete">批量删除</el-button>
                <el-tag type="primary" style="font-size: medium;font-weight:bold;">包 裹 信 息</el-tag>
                <el-tooltip class="item" effect="light" content="请选择包裹进行出库" placement="top-start">
                <el-button icon="el-icon-question" size="large" circle style="padding: 0px;float: right;margin-top: 6px;margin-right: 7px;border:transparent !important;;"></el-button>
                </el-tooltip>
            </div>

        <el-table :data="newOutOrder.parcelList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :header-cell-style="{background:'#ebf3fc',padding:'0px',textAlign: 'center'}"
        :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
        highlight-current-row  >
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column  prop="parcelID" label="包裹ID" >
            </el-table-column>
            <el-table-column  prop="fromPeople" label="发货人" >
            </el-table-column>
            <el-table-column prop="fromPhone" label="发货人电话" >
            </el-table-column>
            <el-table-column prop="fromAddr" label="发货地址" >
            </el-table-column>
            <el-table-column prop="toPeople"  label="收货人" >
            </el-table-column>
            <el-table-column prop="toPhone" label="收货人电话" >
            </el-table-column>
            <el-table-column prop="toAddr"  label="收货地址" >
            </el-table-column>
        </el-table>
        <el-pagination align='center'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="newOutOrder.parcelList.length"
        style="margin-top: 7px;">
        </el-pagination>
        <div style="text-align: center;margin-top: 10px;">
            <el-button round type="primary" :loading="Loading" @click="saveOrder('newOutOrder')" style="padding: 10px;" :disabled="isEdit===false?true:false">保 存</el-button>
            <el-button round type="success" :loading="Loading" @click="enter" style="padding: 10px;" v-if="enterOp===true">出 库</el-button>
            <el-popover
            placement="top"
            width="160"
            v-model="newOutOrder.visible">
            <p>取消后将不保存填写记录,确定要取消吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="backToInSock">确定</el-button>
            </div>
            <el-button round style="padding: 10px; margin-left: 10px;"  :disabled="isEdit===false?true:false"  slot="reference">取 消</el-button>
            </el-popover>
        </div>
        </el-card>
        <el-dialog title="请选择包裹（以下包裹正在库中）"  :visible.sync="dialogFormVisible" style="padding: 0px;" :width="'1000px'" class="dialogue-add">
            <div style="text-align:center;">
                <el-form :model="searchMag" :rules="rules" ref="searchMag" style="width: 450px; text-align:center;display: inline-block;">
                    <el-form-item style="display:flex" prop="parcelId">
                    <span slot="label"  class="span-text" >包裹ID:</span>
                    <el-input size="small"  clearable v-model="searchMag.parcelId" class="tag"></el-input>
                    <el-button type="primary" :loading="Loading" @click="search('searchMag')" icon="el-icon-search"  round size="small">搜索</el-button>
                    <el-tooltip class="item" effect="light" content="重置表格内容" placement="top-start">
                    <el-button type="primary" icon="el-icon-refresh-right" @click="initialParcel" plain  circle style="padding:5px;"></el-button>
                    </el-tooltip>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="parcelList.slice((currentPage_dia-1)*pageSize_dia,currentPage_dia*pageSize_dia)"
            @selection-change="handleSelectionChange_dia"
            style="width: 100%"
            :header-cell-style="{background:'#ebf3fc',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
            highlight-current-row
            :default-sort = "{prop: 'parcelID', order: 'increasing'}">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column  prop="parcelID" sortable label="包裹ID" >
            </el-table-column>
            <el-table-column  prop="fromPeople" label="发货人" >
            </el-table-column>
            <el-table-column prop="fromPhone" label="发货人电话" >
            </el-table-column>
            <el-table-column prop="fromAddr" label="发货地址" >
            </el-table-column>
            <el-table-column prop="toPeople"  label="收货人" >
            </el-table-column>
            <el-table-column prop="toPhone" label="收货人电话" >
            </el-table-column>
            <el-table-column prop="toAddr"  label="收货地址" >
            </el-table-column>
            <!-- <el-table-column label="操作">
            <template slot-scope="scope">
                    <el-button @click="deleteOne(scope.row)" type="text" size="small" >选择</el-button>
            </template>
            </el-table-column> -->
            </el-table>
            <el-pagination align='center'
            @size-change="handleSizeChange_dia"
            @current-change="handleCurrentChange_dia"
            :current-page="currentPage_dia"
            :page-sizes="[10,30,50]"
            :page-size="pageSize_dia"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parcelList.length"
            style="margin-top: 7px;">
            </el-pagination>
            <div style="text-align: center; margin-top: 10px">
                <el-button   @click="dialogFormVisible = false">取消选择</el-button>
                <el-button type="primary"  @click="sureAdd">确定选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import outAndIn from '@/api/outAndIn'
/**
 * 编辑状态：与新增一样界面（但是一些数据从请求得来），保存则发送请求（与新增一样），修改对应订单
 * 查看状态：不可编辑
 */
//时间获取
function addZero(s) {
            return s < 10 ? ('0' + s) : s;
}
function getNowTime() {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear();  //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
    var time =  year + addZero(month)  + addZero(day)  + addZero(hour) + addZero(minute) + addZero(second);
    console.log(time)
    return time;
}
export default {

    //修改、查看、添加都是一样的界面
    data(){
        var parcelID = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不可为空'))
            }else if (!/^[0-9]{5,20}$/.test(value)){
                return callback(new Error('只能由数字组成,5-20位'))
            }else {
                callback()
            }
        }
        var phone = ( rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入电话号码'))
            }else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)){
                return callback(new Error('手机号不合法'))
            }else {
                callback()
            }
        }
        var outPeople = ( rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择入库交接人'))
            }else {
                callback()
            }
        }
        var name = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('请输入姓名'))
            } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/.test(value)) {
            return callback(new Error('只含汉字、数字、字母,2-20位'))
            } else {
            callback()
            }
       }
       var addrDetail = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入详细地址'))
            } else {
              callback()
            }
       }
        return{
            Loading:false,
            isEdit:true,//控制内容修改
            isNew_out:'false',//控制是否为空以及组件是否出现
            switch_disable:true,//控制是否可编辑
            enterOp: false,//控制是否可出库
            authority:'manager',
            currentCell: null,
            dialogFormVisible:false,
            outPeopleNameList:['王小龙','李小虎'],
            searchMag:{
                parcelId: "",
                // parcelState: "",
                // shelfID: "",
                // regionName: ""
            },
            newOutOrder:{
                outID: "",
                orderID: "",
                outPeopleName: "",
                visible: false,
                //以下为编辑查看特有
                outStatus:"待审核",
                outTime:"249752",
                userName:"",
                managerName:"",
                parcelList: [
                    {
                    parcelID: "234567890343",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890344",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    }
                ]
            },
            parcelList: [
                    {
                    parcelID: "234567890343",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890344",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    },
                    {
                    parcelID: "234567890345",
                    fromPeople: "小王李",
                    fromPhone: "12345678911",
                    fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    toPeople: "胡晓",
                    toPhone: "12345678911",
                    toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    }
            ],
            rules:{
                outID:[{}],
                orderID:[
                { required: true,  message: "不能为空", trigger: "blur"},    
                {validator: parcelID, trigger: 'blur'}],
                outPeopleName:[
                { required: true,  message: "不能为空", trigger: "blur"},],
                //对话框
                parcelID:[ { required: true,  message: "不能为空", trigger: "blur"},
                {validator: parcelID, trigger: 'blur'}],
                parcelId:[ { required: true,  message: "不能为空", trigger: "blur"}],
                // fromPeople:[{validator: name, trigger: 'blur'}],
                // fromPhone:[{validator: phone, trigger: 'blur'}],
                // fromAddrSelect: [{required: true, message: '请选择', trigger: 'blur'}],
                // fromAddrDetail:[{validator: addrDetail, trigger: 'blur'}],
                // toPeople:[{validator: name, trigger: 'blur'}],
                // toPhone:[{validator: phone, trigger: 'blur'}],
                // toAddrSelect: [{required: true, message: '请选择', trigger: 'blur'}],
                // toAddrDetail:[{validator: addrDetail, trigger: 'blur'}]
            },
            //表格分页
            multipleSelection: [],//选中的信息
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页的数据条数

            multipleSelection_dia: [],//选中的信息
            currentPage_dia: 1, // 当前页码
            pageSize_dia: 10 // 每页的数据条数
        }
    },
    created(){
           this.isNew_out = window.sessionStorage.getItem('isNew_out')
           console.log(this.isNew_out)
            //判断是新增还是编辑查看
            if (this.isNew_out === 'true') {//新增
                this.isEdit = true
                //生成订单号、所有数据为空、且可编辑状态
                this.newOutOrder.outID = getNowTime()
                this.initialPeople()
            }else {//查看编辑
                this.isEdit = false
                //获取数据
                outAndIn.singleOutOrderDetail(window.sessionStorage.getItem('row_out')).then(res=>{
                    if (res.data.status_code == true){
                        //保存数据
                        this.newInOrder.outID = res.data.inID
                        this.newInOrder.inPeopleName = res.data.inPeopleName
                        this.newInOrder.inStatus = res.data.inStatus
                        this.newInOrder.managerName = res.data.managerName
                        this.newInOrder.orderID = res.data.orderID
                        this.newInOrder.userName =res.data.userName
                        this.newInOrder.inTime =res.data.inTime
                        this.newInOrder.parcelList =res.data.parcelList
                    }else {
                        this.$message({
                            message:"获取包裹详情异常",
                            type:"error"
                        })
                    }
                })
                //判断该订单状态，若为已入库则状态和内容皆不可修改
                if (this.newOutOrder.outStatus === "已出库"){
                    this.switch_disable = true
                }else if (this.newOutOrder.outStatus === "待出库"){//只能进行入库操作
                    this.enterOp = true
                }else {//待审核和已拒绝
                    //获取身份
                    //this.authority=window.sessionStorage.getItem('authority')
                    //若为普通用户，判断该订单本用户是否可编辑
                    if(this.authority != 'manager'){
                        //若为本用户所申请的订单
                        if(this.newOutOrder.userName === window.sessionStorage.getItem('userName')){
                            this.switch_disable = false
                            this.initialPeople()
                        }else {
                            this.switch_disable = true
                        }
                    }else {
                        this.switch_disable = false
                        this.initialPeople()
                    }

                }

        }
    },
    methods:{
    /**----------------------------------------普通操作方法------------------------------------------------- */
    //搜索包裹
    search(formName){
        this.$refs[formName].validate(valid=>{
            if (valid){
                let temp={
                    parcelId:this.searchMag.parcelId,
                    parcelState: "",
                    shelfID: "",
                    regionName: ""
                }
                outAndIn.searchParcel(temp).then(res=>{
                    console.log(res)
                    if (res.data.status_code){
                        this.parcelList = res.data.parcelList
                    }
                })
            }
        })
    },
    //添加包裹按钮
    addParcel(){
        this.initialParcel()
        this.dialogFormVisible =true
    },
    //入库交接人获取
    initialPeople(){
        outAndIn.fetchOutPeopleNameList().then(res=>{
            if (res.data.status_code == true){
                this.outPeopleNameList = res.data.outPeopleNameList
            }
        })

     },
     //包裹列表获取
     initialParcel(){
        outAndIn.showParcel().then(res=>{
            if(res.data.status_code == true){
                this.parcelList = res.data.parcelList
            }
        })
     },
    //确定添加
     sureAdd(){
        console.log(this.multipleSelection_dia)
        this.newOutOrder.parcelList = this.newOutOrder.parcelList.concat(this.multipleSelection_dia)
        this.dialogFormVisible=false
    },
    //返回入库界面
    backToInSock(){
        this.newOutOrder.visible = false
        this.$router.push({path:'/outStock'})
    },
    //批量删除
    Delete(){
        for (let k = 0; k < this.multipleSelection.length; k++) {
            this.newOutOrder.parcelList.splice(
                this.newOutOrder.parcelList.findIndex(
                   item => item.parcelID === this.multipleSelection[k].parcelID
            ),
            1);
        }
        console.log(this.newOutOrder.parcelList)
    },
    //保存新订单或者保存修改
    saveOrder(formName){
        if(this.newOutOrder.parcelList.length>0){
            this.$refs[formName].validate(valid=>{
            if(valid){
                if (this.isNew_out == 'true'){
                    this.Loading =true
                    outAndIn.addOutOrder(this.newOutOrder).then(res=>{
                    console.log(res)
                    if(res.data.status_code == true){
                        this.$message({
                            message:"申请成功，待审批",
                            type:'success'
                        })
                        this.$router.push('/outStock')
                    }else {
                        this.$message({
                            message:res.message,
                            type:'error'
                        })
                    }
                }).finally(res=>{
                    this.Loading =false
                })
                }else {
                    this.$refs[formName].validate(valid=>{
                    if(valid){
                        this.Loading =true
                        outAndIn.ExamineOut(this.newOutOrder).then(res=>{
                            console.log(res)
                            if(res.data.status_code == true){
                                this.$message({
                                    message:"修改成功",
                                    type:'success'
                                })
                            }else {
                                this.$message({
                                    message:"修改失败",
                                    type:'error'
                                })
                            }
                        }).finally(res=>{
                            this.Loading =false
                        })
                    }
                })
                }

            }
        })
        }else {
            this.$message({
                message:"包裹数量必须大于0，请添加包裹",
                type:"error"
            })
        }

    },
    //出库操作
    enter(formName){
        this.newOutOrder.outStatus = '已出库'
        this.$refs[formName].validate(valid=>{
            if(valid){
                this.Loading =true
                outAndIn.ExamineOut(this.newOutOrder).then(res=>{
                    console.log(res)
                    if(res.data.status_code == true){
                        this.$message({
                            message:"出库成功",
                            type:'success'
                        })
                    }else {
                        this.$message({
                            message:"出库失败",
                            type:'error'
                        })
                    }
                })
            }
        })
    },
    /**-----------------------------------------表格操作------------------------------------------------ */
     //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     },
      //多选
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
      //每页条数改变时触发 选择一页显示多少行
      handleSizeChange_dia(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage_dia = 1;
         this.pageSize_dia = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange_dia(val) {
         console.log(`当前页: ${val}`);
         this.currentPage_dia = val;
     },
     //多选
    handleSelectionChange_dia(val) {
    this.multipleSelection_dia = val;
    },

    // 清空表单
    clearForm (formName) {
        this.$refs[formName].resetFields()
        this.dialogFormVisible=false
    },


    }
}
</script>

<style lang="less" scoped>.tag{
    width: 250px;height: 40px; text-align: center; font-size: 16px;padding: 4px;
}
.span-text{
    color: #403b3b;font-size: 16px;
}
.el-form-item-span{
    display: inline-block;margin-top: 0px;height: 20px;
}
.id-input /deep/ .el-input__inner{
    // background-color:cornsilk;
}
.dialogue-add{
    // background-color: antiquewhite;
}
.add-order {
    background-image: url('@/assets/image/物流运输.png');
    background-size: cover;
}

.test{
    background-color: #ebf3fc;
}
</style>
