<template>
    <div>
        <el-card style="text-align:center;">
            <div style="float: right;">
                <el-button icon="el-icon-d-arrow-right" size="large" circle style="border: transparent !important;" @click="backToInSock"></el-button>
                <!-- <el-button type="primary" style="border:transparent !important;" plain size="small">返回<i class="el-icon-d-arrow-right"></i></el-button> -->
            </div>
            <el-form :model="newInOrder" label-width="100px" ref="newInOrder" :rules="rules" style="width: 500px; text-align:center;display: inline-block;height: 170px;">
                
                <el-form-item  style="display: inline-block">
                    <span slot="label"  style="color: #403b3b;font-size: 16px;">入库单号:</span>
                    <el-tag type="success" style="width: 250px;height: 40px; text-align: center; font-size: 16px;padding: 4px;">{{ newInOrder.inID }}</el-tag>
                    </el-form-item>
                <el-form-item style="display: inline-block">
                    <span slot="label"  style="color: #403b3b;font-size: 16px;">订单号:</span>
                    <el-input placeholder="数字组成" v-model="newInOrder.orderID" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item prop="" class="" style="display: inline-block">
                    <span slot="label"  style="color: #403b3b;font-size: 16px;">入库人姓名:</span>
                    <el-select  v-model="newInOrder.inPeopleName"  clearable placeholder="请选择" style="width: 250px;">
                        <el-option
                        v-for="item in inPeopleNameList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
            <div style="margin-bottom: 10px;text-align: center;">
                <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;" @click="dialogFormVisible=true">添加包裹</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; " @click="Delete">批量删除</el-button>
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
        @row-contextmenu="rightClick"
        highlight-current-row  >
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column  prop="parcelID" label="包裹ID" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="双击编辑" placement="top-start">
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
                    <!--v-if去判断双击的是不是当前单元格-->
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
        <el-pagination align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-sizes="[5,10,20]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="newInOrder.parcelList.length"
        style="margin-top: 7px;">
        </el-pagination>
        <div style="text-align: center;margin-top: 10px;">
            <el-button round type="primary" style="padding: 10px;">保 存</el-button>
            <el-popover
            placement="top"
            width="160"
            v-model="newInOrder.visible">
            <p>取消后将不保存填写记录,确定要取消吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="backToInSock">确定</el-button>
            </div>
            <el-button round style="padding: 10px; margin-left: 10px;"    slot="reference">取 消</el-button>
            </el-popover>
        </div>
        </el-card>
        <el-dialog title="添加包裹"  :visible.sync="dialogFormVisible" style="padding: 0px;" :width="'800px'" class="dialogue-add">
        <el-form :model="parcel" ref="parcel" :rules="rules" style="padding: 0px; height: 300px; " label-width="90px" >
            <div style="text-align: center;">
                <el-form-item label-width="70px" prop="parcelID" style="margin-top: 0%; display: inline-block;">
                <span slot="label"  style="color: #403b3b;font-size: 16px;">包裹ID</span>
                <el-input class="id-input" v-model="parcel.parcelID" size="small" autocomplete="off" style="width: 200px;" ></el-input>
                </el-form-item>
            </div>
            
            <el-card style="float: left; " class="add-order">
                <el-form-item label="发货人"  style="margin: 13px;">
                <el-input v-model="parcel.fromPeople" size="small" placeholder="姓名（校验是否要中文）" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发货人电话"  style="margin: 13px;">
                <el-input v-model="parcel.fromPhone" size="small" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="省区"  style="margin: 13px;"><!-- :options="options"-->
                    <el-cascader
                    size="small"
                    :options="options"
                    v-model="parcel.fromAddrSelect"
                    @change="handleChange">
                </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址"  style="margin: 13px;margin-top: 18px;">
                <el-input v-model="parcel.fromAddrDetail" size="small" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
            </el-card>
            <el-card style="float:right;"  class="add-order">
                <el-form-item label=" 收货人"  style="margin: 13px;">
            <el-input v-model="parcel.toPeople" placeholder="姓名（校验是否要中文）" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话"  style="margin: 13px;">
            <el-input v-model="parcel.toPhone" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="省/市/区"  style="margin: 13px;">
                <el-cascader
                size="small"
                :options="options"
                v-model="parcel.toAddrSelect"
                @change="handleChange_to">
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址"  style="margin: 13px;margin-top: 18px;">
                <el-input v-model="parcel.toAddrDetail" size="small" autocomplete="off" type="textarea"></el-input>
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
/**
 * 编辑状态：与新增一样界面（但是一些数据从请求得来），保存则发送请求（与新增一样），修改对应订单
 * 查看状态：不可编辑
 */
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
export default {
    //修改、查看、添加都是一样的界面
    data(){
        var parcelID = (rule, value, callback) => {
            if (!value) {
                callback()
            }else if (!/^[0-9]*$/.test(value)){
                return callback(new Error('只能由数字组成'))
            }
        }
        return{
            currentCell: null,
            dialogFormVisible:false,
            inPeopleNameList:['王小龙','李小虎'],
            options: regionData,
            newInOrder:{
                inID: "",
                orderID: "",
                inPeopleName: "",
                visible: false,
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
                orderID:[{}],
                inPeopleName:[{}],
                parcelID:[{validator: parcelID, trigger: 'blur'}],
                fromPeople:[{}],
                fromPhone:[{}],
                fromAddrDetail:[{}]
            },
            //表格分页
            multipleSelection: [],//选中的信息
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5 // 每页的数据条数
        }
    },
    created(){
        this.newInOrder.inID = getNowTime()
    },
    methods:{
    //解码
    handleChange (value) {
        this.parcel.fromAddrSelect2 = getCodeToText(value)
    },
    handleChange_to (value) {
        this.parcel.toAddrSelect2 = getCodeToText(value)
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
    // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
    tableCellClassName({row, column, rowIndex, columnIndex}){
            row.index=rowIndex;
            column.index=columnIndex;
    },
    // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
    // 拼接后类似这样："1,0","1,1",
    dbclick(row,column) {
        this.currentCell = row.index + ',' + column.index;
        // 这里必须要setTimeout，因为在点击的时候，input才刚被v-if显示出来，不然拿不到dom
        setTimeout(() => {
            // 双击后自动获得焦点
            this.$refs[row.index + ',' + column.index].focus();
        })
    },
    // 当input失去焦点的时候，隐藏input
    hideInput(){
        this.currentCell = null;
    },
    // 表格右击的功能
    rightClick(row, column, event) {
        console.log(row.index,column.index)
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
    /**----------------------------------------普通操作方法------------------------------------------------- */
    //确定添加
    sureAdd(formName){
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
    },
    //返回入库界面
    backToInSock(){
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
    }

    }
}
</script>

<style lang="less" scoped>
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
