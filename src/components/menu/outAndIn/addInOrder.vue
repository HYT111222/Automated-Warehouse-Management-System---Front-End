<template>
    <div>
        <el-card style="text-align:center;">
            <div style="float: left;" v-if="isNew==='false'">
                <el-switch
                v-model="isEdit"
                active-text="编辑"
                :disabled="switch_disable">
                </el-switch>
            </div>
            <div style="float: right;">
                <el-button icon="el-icon-d-arrow-right" size="large" circle style="border: transparent !important;" @click="backToInSock"></el-button>
            </div>
            <el-form :model="newInOrder" label-width="100px" ref="newInOrder" :rules="rules"
            style="width: 500px; text-align:center;display: inline-block;height: 200px;">
                <el-form-item  style="display: inline-block">
                    <span prop="inID" slot="label"  class="span-text">入库单号:</span>
                    <el-tag type="success" class="tag">{{ newInOrder.inID }}</el-tag>
                    </el-form-item>
                <el-form-item prop="orderID" style="display: inline-block">
                    <span slot="label"  class="span-text">订单号:</span>
                    <!-- <el-tag v-if="isEdit===false" class="tag">{{ newInOrder.orderID }}</el-tag> -->
                    <el-input  placeholder="数字组成" clearable v-model="newInOrder.orderID" class="tag"
                    :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item prop="inPeopleName" class="" style="display: inline-block">
                    <span slot="label"  class="span-text">交接人:</span>
                    <!-- <el-tag v-if="isEdit===false" class="tag">{{ newInOrder.inPeopleName }}</el-tag> -->
                    <el-select :disabled="!isEdit" v-model="newInOrder.inPeopleName"  clearable placeholder="请选择"
                    class="tag">
                        <el-option
                        v-for="item in inPeopleNameList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  class="el-form-item-span" v-if="isNew=='false'">
                    <!--可修改：处于编辑状态，管理员，状态为待审核/已拒绝-->
                    <span slot="label"  class="span-text">订单状态:</span>
                    <!-- <el-tag v-if="isEdit===false" class="tag">{{ newInOrder.inStatus }}</el-tag> -->
                    <el-radio-group v-model="newInOrder.inStatus" size="medium" :disabled="!isEdit">
                    <el-radio-button label="已拒绝" ></el-radio-button>
                    <el-radio-button label="待审核"></el-radio-button>
                    <el-radio-button label="待入库"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <div v-if="isNew=='false'">
                    <span slot="label"  class="span-text">申请人:{{ newInOrder.userName }}</span>
                    <!-- <span style="font-size: 16px;">{{ newInOrder.userName }}</span> -->
                    <span slot="label"  class="span-text">审批人:{{ newInOrder.managerName }}</span>
                    <!-- <span style="font-size: 16px;">{{ newInOrder.managerName }}</span> -->
                <!-- <el-form-item  class="el-form-item-span" style="display: flex;">
                    <span slot="label"  class="span-text">申请人:{{ newInOrder.userName }}</span>
                    <span slot="label"  class="span-text">审批人:{{ newInOrder.managerName }}</span>
                  
                </el-form-item> -->
                <!-- <el-form-item  class="el-form-item-span" > -->
                    
                <!-- </el-form-item> -->
                <el-form-item class="el-form-item-span" v-if="newInOrder.inStatus === '已入库'">
                    <span slot="label"  class="span-text">入库时间:</span>
                    <span style="font-size: 16px;">{{ newInOrder.inTime }}</span>
                </el-form-item>
            </div>
            </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
            <div style="margin-bottom: 10px;text-align: center;">
                <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;"
                v-if="isEdit===true"
                @click="dialogFormVisible=true">添加包裹</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; "
                v-if="isEdit===true"
                @click="Delete">批量删除</el-button>
                <el-tag type="primary" style="font-size: medium;font-weight:bold;">包 裹 信 息</el-tag>
                <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                <el-button icon="el-icon-question" size="large" circle style="padding: 0px;float: right;margin-top: 6px;margin-right: 7px;border:transparent !important;;"></el-button>
                </el-tooltip>
            </div>
        <el-table :data="newInOrder.parcelList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :header-cell-style="{background:'#ebf3fc',padding:'0px',textAlign: 'center'}"
        :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
        :cell-class-name="tableCellClassName"
        @row-dblclick="dbclick"
        v-if="isEdit===true">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column  prop="parcelID" label="包裹ID" >
                <template slot-scope="scope" >
                    <el-tooltip class="item" effect="light" content="双击编辑"  placement="top-start">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.parcelID"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.parcelID}}</span>
                </el-tooltip>

                </template>
            </el-table-column>
            <el-table-column  prop="fromPeople" label="发货人" >
                <template slot-scope="scope">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.fromPeople"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.fromPeople}}</span>
                </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="fromPhone" label="发货人电话" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.fromPhone"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.fromPhone}}</span>
                </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="fromAddr" label="发货地址" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <!--地址处理，还可以分为省市区和详细两部分-->
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        type="textarea"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.fromAddr"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.fromAddr}}</span>
                </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="toPeople"  label="收货人" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.toPeople"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.toPeople}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="toPhone" label="收货人电话" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.toPhone"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.toPhone}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="toAddr"  label="收货地址" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
                    <el-input
                        @blur="hideInput"
                        size="mini"
                        type="textarea"
                        :ref="scope.row.index + ',' + scope.column.index"
                        v-model="scope.row.toAddr"
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.toAddr}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="newInOrder.parcelList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :header-cell-style="{background:'#ebf3fc',padding:'0px',textAlign: 'center'}"
        :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
        v-else>
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
        :page-sizes="[2,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="newInOrder.parcelList.length"
        style="margin-top: 7px;">
        </el-pagination>
        <div style="text-align: center;margin-top: 10px;">
            <el-button round type="primary" :loading="Loading" @click="saveOrder('newInOrder')" style="padding: 10px;" :disabled="isEdit===false?true:false">保 存</el-button>
            <el-button round type="success" :loading="Loading" @click="enter" style="padding: 10px;" v-if="enterOp==true">入 库</el-button>
            <el-popover
            placement="top"
            width="160"
            v-model="newInOrder.visible">
            <p>取消后将不保存填写记录,确定要取消吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="backToInSock">确定</el-button>
            </div>
            <el-button round style="padding: 10px; margin-left: 10px;"  :disabled="isEdit===false?true:false"  slot="reference">取 消</el-button>
            </el-popover>
        </div>
        </el-card>
        <el-dialog title="添加包裹"  :visible.sync="dialogFormVisible" style="padding: 0px;" :width="'800px'" class="dialogue-add">
        <el-form :model="parcel" ref="parcel" :rules="rules" style="padding: 0px; height: 300px; " label-width="100px" >
            <div style="text-align: center;">
                <el-form-item label-width="90px" prop="parcelID" style="margin-top: 0%; display: inline-block;">
                <span slot="label"  style="color: #403b3b;font-size: 16px;">包裹ID</span>
                <el-input class="id-input" v-model="parcel.parcelID" size="small" placeholder="由1-20位数字组成" autocomplete="off" style="width: 200px;" ></el-input>
                </el-form-item>
            </div>

            <el-card style="float: left; " class="add-order">
                <el-form-item label="发货人" prop="fromPeople"  style="margin: 13px;">
                <el-input v-model="parcel.fromPeople" size="small" placeholder="只能包含汉字、字母、数字" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发货人电话" prop="fromPhone" style="margin: 13px;">
                <el-input v-model="parcel.fromPhone" placeholder="请输入合法电话号码" size="small" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="省区" prop="fromAddrSelect" style="margin: 13px;"><!-- :options="options"-->
                    <el-cascader
                    size="small"
                    :options="options"
                    v-model="parcel.fromAddrSelect"
                    @change="handleChange">
                </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="fromAddrDetail" style="margin: 13px;margin-top: 18px;">
                <el-input v-model="parcel.fromAddrDetail" placeholder="请填写详细地址" size="small" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
            </el-card>
            <el-card style="float:right;"  class="add-order">
                <el-form-item label=" 收货人" prop="toPeople" style="margin: 13px;">
            <el-input v-model="parcel.toPeople" placeholder="只能包含汉字、字母、数字" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话" prop="toPhone" style="margin: 13px;">
            <el-input v-model="parcel.toPhone" size="small" placeholder="请输入合法的电话号码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="省/市/区" prop="toAddrSelect" placeholder="请选择省市区" style="margin: 13px;">
                <el-cascader
                size="small"
                :options="options"
                v-model="parcel.toAddrSelect"
                @change="handleChange_to">
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="toAddrDetail" style="margin: 13px;margin-top: 18px;">
                <el-input v-model="parcel.toAddrDetail" size="small" placeholder="请填写具体地址" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
            </el-card>
        </el-form>
        <div slot="footer" style="padding: 0px;margin-top: 20px;">
            <el-button size="small" @click=" clearForm ('parcel')">取 消</el-button>
            <el-button size="small" type="primary" @click="sureAdd('parcel')">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
