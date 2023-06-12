<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="staff-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="staffForm" ref="staffForm" :rules="rules" label-width="120px" class="staff-form">
        <el-form-item prop="userName" label-position="left" class="staff-el-form-item">
          <span slot="label"  style="color: #403b3b">员工用户名:</span>
          <el-input v-model="staffForm.userName" placeholder="请输入用户名" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="name" class="textStaff el-form-item">
          <span slot="label"  style="color: #403b3b;">   员工姓名:</span>
          <el-select  v-model="staffForm.name" size="small" clearable placeholder="请选择" style="width: 220px;">
            <el-option
                v-for="item in staffNameList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="warehouseId" label-position="left" class="staff-el-form-item">
          <span slot="label"  style="color: #403b3b">仓库id:</span>
          <el-input v-model="staffForm.warehouseId" placeholder="请输入仓库id" size="small" clearable style="width:220px;"></el-input>
        </el-form-item>
<!--        <el-form-item prop="warehouseName" label-position="left" class="staff-el-form-item">-->
<!--          <span slot="label"  style="color: #403b3b">仓库名称:</span>-->
<!--          <el-input v-model="staffForm.warehouseName" placeholder="请输入仓库姓名" size="small" clearable style="width:220px;"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item prop="phone" label-position="left" class="staff-el-form-item">
          <span slot="label"  style="color: #403b3b">员工电话:</span>
          <el-input v-model="staffForm.phone" placeholder="请输入电话" size="small" clearable style="width:220px;"></el-input>
        </el-form-item>
        <!--        <el-form-item prop="name" label-position="left" class="input-el-form-item">-->
        <!--          <span slot="label"  style="color: #403b3b">入库人姓名:</span>-->
        <!--          <el-input v-model="inputForm.name" placeholder="请输入姓名" size="small" clearable style="width: 220px;"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item prop="transferStation" label-position="left" class="output-el-form-item">
          <span slot="label"  style="color: #403b3b">所属中转站:</span>
          <el-input v-model="staffForm.transferStation" placeholder="请输入所属中转站" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="email" label-position="left" class="output-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
          <el-input v-model="staffForm.email" placeholder="请输入邮箱" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <!-- 每一行后面的 button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary" :loading="Loading" @click="searchMag('staffForm')" icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('staffForm')">重置</el-button>
      </div>
    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
<!--      <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="dialogVisible = true">新增出库人</el-button>-->
      <!-- 新增入库人相关 -->
<!--      <el-dialog title="添加入库人" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">-->
<!--        &lt;!&ndash; 信息区域 &ndash;&gt;-->
<!--        <el-form :inline="true" :model="outputFormNew" ref="outputRef" :rules="rules" label-width="120px" class="output-form">-->
<!--          <el-form-item prop="outBoundPersonId" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人编号:</span>-->
<!--            <el-input v-model="outputFormNew.outBoundPersonId" placeholder="请输入编号" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="userName" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人用户名:</span>-->
<!--            <el-input v-model="outputFormNew.userName" placeholder="请输入用户名" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="phone" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人电话:</span>-->
<!--            <el-input v-model="outputFormNew.phone" placeholder="请输入电话" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="name" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人真实姓名:</span>-->
<!--            <el-input v-model="outputFormNew.name" placeholder="请输入姓名" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="address" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人地址:</span>-->
<!--            <el-input v-model="outputFormNew.address" placeholder="请输入地址" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="email" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">出库人邮箱:</span>-->
<!--            <el-input v-model="outputFormNew.email" placeholder="请输入邮箱" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="email" label-position="left" class="output-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">备注:</span>-->
<!--            <el-input v-model="outputFormNew.remark" placeholder="" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <span slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogVisible = false" >取 消</el-button>-->
<!--          <el-button type="primary" @click="submitDialog('outputFormNew')">确 定</el-button>-->
<!--        </span>-->
<!--      </el-dialog>-->

      <!-- 表相关 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%"
                :header-row-style="{height:'30px'}"
                :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
                size='small'
                :default-sort = "{prop: 'inBoundPersonId', order: 'increasing'}"
      >
        <!-- 表头相关 -->
<!--        <el-table-column type="selection"></el-table-column>-->
        <el-table-column prop="userName" label="员工用户名"></el-table-column>
        <el-table-column prop="name" label="员工真实姓名"></el-table-column>
        <el-table-column prop="warehouseId" label="员工所属仓库id"></el-table-column>
<!--        <el-table-column prop="warehouseName" label="员工所属仓库名字"></el-table-column>-->
        <el-table-column prop="phone" label="员工电话号码"></el-table-column>
        <el-table-column prop="transferStation" label="员工所属中转站地址"></el-table-column>
        <el-table-column prop="email" label="员工邮箱"></el-table-column>
