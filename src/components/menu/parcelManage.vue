<template>
    <div>
        <el-card class="box-card">
        <el-form :model="parcelConditions" :rules="rules" ref="parcelConditions" label-width="90px" class="form" :inline="true">
                    <el-form-item class="el-form-item">
                    <span slot="label" style="color: #403b3b">包裹状态:</span>
                    <el-radio-group v-model="parcelConditions.parcelState" class="status-group" size="small">
                    <el-radio-button label="待入库" ></el-radio-button>
                    <el-radio-button label="已入库"></el-radio-button>
                    <el-radio-button label="待审核"></el-radio-button>
                    <el-radio-button label="已拒绝"></el-radio-button>
                    <el-radio-button label="待出库"></el-radio-button>
                    </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="" class="textInput el-form-item">
                    <span slot="label"  style="color: #403b3b;">   库区名称:</span>
                    <el-select  v-model="parcelConditions.regionName" size="small" clearable placeholder="请选择" style="width: 150px;h">
                        <el-option label="北京" value="北京"></el-option>
                        <el-option label="上海" value="上海"></el-option>
                        <el-option label="广东" value="广东"></el-option>
                        <el-option label="天津" value="天津"></el-option>
                        <el-option label="重庆" value="重庆"></el-option>
                        <el-option label="河北" value="河北"></el-option>
                        <el-option label="山西" value="山西"></el-option>
                        <el-option label="陕西" value="陕西"></el-option>
                        <el-option label="山东" value="山东"></el-option>
                        <el-option label="河南" value="河南"></el-option>
                        <el-option label="辽宁" value="辽宁"></el-option>
                        <el-option label="吉林" value="吉林"></el-option>
                        <el-option label="黑龙江" value="黑龙江"></el-option>
                        <el-option label="江苏" value="江苏"></el-option>
                        <el-option label="浙江" value="浙江"></el-option>
                        <el-option label="安徽" value="安徽"></el-option>
                        <el-option label="江西" value="江西"></el-option>
                        <el-option label="福建" value="福建"></el-option>
                        <el-option label="湖北" value="19"></el-option>
                        <el-option label="湖南" value="20"></el-option>
                        <el-option label="四川" value="21"></el-option>
                        <el-option label="贵州" value="22"></el-option>
                        <el-option label="云南" value="23"></el-option>
                        <el-option label="海南" value="24"></el-option>
                        <el-option label="甘肃" value="25"></el-option>
                        <el-option label="内蒙古" value="26"></el-option>
                        <el-option label="青海" value="27"></el-option>
                        <el-option label="新疆" value="28"></el-option>
                        <el-option label="西藏" value="29"></el-option>
                        <el-option label="广西" value="30"></el-option>
                        <el-option label="宁夏" value="31"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item  prop="parcelId" class="textInput2 ">
                    <span slot="label"  style="color: #403b3b; ">包裹号:</span>
                    <el-input placeholder="只能由数字组成" size="small" v-model="parcelConditions.parcelId" clearable></el-input>
                    </el-form-item>
                    <el-form-item  prop="shelfID" class="textInput ">
                    <span slot="label"  style="color: #403b3b">货架号:</span>
                    <el-input placeholder="输入包裹所在货架编号" size="small" v-model="parcelConditions.shelfID" clearable style="width: 220px;"></el-input>
                    </el-form-item>         
        </el-form>
        <div style="display: flex;float: right;margin-bottom:10px;">
            <el-button type="primary" :loading="Loading" @click="searchPackage()" icon="el-icon-search"  round size="small">搜索</el-button>
            <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('parcelConditions')">重置</el-button> 
        </div>
      </el-card>

      <el-card style="margin-top: 10px;">
            <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; margin-bottom: 10px;">删除</el-button>
            <!--表头等操作-->
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" @selection-change="handleSelectionChange" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' >
            
            <el-table-column  prop="parcelId"  label="包裹号"  >
            </el-table-column>
            <el-table-column  prop="shipperName"  label="发货人姓名"  >
            </el-table-column>
            <el-table-column  prop="shipperPhone"  label="发货人电话">
            </el-table-column>
            <el-table-column prop="shipperAddress" label="发货人地址" ></el-table-column>
            <el-table-column prop="consigneeName"  label="收货人姓名" >
            </el-table-column>
            <el-table-column prop="consigneePhone"  label="收货人电话" >
            </el-table-column>
            <el-table-column prop="consigneeAddress" label="收货人地址" >
        </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
            <div style=" display: flex;">
                <el-button @click="view(scope.row)"   type="text" size="small" >查看详情  </el-button>
                    <el-dialog title="包裹详细信息" :visible.sync="dialogTableVisible">
                        <el-descriptions>
                        <el-descriptions-item label="包裹号">{{parcelinformation.parcelId}}</el-descriptions-item>
                        <el-descriptions-item label="入库时间">{{parcelinformation.inTime}}</el-descriptions-item>
                        <el-descriptions-item label="出库时间">{{parcelinformation.outTime}}</el-descriptions-item>
                        <el-descriptions-item label="所在货架编号">{{parcelinformation.shelfId}}</el-descriptions-item>
                        <el-descriptions-item label="所在货架位置">{{parcelinformation.shelfNumber}}</el-descriptions-item>
                        <el-descriptions-item label="包裹状态">{{parcelinformation.parcelState}}</el-descriptions-item>
                    </el-descriptions>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                    </div>
                    </el-dialog>
                <el-button @click="deleteOne(scope.row)" type="text" size="small" > 删除</el-button>
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
  import parcel from '@/api/parcel.js'
  //判断待删除的包裹的状态
  function judgeState(thing){
        if (thing.parcelState != "待入库"){
                return false
             }
        return true
}
  export default{
    data(){
        var parcelId = (rule, value, callback) => {
            if (!value) {
                callback()
            } else if(!/^[0-9]*$/.test(value)){
                return callback(new Error('只能由数字组成'))
            }
        }
        var shelfID = (rule, value, callback) => {
            if (!value) {
                callback()
            }else if (!/^[0-9]*$/.test(value)){
                return callback(new Error('只能由数字组成'))
            }
        }
    return{
        dialogTableVisible: false,
        Loading:false,
        parcelinformation:{
            parcelId:'78913347',
            inTime:'2023-5-28',
            outTime:'',
            shelfId:'23',
            shelfNumber:'789',
            parcelState:'未出库'
        },
        formLabelWidth:'120px',
        
        parcelConditions:{
            parcelId:'',
            parcelState:'',
            shelfID:'',
            regionName:''
        },
        tableData:[
                {   
                    parcelId:"001",
                    shipperName: "美女",
                    shipperPhone: "13100009999",
                    shipperAddress: "北京海淀区北京交通大学",
                    consigneeName:'卖西瓜的凶老板',
                    consigneePhone: "13399999999",
                    consigneeAddress: "辽宁本溪明山区xx街"
                }
            ],
            rules:{
                parcelId:[{validator: parcelId, trigger: 'blur'}],
                shelfID:[{validator: shelfID, trigger: 'blur'}],
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
     fetchNewTable(){
            parcel.allParcel().then(res=>{
                console.log(res)
                if (res.data.status_code == true){
                    this.tableData = res.data.parcelInformation
                }
            })
      },
     //查询
     searchPackage(){
                console.log(this.parcelConditions)
                this.Loading = true
                parcel.searchParcel(this.parcelConditions).then(res=>{
                    console.log(res)
                    if(res.data.status_code == true){
                        console.log('成功')
                        this.tableData = res.data.parcelInformation
                        console.log('断点一')
                    }else {
                        this.$message({
                            message:"查询异常",
                            type:"error"
                        })
                    }
                }).finally(res=>{
                    console.log('断点二')
                    this.Loading =false
                })
      },
    //显示包裹详细信息
    view(row){ 
        this.dialogTableVisible = true
        console.log(row.parcelId)
        parcel.searchParcelDetail(row.parcelId).then(res=>{
                   this.parcelinformation.parcelId = res.data.parcelId
                   this.parcelinformation.inTime = res.data.inTime
                   this.parcelinformation.outTime = res.data.outTime
                   this.parcelinformation.shelfId = res.data.shelfId
                   this.parcelinformation.shelfNumber = res.data.shelfNumber
                   this.parcelinformation.parcelState = res.data.parcelState
                    this.$message({
                        message:"查看成功",
                        type:"success"
                    })
            })
       
    },

     //删除包裹
     deleteOne(row){
        if (judgeState(row) == true){
            parcel.deleteParcel(row.parcelId).then(res=>{
                if(res.data.status_code ==true){
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
                message:"只能删除未入库的包裹",
                type:"error"
            })
        }
      },
    clearFilter(formName) {   //清空表单
        this.$refs[formName].resetFields()
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
        //清除筛选器
        resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      //状态标签筛选器
      filterTag(value, row) {
        return row.inStatus === value;
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
      
    }

  }
  </script>
  
<style lang="less" scoped>

.box-card {
    position: relative;
}
.form {
    margin-left: 0%;
    top:0px;
    height: auto;
}

.textInput2 {
    width: 303px;
    align-items: center;
}
.textInput {
    width: 330px;
    margin-left: 0%;
}


  </style>