<template>
<div style="width:100%;height:100%">
    <el-card style="float: left;width: 18%;height: 100%;">
        <div class="">
            <div>
                <span >入库申请单已处理</span>
            <el-progress type="circle" :percentage="percentage" style="margin-top: 10px;"  :color="customColorMethod"></el-progress>
            </div>
           <div style="margin-top: 30px;">
            <span>出库申请单已处理</span>
            <el-progress type="circle" :percentage="percentage_out" style="margin-top: 10px;"  :color="customColorMethod"></el-progress>
           </div>
           
        </div>
    </el-card >
    <el-card style="float:right;width: 80%;height: 100%;">
        <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="待审核入库单">
            <el-table :data="inList.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' 
            :default-sort = "{prop: 'inID', order: 'increasing'}"
            >
            <!--排序、操作按钮、下拉详情tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
            <el-table-column  prop="inID" sortable label="入库单号"  >
            </el-table-column>
            <el-table-column  prop="orderID" sortable label="订单号">
            </el-table-column>
            <el-table-column prop="inPeopleName" sortable label="入库交接人"  >
            <template slot-scope="scope">
                <el-tag
                size="small"
                type="success"
                disable-transitions>{{scope.row.inPeopleName}}</el-tag>
            </template>
        </el-table-column>
            <el-table-column prop="userName" sortable label="申请人" >
                <template slot-scope="scope">
                <el-tag
                size="small"
              >{{scope.row.userName}}</el-tag> 
            </template>
            </el-table-column>
            <el-table-column prop="inStatus" label="入库状态" >
            <template slot-scope="scope">
                <el-tag
                size="small"
                type="danger"
              >{{scope.row.inStatus}}</el-tag> 
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
                <el-button @click="handleClick_dia(scope.row)" type="text" size="small" >审核</el-button>
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
        :total="inList.length"
        style="margin-top: 7px;">
        </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="待审核出库单">
            <el-table :data="outList.slice((currentPage_out-1)*pageSize_out,currentPage_out*pageSize_out)" style="width: 100%" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' 
            :default-sort = "{prop: 'outID', order: 'increasing'}"
            >
            <!--排序、操作按钮、下拉详情tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
            <el-table-column  prop="outID" sortable label="入库单号"  >
            </el-table-column>
            <el-table-column  prop="orderID" sortable label="订单号">
            </el-table-column>
            <el-table-column prop="outPeopleName"  sortable label="入库交接人" >
                <template slot-scope="scope">
                <el-tag
                size="small"
                type="success"
                disable-transitions>{{scope.row.outPeopleName}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column prop="userName" sortable label="申请人" >
                <template slot-scope="scope">
                <el-tag
                size="small"
              >{{scope.row.userName}}</el-tag> 
            </template>
            </el-table-column>
            <el-table-column prop="outStatus" label="入库状态" >
            <template slot-scope="scope">
                <el-tag
                size="small"
                type="danger"
              >{{scope.row.outStatus}}</el-tag> 
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
                <el-button @click="handleClick_dia_out(scope.row)" type="text" size="small" >审核</el-button>
        </template>
        </el-table-column>
        </el-table>
        <el-pagination align='center' 
        @size-change="handleSizeChange_out" 
        @current-change="handleCurrentChange_out"
        :current-page="currentPage_out" 
        :page-sizes="[5,10,20]" 
        :page-size="pageSize_out" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="outList.length"
        style="margin-top: 7px;">
        </el-pagination>
        </el-tab-pane>
        </el-tabs>
            </el-card>
            <el-dialog :title="isInOrder === 'true' ? '入库申请单':'出库申请单'" :visible.sync="dialogFormVisible" :width="'800px'">
                <div >
                  <el-card style="text-align:center;margin-top: 0px;">
                    <!-- <div style="float: right;">
                        <el-tooltip class="item" effect="dark" content="" placement="top-start">
                           <el-button icon="el-icon-d-arrow-right" size="large" circle style="border: transparent !important;" @click="leapToNext"></el-button>
                        </el-tooltip>
                    </div> -->
                    <!-- <div style="float: left;">
                       <el-button icon="el-icon-d-arrow-left" size="large" circle style="border: transparent !important;" @click="backToInSock"></el-button>
                    </div> -->
            <el-form :model="dialogue" label-width="100px" ref="dialogue" :rules="rules" style="width: 500px; text-align:center;display: inline-block;height: 150px;">
                <el-form-item  style="display: inline-block;margin-bottom: 0%;" >
                    <span slot="label"  style="color: #403b3b;" v-if="isInOrder === 'true'">入库单号:</span>
                    <span slot="label"  style="color: #403b3b;" v-else>出库单号:</span>
                    <el-tag class="tag">{{ dialogue.inID }}</el-tag>
                    </el-form-item>
                <el-form-item style="display: inline-block;margin-bottom: 0%;">
                    <span slot="label"  style="color: #403b3b;" >订单号:</span>
                    <el-tag type="success" class="tag">{{ dialogue.orderID }}</el-tag>
                </el-form-item>
                <el-form-item prop="" class="" style="display: inline-block;margin-bottom: 0%;">
                    <span slot="label"  style="color: #403b3b;" v-if="isInOrder === 'true'">入库交接人:</span>
                    <span slot="label"  style="color: #403b3b;" v-else>出库交接人:</span>
                    <el-tag type="success" class="tag">{{ dialogue.inPeopleName }}</el-tag>
                </el-form-item>
                <el-form-item prop="" class="" style="display: inline-block;margin-bottom: 0%;">
                    <span slot="label"  style="color: #403b3b;">申请人:</span>
                    <el-tag type="success" class="tag">{{ dialogue.userName }}</el-tag>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 7px;">
            <div style="margin-bottom: 5px;text-align: center;">
                <el-tag type="primary" style="font-weight:bold;font-size: 15px;">包 裹 信 息</el-tag>
            </div>        
        <el-table :data="dialogue.parcelList.slice((currentPage_dia-1)*pageSize_dia,currentPage_dia*pageSize_dia)" 
        style="width: 100%"
        :header-cell-style="{background:'#ebf3fc',padding:'0px',textAlign: 'center'}"
        :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
        :cell-class-name="tableCellClassName"
        highlight-current-row  >
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
        @size-change="handleSizeChange_dia" 
        @current-change="handleCurrentChange_dia"
        :current-page="currentPage_dia" 
        :page-sizes="[5,10,20]" 
        :page-size="pageSize_dia" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="dialogue.parcelList.length"
        style="margin-top: 7px;">
        </el-pagination>
        <div style="text-align: center;margin-top: 10px;">
            <el-button round type="success" @click="agree" style="padding: 10px;">同 意</el-button>
            <!-- <el-popover
            placement="top"
            width="160"
            v-model="dialogue.visible">
            <p>备注</p>
            <el-input v-model="dialogue.input_dia" type="textarea"></el-input>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" style="padding: 4px;" @click="dialogue.visible = false">取消</el-button>
                <el-button type="primary" size="mini" style="padding: 4px;" @click="dialogue.visible = false">确定</el-button>
            </div> -->
            <el-button round type="danger" style="padding: 10px;margin-left: 10px;" @click="disagree">拒 绝</el-button>
            <!-- </el-popover> -->
            <el-button round style="padding: 10px; margin-left: 10px;" @click="dialogFormVisible=false">取 消</el-button>
        </div>
        </el-card>
    </div>
   </el-dialog> 
</div>
</template>
<script>
import outAndIn from '@/api/outAndIn.js'
//计算百分比(每审批一个就调用一次)
function calPercentage(percentage,list){
        var temp = percentage + 100/length(list)
        return temp
}

export default{
    data(){
        //未处理数量，
        return{
            isIn:true,
            dialogFormVisible:false,
            /**入库 */
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页的数据条数
            percentage:0,//每处理一次订单就计算一次（percentage+100/inList的长度）
            
            /**出库 */
            currentPage_out: 1, // 当前页码
            pageSize_out: 10, // 每页的数据条数
            percentage_out:0,

            outPeopleNameList:[{text: '小王', value: '小王'},{text: '小李', value: '小李'}],//从数据存储获得
            inPeopleNameList:[{text: '小王', value: '小王'},{text: '小李', value: '小李'}],//从数据存储获得
            inList:[
                {
                    inID: "1",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "2",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "3",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "4",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "5",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "6",
                    orderID: "string",
                    inPeopleName: "string",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
                {
                    inID: "7",
                    orderID: "string",
                    inPeopleName: "小王",
                    inStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
            ],
            outList:[
                {
                    outID: "string",
                    orderID: "string",
                    outPeopleName: "小王",
                    outStatus: "string",
                    inTime: "string",
                    userName: "string"
                },
               
            ],
            //对话框展现的数据
            isInOrder:'true',
            
            dialogue:{
                //以下需要请求获得
                inID: "string",
                orderID: "string",
                inPeopleName: "string",
                inStatus: "string",
                inTime: "string",
                userName: "string",
                managerName: "string",
                parcelList: [
                    {
                        parcelID: "string",
                        fromPeople: "string",
                        fromPhone: "string",
                        fromAddr: "string",
                        toPeople: "string",
                        toPhone: "string",
                        toAddr: "string"
                    },
                    {
                        parcelID: "string",
                        fromPeople: "string",
                        fromPhone: "string",
                        fromAddr: "string",
                        toPeople: "string",
                        toPhone: "string",
                        toAddr: "string"
                    },
                    {
                        parcelID: "string",
                        fromPeople: "string",
                        fromPhone: "string",
                        fromAddr: "string",
                        toPeople: "string",
                        toPhone: "string",
                        toAddr: "string"
                    },
                    {
                        parcelID: "string",
                        fromPeople: "string",
                        fromPhone: "string",
                        fromAddr: "string",
                        toPeople: "string",
                        toPhone: "string",
                        toAddr: "string"
                    },
                    {
                        parcelID: "string",
                        fromPeople: "string",
                        fromPhone: "string",
                        fromAddr: "string",
                        toPeople: "string",
                        toPhone: "string",
                        toAddr: "string"
                    }
                ]
            },
            
            currentPage_dia: 1, // 当前页码
            pageSize_dia: 10, // 每页的数据条数

        }
    },
    created(){
        outAndIn.InNeedTocheck().then(res=>{
            if(res.data.status_code){
                this.inList = res.data.inList
            }
        })
        outAndIn.OutNeedTocheck().then(res=>{
            if(res.data.status_code){
                this.outList = res.data.outList
            }
        })
        if(this.inList.length == 0){
            this.percentage =100
        }
        if(this.outList.length == 0){
            this.percentage_out =100
        }
    },
    methods:{
        /**---------------------------------整体适用---------------------------------------- */
        //进度条颜色
        customColorMethod(percentage) {
            if (percentage < 30) {
            return '#909399';
            } else if (percentage < 70) {
            return '#e6a23c';
            } else {
            return '#67c23a';
            }
        },
        /**--------------------------待审核入库单表格操作---------------------------- */
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        //入库审阅
        handleClick_dia(row){
            //赋予对话框数据
            outAndIn.singleInOrderDetail(row.inID).then(res=>{
                console.log(res)
                if(res.data.status_code){
                    this.dialogue.inID = res.data.inID
                    this.dialogue.inPeopleName = res.data.inPeopleName
                    this.dialogue.inStatus =res.data.inStatus
                    this.dialogue.inTime =res.data.inTime
                    this.dialogue.userName = res.data.userName
                    this.dialogue.managerName = res.data.managerName
                    this.dialogue.orderID = res.data.orderID
                    this.dialogue.parcelList = res.data.parcelList
                }
            })
            this.isIn = true
            this.dialogFormVisible=true
        },
        /**-------------------------------------待审核出库单操作----------------------------------- */
            //每页条数改变时触发 选择一页显示多少行
        handleSizeChange_out(val) {
            this.currentPage_out = 1;
            this.pageSize_out = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange_out(val) {
            this.currentPage_out = val;
        },
        //出库审核按钮
        handleClick_dia_out(row){
            //赋予对话框数据
            outAndIn.singleOutOrderDetail(row.outID).then(res=>{
                if(res.data.status_code){
                    this.dialogue.inID = res.data.outID
                    this.dialogue.inPeopleName = res.data.outPeopleName
                    this.dialogue.inStatus =res.data.outStatus
                    this.dialogue.inTime =res.data.outTime
                    this.dialogue.managerName = res.data.managerName
                    this.dialogue.orderID = res.data.orderID
                    this.dialogue.parcelList = res.data.parcelList
                }
            })
            this.isIn = false
            this.dialogFormVisible=true
        },
        /**---------------------------------------对话框--------------------------------------- */
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange_dia(val) {
            this.currentPage_dia = 1;
            this.pageSize_dia = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange_dia(val) {
            this.currentPage_dia = val;
        },
        //同意操作
        agree(){
           const _this = this
           if(this.isIn){
            this.dialogue.inStatus = '待入库'
            outAndIn.ExamineIn(this.dialogue).then(res=>{
                console.log(res)
                if(res.data.status_code){
                    this.$message({
                        message:"处理结果成功保存",
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:"处理异常",
                        type:'error'
                    })
                }
            })
           }else {
            let dialogue_out={
                outID: _this.dialogue.inID,
                orderID: _this.dialogue.orderID,
                outPeopleName: _this.dialogue.inPeopleName,
                outStatus: '待出库',
                outTime: _this.dialogue.inTime,
                userName: _this.dialogue.userName,
                managerName: _this.dialogue.managerName,
                parcelList: _this.dialogue.parcelList
            }
            outAndIn.ExamineOut(dialogue_out).then(res=>{
                if(res.data.status_code){
                    this.$message({
                        message:"处理结果成功保存",
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:"处理异常",
                        type:'success'
                    })
                }
            })
           }
        },
        //拒绝操作
         disagree(){
           const _this = this
           if(this.isIn){
            this.dialogue.inStatus = '已拒绝'
            outAndIn.ExamineIn(this.dialogue).then(res=>{
                if(res.data.status_code){
                    this.$message({
                        message:"处理结果成功保存",
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:"处理异常",
                        type:'success'
                    })
                }
            })
           }else {
            let dialogue_out={
                outID: _this.dialogue.inID,
                orderID: _this.dialogue.orderID,
                outPeopleName: _this.dialogue.inPeopleName,
                outStatus: '已拒绝',
                outTime: _this.dialogue.inTime,
                userName: _this.dialogue.userName,
                managerName: _this.dialogue.managerName,
                parcelList: _this.dialogue.parcelList
            }
            outAndIn.ExamineOut(dialogue_out).then(res=>{
                if(res.data.status_code){
                    this.$message({
                        message:"处理结果成功保存",
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:"处理异常",
                        type:'success'
                    })
                }
            })
           }
        }
    },
        

}
</script>
<style lang="less" scoped>
/**-------------------------------------整体适用--------------------------------------- */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.tag {
    width: 250px;height: 30px; text-align: center; padding: 2px;
}
</style>