/**状态：已入库不可修改，待入库-已入库（按钮操作），管理员特有：待审核——>已拒绝/待入库，已拒绝——>待入库/待审核
 * 内容：已入库、待入库不可修改，修改自己申请的订单（已拒绝/待审批），修改所有订单（已拒绝/待审批）
 * 共同：待入库——>已入库，查看所有订单
 */
import outAndIn from '@/api/outAndIn';
import { regionData, codeToText, TextToCode } from 'element-china-area-data'
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
//解码
function getCodeToText (codeStr) {
        let temp = ''
        for (let i=0;i<codeStr.length;i++){
            temp+=codeToText[codeStr[i]]
        }
        return temp;
}
//回显 str=北京市/直辖市/海淀区/XXXXXX
function getTextToCode (str) {

}
export default {
    //修改、查看、添加都是一样的界面
    data(){
        var parcelID = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不可为空'))
            }else if (!/^[0-9]{1,20}$/.test(value)){
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
        var inPeopleName = ( rule, value, callback) => {
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
            isNew:'true',//控制是否为空以及组件是否出现
            switch_disable:true,//控制是否可编辑
            enterOp: false,//控制是否可入库
            authority:'manager',
            currentCell: null,
            dialogFormVisible:false,
            options: regionData,
            inPeopleNameList:['王小龙','李小虎'],
            newInOrder:{
                inID: "",
                orderID: "",
                inPeopleName: "",
                visible: false,
                //以下为编辑查看特有
                inStatus:"",
                inTime:"",
                userName:"",
                managerName:"",
                parcelList: [
                    // {
                    // parcelID: "",
                    // fromPeople: "小王李",
                    // fromPhone: "12345678911",
                    // fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    // //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    // toPeople: "胡晓",
                    // toPhone: "12345678911",
                    // toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    // },
                    // {
                    // parcelID: "234567890344",
                    // fromPeople: "小王李",
                    // fromPhone: "12345678911",
                    // fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    // //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    // toPeople: "胡晓",
                    // toPhone: "12345678911",
                    // toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    // },
                    // {
                    // parcelID: "234567890345",
                    // fromPeople: "小王李",
                    // fromPhone: "12345678911",
                    // fromAddr:'北京市海淀区北下关街道上园村3号北京交通大学主校区南门',
                    // //详细地址+省市区+一个【】用于联级选择器，选好后，再将【】赋值给省市区字符串
                    // toPeople: "胡晓",
                    // toPhone: "12345678911",
                    // toAddr: "北京市海淀区北下关街道上园村3号北京交通大学主校区南门"
                    // }
                ]
            },
            parcel:{
                parcelID: "",
                fromPeople: "",
                fromPhone: "",
                fromAddrSelect: [],
                fromAddrSelect2:'',
                fromAddrDetail: "",

                toPeople: "",
                toPhone: "",
                toAddrSelect:[],
                toAddrSelect2:'',
                toAddrDetail: "",
           },
            rules:{
                inID:[{}],
                orderID:[
                    { required: true,  message: "不能为空", trigger: "blur"},
                    {validator: parcelID, trigger: 'blur'}],
                inPeopleName:[{required: true, message: '请选择', trigger: 'blur'}],
                //对话框
                parcelID:[
                    {required: true,message: "不能为空", trigger: "blur"},
                    {validator: parcelID, trigger: 'blur'}],
                fromPeople:[
                    {required: true,message: "不能为空", trigger: "blur"},
                    {validator: name, trigger: 'blur'}],
                fromPhone:[
                {required: true,message: "不能为空", trigger: "blur"},    
                {validator: phone, trigger: 'blur'}],
                fromAddrSelect: [{required: true, message: '请选择', trigger: 'blur'}],
                fromAddrDetail:[
                {required: true,message: "不能为空", trigger: "blur"},    
                {validator: addrDetail, trigger: 'blur'}],
                toPeople:[
                {required: true,message: "不能为空", trigger: "blur"},
                {validator: name, trigger: 'blur'}],
                toPhone:[
                {required: true,message: "不能为空", trigger: "blur"},    
                {validator: phone, trigger: 'blur'}],
                toAddrSelect: [{required: true, message: '请选择', trigger: 'blur'}],
                toAddrDetail:[
                {required: true,message: "不能为空", trigger: "blur"},    
                {validator: addrDetail, trigger: 'blur'}]
            },
            //表格分页
            multipleSelection: [],//选中的信息
            currentPage: 1, // 当前页码
            pageSize: 2 // 每页的数据条数
        }
    },
    created(){
        const _this =this
        this.isNew = window.sessionStorage.getItem('isNew')
        //判断是新增还是编辑查看
        if (this.isNew =='true') {//新增
            this.isEdit = true
            //生成订单号、所有数据为空、且可编辑状态
            this.newInOrder.inID = getNowTime()
            //入库交接人获取
            outAndIn.fetchInPeopleNameList().then(res=>{
                if (res.data.status_code == true){
                    this.inPeopleNameList = res.data.inPeopleNameList
                }
            })
        }else {//查看编辑
            this.isEdit = false
            //获取数据
            outAndIn.singleInOrderDetail(window.sessionStorage.getItem('row')).then(res=>{
                console.log(res.data)
                if (res.data.status_code == true){
                    //保存数据
                    _this.newInOrder.inID = res.data.inID
                    _this.newInOrder.inPeopleName = res.data.inPeopleName
                    _this.newInOrder.inStatus = res.data.inStatus
                    _this.newInOrder.managerName = res.data.managerName
                    _this.newInOrder.orderID = res.data.orderID
                    _this.newInOrder.userName =res.data.userName
                    _this.newInOrder.inTime =res.data.inTime
                    _this.newInOrder.parcelList =res.data.parcelList
                    console.log(_this.newInOrder)
                    //判断该订单状态，若为已入库则状态和内容皆不可修改
                    if (this.newInOrder.inStatus === "已入库"){
                        this.switch_disable = true
                    }else if (this.newInOrder.inStatus === "待入库"){//只能进行入库操作
                        this.enterOp = true
                        console.log("ok")
                    }else {//待审核和已拒绝
                        console.log("okkkk")
                        //获取身份
                        //this.authority=window.sessionStorage.getItem('authority')
                        //若为普通用户，判断该订单本用户是否可编辑
                        if(this.authority != 'manager'){
                            //若为本用户所申请的订单
                            if(this.newInOrder.userName === window.sessionStorage.getItem('userName')){
                                this.switch_disable = false
                            }else {
                                this.switch_disable = true
                            }
                        }else {
                            this.switch_disable = false
                        }
                    }

                }else {
                    this.$message({
                        message:"获取包裹详情异常",
                        type:"error"
                    })
                }
            })
            

        }
    },
    methods:{
    /**----------------------------------------普通操作方法------------------------------------------------- */
    //确定添加
    sureAdd(formName){
        console.log(formName)
        this.$refs[formName].validate((valid) => {
            console.log(valid)
            if (valid){
                //表单验证后
                let temp={
                    parcelID :"",
                    fromPeople: "",
                    fromPhone: "",
                    fromAddr: "",
                    toPeople: "",
                    toPhone: "",
                    toAddr: "",
                }
                temp.parcelID=this.parcel.parcelID
                temp.fromPeople=this.parcel.fromPeople
                temp.fromPhone=this.parcel.fromPhone
                temp.fromAddr=this.parcel.fromAddrSelect2+this.parcel.fromAddrDetail
                temp.toPeople=this.parcel.toPeople
                temp.toPhone=this.parcel.toPhone
                temp.toAddr=this.parcel.toAddrSelect2+this.parcel.toAddrDetail
                this.newInOrder.parcelList.push(temp)
                this.dialogFormVisible=false
                this.clearForm(formName)
            }else {
                this.$message({
                    message:'填写不完全或输入不合法',
                    type:'error'
                })
            }
        })

    },
    //返回入库界面
    backToInSock(){
        this.newInOrder.visible = false
        this.$router.push({path:'/inStock'})
    },
    //批量删除
    Delete(){
        for (let k = 0; k < this.multipleSelection.length; k++) {
            this.newInOrder.parcelList.splice(
                this.newInOrder.parcelList.findIndex(
                   item => item.parcelID === this.multipleSelection[k].parcelID
            ),
            1);
        }
        console.log(this.newInOrder.parcelList)
    },
    //保存新订单或者保存修改
    saveOrder(formName){
        if(this.newInOrder.parcelList.length>0){
            this.$refs[formName].validate(valid=>{
            if(valid){
                if (this.isNew == 'true'){
                    this.Loading =true
                    outAndIn.addInOrder(this.newInOrder).then(res=>{
                    console.log(res)
                    if(res.data.status_code == true){
                        this.$message({
                            message:"申请成功，待审批",
                            type:'success'
                        })
                        this.$router.push('/inStock')
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
                        outAndIn.ExamineIn(this.newInOrder).then(res=>{
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
    //入库操作
    enter(){
        this.newInOrder.inStatus = '已入库'
        this.Loading =true
        outAndIn.ExamineIn(this.newInOrder).then(res=>{
            console.log(res)
            if(res.data.status_code == true){
                this.$message({
                    message:"入库成功",
                    type:'success'
                })
                this.$router.push('/inStock')
            }else {
                this.$message({
                    message:"入库失败原因是"+res.message,
                    type:'error'
                })
            }
        })
      
    },

    /**-----------------------------------------表格操作------------------------------------------------ */
     //解码
    handleChange (value) {
        this.parcel.fromAddrSelect2 = getCodeToText(value)
    },
    handleChange_to (value) {
        this.parcel.toAddrSelect2 = getCodeToText(value)
    },
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
    // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
    tableCellClassName({row, column, rowIndex, columnIndex}){
            row.index=rowIndex;
            column.index=columnIndex;
    },
    // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
    // 拼接后类似这样："1,0","1,1",
    dbclick(row,column) {
        // this.dialogFormVisible = true
        this.currentCell = row.index + ',' + column.index;
      //  这里必须要setTimeout，因为在点击的时候，input才刚被v-if显示出来，不然拿不到dom
        setTimeout(() => {
            // 双击后自动获得焦点
            this.$refs[row.index + ',' + column.index].focus();
        })
    },
   // 当input失去焦点的时候，隐藏input
    hideInput(){
        this.currentCell = null;
    },
    //取消选择
    toggleSelection(rows) {
        if (rows) {
        rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
        });
        } else {
        this.$refs.multipleTable.clearSelection();
        }
    },
    //多选
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    // 清空表单
    clearForm (formName) {
    this.$refs[formName].resetFields()
    this.dialogFormVisible=false
    },

    }
}
</script>

<style lang="less" scoped>
.tag{
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