<!--        <el-table-column prop="remark" label="备注"></el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <div v-if="isManager" style=" display: flex;">
                <el-button @click="deleteOne(scope.row)" type="text" style="flex: auto" size="small" >删除</el-button>
              </div>
              <div v-else style=" display: flex;">
                <el-button @click="deleteOne(scope.row)" type="text" disabled style="flex: auto" size="small" >删除</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页转跳按钮相关  -->
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
import peopleManger from "@/api/peopleManage";
import outAndIn from "@/api/outAndIn";

export default {
  data() {
    // 输入框逻辑判定
    var phone = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!value) {
        callback()
      } else if (!reg.test(value)) {
        return callback(new Error('请输入手机号码'))
      } else {
        return callback()
      }
    }
    var email = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback()
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确邮箱,例如10203022@bjtu.edu.cn'))
      } else {
        return callback()
      }
    }

    return {
      Loading: false, // 加载中动画
      staffForm: {
        userName: '',
        name: '',
        warehouseId: '',
        // warehouseName: '',
        phone: '',
        transferStation:'',
        email: ''
      },
      // dialogVisible: false, // 对话框是否可见
      // 封装dialog提交的信息
      /*
      staffFormNew: {
        userName: '',
        name: '',
        warehouseId:'',
        phone: '',
        transferStation:'',
        email: '',
        remark: '',
      },*/
      tableData: [
        // {
        //   userName: '顺丰快递员1',
        //   name: 'yyz',
        //   warehouseId:'1',
        //   // warehouseName: '北京交通大学',
        //   phone: '15302938395',
        //   transferStation: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        // },
        // {
        //   userName: '顺丰快递员2',
        //   name: 'yyz',
        //   warehouseId:'1',
        //   // warehouseName: '北京交通大学',
        //   phone: '15302938395',
        //   transferStation: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        // },
        // {
        //   userName: '顺丰快递员3',
        //   name: 'yyz',
        //   warehouseId:'1',
        //   // warehouseName: '北京交通大学'
        //   phone: '15302938395',
        //   transferStation: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // },
        // {
        //   userName: '顺丰快递员3'
        // }
      ],
      staffNameList: ["小李", "小猪"],
      rules: {
        userName: [],
        name: [],
        warehouseId:[],
        phone: [{validator: phone, trigger: 'blur'}],
        transferStation: [],
        email: [{validator: email, trigger: 'blur'}]
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      isManager:false// 权限控制
    }
  },
  created() {
    this.fetchNewTable()
    this.getPeopleList()
    // 权限管理
    if (window.sessionStorage.getItem('authority') == "manager"){
      this.isManager=true
    }else{
      this.isManager=false
    }
  },
  methods: {
    // 该方法用于刷新表格
    fetchNewTable() {
      peopleManger.getStaffInformationAll().then(res => {
        console.log("刷新表格")
        if (res.data.status_code === true) {
          this.tableData = res.data.staffList
        }
      })
    },
    // 该方法用于获取员工列表
    getPeopleList(){
      peopleManger.getStaffNameList().then(res =>{
        console.log("刷新员工列表")
        if (res.data.status_code === true) {
          console.log("断点1")
          this.staffNameList = res.data.staffNameList
        }
      })
    },
    // 该方法用于搜索
    searchMag(formName) {
      console.log("开始搜索")
      this.$refs[formName].validate((valid) => {
        console.log("通过搜索表单验证")
        if (valid) {
          this.Loading = true
          peopleManger.checkStaffInformation(this.staffForm).then(res => {
            if (res.data.status_code === true) {
              this.tableData = res.data.staffList
            } else {
              this.$message({
                message: "搜索异常",
                type: "error"
              })
            }
          }).finally(res => {
            this.Loading = false
          })
        } else {
          console.log("没有通过搜索表单验证")
        }
      })
      console.log("搜索完毕")
    },
    // 该方法用于清除填入的信息
    clearFilter(formName) {
      this.$refs[formName].resetFields();
    },
    //清除筛选器等
    resetDateFilter() {
      this.$refs['tableData'].clearFilter()
      this.$refs['tableData'].clearSort()
      this.$refs['tableData'].clearSelection();
    },
    // 提交dialog信息
    /*
    submitDialog(formName){
      this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Loading = true
          peopleManger.addFetchOutPeople(this.outputFormNew).then(res => {
            if(res.data.status_code === true) {
              this.fetchNewTable()
              this.getPeopleList()
            }else{
              this.$message({
                message:"提交异常",
                type:"error"
              })
            }
          }).finally(res => {
            this.Loading = false
          })
        }
      })
    },
    */
    // 关闭对话框
    /*
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
     */
    // 该方法在每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    // 该方法在当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 该方法用于删除信息
    deleteOne(row){
      console.log("触发删除信息")
      // var temp = []
      // temp.push(row.userName)
      peopleManger.delStaffInformation(row.userName).then(res =>{
        if(res.data.status_code === true){
          this.fetchNewTable()
          this.getPeopleList()
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
      console.log("删除完毕")
    }
  }
}
</script>

<style lang="less" scoped>
// 输入区 卡片
.staff-card{

}

// 输入区 表单
.staff-form{

}

// 输入区 span
.output-span{
  font-size: 20px;
}

</style>
