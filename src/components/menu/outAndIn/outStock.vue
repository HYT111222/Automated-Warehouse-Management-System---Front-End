<template>
    <div >
        <el-card class="box-card">
        <el-form :model="queryConditions" :rules="rules" ref="queryConditions" label-width="90px" class="form" :inline="true">
                    <el-form-item class="el-form-item">
                    <span slot="label" style="color: #403b3b">入库单状态:</span>
                    <el-radio-group v-model="queryConditions.outStatus" class="status-group" size="small">
                    <el-radio-button label="待审核" ></el-radio-button>
                    <el-radio-button label="待出库"></el-radio-button>
                    <el-radio-button label="已拒绝"></el-radio-button>
                    <el-radio-button label="已出库"></el-radio-button>
                    <el-radio-button label="全部状态"></el-radio-button>
                    </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="" class="textInput el-form-item">
                    <span slot="label"  style="color: #403b3b;">   出库人姓名:</span>
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
                    <el-button type="primary"  icon="el-icon-search"  round size="small">搜索</el-button>
                    <el-button type="info" plain icon="el-icon-refresh-right" round size="small">重置</el-button> 
        </div>
        
    </el-card>
    <el-card style="margin-top: 10px;">
            <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="addNew">新建出库单</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; margin-bottom: 10px;">批量删除</el-button>
            <el-tooltip class="item" effect="light" content="清除所有筛选条件以及排序" placement="top-start">
            <el-button type="primary" icon="el-icon-refresh-right" plain size="small" circle style="padding:5px;float: right;"></el-button>
            </el-tooltip>
            <!--表头等操作-->
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" @selection-change="handleSelectionChange" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' 
            :default-sort = "{prop: 'outID', order: 'increasing'}"
            >
            <!--排序、操作按钮、下拉详情tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
            <el-table-column
            type="selection"
            >
            </el-table-column>
            <el-table-column  prop="outID" sortable label="入库单号"  >
            </el-table-column>
            <el-table-column  prop="orderID" sortable label="订单号">
            </el-table-column>
            <el-table-column prop="outPeopleName" label="入库交接人" ></el-table-column>
            <el-table-column prop="outTime" sortable label="入库时间" >
            </el-table-column>
            <el-table-column prop="userName" sortable label="申请人" >
            </el-table-column>
            <!--状态待修改-->
            <el-table-column prop="outStatus" label="入库状态" 
            :filters="[{ text: '待出库', value: '待出库' }, { text: '已出库', value: '已出库' }
            , { text: '待审核', value: '待审核' }, { text: '已拒绝', value: '已拒绝' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
             <!--处理待修改-->
                <el-tooltip class="item" :disabled="scope.row.outStatus === '待入库' ? false : true" effect="light" 
                :content="scope.row.outStatus === '待入库' ? '点击修改状态' : '已成功入库'" placement="top-start">
                <el-button 
                plain
                round
                size="small"
                style="height: 30px;width: auto; padding: 4px;"
                @click="handleClick(scope.row)"
                :type="scope.row.outStatus === '待入库' ? 'warning' : 'success'"
                >{{scope.row.outStatus}}<i :class="scope.row.outStatus === '待入库' ? 'el-icon-edit' : ''"></i></el-button>
            </el-tooltip>
    
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
            <div style=" display: flex;">
                <el-button @click="handleClick(scope.row)" type="text" size="small" >查看/编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small" >删除</el-button>
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
 * 普通用户只能修改自己申请的订单，编辑已拒绝/待出库/待审批的订单内容，删除已拒绝的订单，能够查看所有订单
 * 普通用户：待出库——》已出库
 * 管理员：能查看所有订单，并且编辑已拒绝/待出库/待审批的订单内容，删除已拒绝/待出库的订单，
 * 修改所有订单的状态：待审核——>已拒绝/待入库，已拒绝/待入库——>已拒绝/待入库，待入库——>已入库
 */
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
            }else if (!/^[0-9]*$/.test(value)){
                return callback(new Error('只能由数字组成'))
            }
        }
        return{
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
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
                {
                    outID: "20230510192800",
                    orderID: "20230510192801",
                    outPeopleName: "王小利",
                    outStatus:'已入库',
                    outTime: "2023-05-10-19:58:01",
                    userName: "小李"
                },
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
    methods:{
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
        //清除筛选器
        resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      //状态标签筛选器
      filterTag(value, row) {
        return row.outStatus === value;
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
      //新建
      addNew(){
        this.$router.push({ path: '/addNewOut' })
      }
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