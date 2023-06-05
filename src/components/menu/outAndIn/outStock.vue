<template>
    <div >
        <el-card class="box-card">
        <el-form :model="queryConditions" :rules="rules" ref="queryConditions" label-width="90px" class="form" :inline="true">
                    <el-form-item class="el-form-item">
                    <span slot="label" style="color: #403b3b">出库单状态:</span>
                    <el-radio-group v-model="queryConditions.outStatus" class="status-group" size="small">
                    <el-radio-button label="待审核" ></el-radio-button>
                    <el-radio-button label="待出库"></el-radio-button>
                    <el-radio-button label="已拒绝"></el-radio-button>
                    <el-radio-button label="已出库"></el-radio-button>
                    <el-radio-button label="全部状态"></el-radio-button>
                    </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="" class="textInput el-form-item">
                    <span slot="label"  style="color: #403b3b;">   出库交接人:</span>
                    <el-select  v-model="queryConditions.outPeopleName" size="small" clearable placeholder="请选择" style="width: 150px;">
                        <el-option
                        v-for="item in outPeopleNameList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item  prop="orderID" class="textInput2 el-form-item">
                    <span slot="label"  style="color: #403b3b; ">订 单 号:</span>
                    <el-input placeholder="只能由数字组成" size="small" v-model="queryConditions.orderID" clearable></el-input>
                    </el-form-item>
                    <el-form-item  prop="outID" class="textInput el-form-item">
                    <span slot="label"  style="color: #403b3b">出 库 单 号:</span>
                    <el-input placeholder="14个字符,如20230510195801" size="small" v-model="queryConditions.outID" clearable style="width: 220px;"></el-input>
                    </el-form-item>
                    
        </el-form>
        <div style="display: flex;float: right;margin-bottom:10px;">
                    <el-button type="primary" @click="searchMag('queryConditions')" :loading="Loading" icon="el-icon-search"  round size="small">搜索</el-button>
                    <el-button type="info" @click="clearFilter('queryConditions')" plain icon="el-icon-refresh-right" round size="small">重置</el-button> 
        </div>
        
    </el-card>
    <el-card style="margin-top: 10px;">
            <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="addNew">新建出库单</el-button>
            <el-button type="danger" @click="deleteMultitude" :loading="Loading" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; margin-bottom: 10px;">批量删除</el-button>
            <el-tooltip class="item" effect="light" content="清除所有筛选条件、恢复默认排序、清空选择" placement="top-start">
            <el-button type="primary" @click="resetDateFilter" icon="el-icon-refresh-right" plain size="small" circle style="padding:5px;float: right;"></el-button>
            </el-tooltip>
            <!--表头等操作-->
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" 
            ref="tableData"
            @selection-change="handleSelectionChange" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' 
            :default-sort = "{prop: 'outID', order: 'increasing'}">
            <!--排序、操作按钮、下拉详情tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column  prop="outID" sortable label="出库单号"  >
            </el-table-column>
            <el-table-column  prop="orderID" sortable label="订单号">
            </el-table-column>
            <el-table-column prop="outPeopleName" label="出库交接人" ></el-table-column>
            <el-table-column prop="outTime" sortable label="出库时间" >
            </el-table-column>
            <el-table-column prop="userName" sortable label="申请人" >
            </el-table-column>
            <!--状态待修改-->
            <el-table-column prop="outStatus" label="出库状态" 
            :filters="[{ text: '待出库', value: '待出库' }, { text: '已出库', value: '已出库' }
            , { text: '待审核', value: '待审核' }, { text: '已拒绝', value: '已拒绝' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
             <!--处理待修改-->
                <el-tooltip class="item" :disabled="scope.row.outStatus === '待出库' ? true : false" effect="light" 
                :content="scope.row.outStatus === '待出库' ? '已成功入库' : '点击修改状态'" placement="top-start">
                <el-button 
                plain
                round
                size="small"
                style="height: 30px;width: auto; padding: 4px;"
                @click="modifyAndView(scope.row)"
                :type="scope.row.outStatus === '待出库' ? 'success' : 'warning'"
                >{{scope.row.outStatus}}<i :class="scope.row.outStatus === '待出库' ? '' : 'el-icon-edit'"></i></el-button>
            </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
            <div style=" display: flex;">
                <el-button @click="modifyAndView(scope.row)" type="text" size="small" >查看/编辑</el-button>
                <el-button @click="deleteOne(scope.row)" type="text" size="small" >删除</el-button>
            </div>
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
        :total="tableData.length"
        style="margin-top: 7px;">
        </el-pagination>
    </el-card>
</div>
</template>
<script>
/**
 * 共同：待入库——>已入库，查看所有订单 ，删除已拒绝/待入库的订单
 * 普通用户：修改自己申请的订单（已拒绝/待入库/待审批）
 * 管理员：修改所有订单（已拒绝/待入库/待审批），待审核——>已拒绝/待入库，已拒绝/待入库——>已拒绝/待入库
 */
import outAndIn from '@/api/outAndIn.js'
//判断待删除的订单的状态
function judgeState(arry){
        for (let i=0;i<arry.length;i++){
            if (arry[i].outStatus != '待入库'|| '已拒绝'){
                return false
            }
        }
        return true
}
export default{
    data(){
        var outID = (rule, value, callback) => {
            if (!value) {
                callback()
            } else if(!/^\d{14}$/.test(value)){
                return callback(new Error('14个数字组成,如20230510195801'))
            }
        }
        var orderID = (rule, value, callback) => {
            if (!value) {
                callback()
            }else if (!/^[0-9]{5,16}$/.test(value)){
                return callback(new Error('只能由数字组成'))
            }
        }
        return{
            Loading:false,
            queryConditions:{
                outStatus: '全部状态',
                outID: '',
                orderID: '',
                outPeopleName: ''
            },
            tableData:[
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
                // {
                //     outID: "20230510192800",
                //     orderID: "20230510192801",
                //     outPeopleName: "王小利",
                //     outStatus:'已入库',
                //     outTime: "2023-05-10-19:58:01",
                //     userName: "小李"
                // },
            ],
            outPeopleNameList:["小李",'小猪'],
            rules:{
                outID:[{validator: outID, trigger: 'blur'}],
                orderID:[{validator: orderID, trigger: 'blur'}],
            },
            multipleSelection: [],//选中的信息
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5 // 每页的数据条数
        }
    },
    created(){
        this.fetchNewTable()
    },
    methods:{
      /**----------------------------------通用方法--------------------------------- */
      //刷新表格
      fetchNewTable(){
            outAndIn.showOut().then(res=>{
                if (res.data.status_code == true){
                    this.tableData = res.data.outList
                }
            })
            outAndIn.fetchOutPeopleNameList().then(res=>{
                if (res.data.status_code ==true){
                    this.outPeopleNameList =res.data.outPeopleNameList
                }
            })
      },
       
      /**------------------------------------------普通方法------------------------------------------- */
      //新建
      addNew(){
        window.sessionStorage.setItem('isNew_out','true')
        this.$router.push({ path: '/addNewOut' })
      },
      //查询
      searchMag(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.Loading = true
                outAndIn.searchOut(this.queryConditions).then(res=>{
                    if(res.data.status_code === true){
                        this.tableData = res.data.outList
                    }else {
                        this.$message({
                            message:"查询异常",
                            type:"error"
                        })
                    }
                }).finally(res=>{
                    this.Loading =false
                })
            }
        })
      },
       //批量删除
       deleteMultitude(){
        if (judgeState(this.multipleSelection) == true ){
            var temp = []
            for (let i=0;i<this.multipleSelection.length;i++){
                temp.push(this.multipleSelection[i].inID)
            }
            outAndIn.OutDelMultitude(temp).then(res=>{
                if(res.data.status_code ==true){
                    this.fetchNewTable()
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                }else{
                    this.$message({
                        message:"删除异常",
                        type:"error"
                    })
                }
            })
        }else {
            this.$message({
                message:"只能删除待出库和已拒绝的订单",
                type:'error'
            })
        }
        
      },
       //删除一条
       deleteOne(row){
        var temp_ = []
        temp_.push(row)
        if (judgeState(temp_) == true ){
            var temp = []
            temp.push(row.inID)
            console.log(temp)
            outAndIn.OutDelMultitude(temp).then(res=>{
                if(res.data.status_code ==true){
                    this.fetchNewTable()
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                }else{
                    this.$message({
                        message:"删除异常",
                        type:"error"
                    })
                }
            })
        }else {
            this.$message({
                message:"只能删除待出库和已拒绝的订单",
                type:'error'
            })
        }
        
      },
      //查看编辑、修改状态
      modifyAndView(row){
        window.sessionStorage.setItem('isNew_out','false')
        window.sessionStorage.setItem('row_out',row.outID)
        this.$router.push({ path: '/addNewOut' })
      },
       /**-------------------------------表格操作等------------------------------------------ */
        //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         this.currentPage = val;
     },
     //清除筛选器、排序
     resetDateFilter() {
        this.$refs['tableData'].clearFilter()
        this.$refs['tableData'].clearSort()
        this.$refs['tableData'].clearSelection()
      },
      //表单重置
      clearFilter(formName) {
        this.$refs[formName].resetFields()
      },
      //状态标签筛选器
      filterTag(value, row) {
        return row.outStatus === value;
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }

}
</script>

<style lang="less" scoped>
/**----------------表格--------------------- */
.innerForm {
    margin-bottom: 0%;
    background-color: antiquewhite;
    margin-top: 0%;
    height: 30px;
}

/*--------------------查询条件-----------*/
.textInput2 {
    width: 303px;
    align-items: center;
}
.el-row {
    display:flex;
    height: 35px;
    margin-bottom: 0px;
    margin-top: 0px;
    // background-color: black;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-form-item {
    // background-color: aquamarine;
    // padding: 0px;
//     text-align: justify;
//    text-align-last: justify;//文字对齐
}
.box-card {
    position: relative;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.textInput {
    width: 330px;
    margin-left: 0%;
}
.form {
    margin-left: 0%;
    top:0px;
    height: auto;
}
</style>