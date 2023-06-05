<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="customForm" ref="inputForm" :rules="rules" label-width="120px" class="input-form">
        <el-form-item prop="inBoundPersonId" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人编号:</span>
          <el-input v-model="inputForm.inBoundPersonId" placeholder="请输入编号" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人用户名:</span>
          <el-input v-model="inputForm.userName" placeholder="请输入用户名" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人电话:</span>
          <el-input v-model="inputForm.phone" placeholder="请输入电话" size="small" clearable style="width:220px;"></el-input>
        </el-form-item>
        <!--        <el-form-item prop="name" label-position="left" class="input-el-form-item">-->
        <!--          <span slot="label"  style="color: #403b3b">入库人姓名:</span>-->
        <!--          <el-input v-model="inputForm.name" placeholder="请输入姓名" size="small" clearable style="width: 220px;"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item prop="" class="textInput el-form-item">
          <span slot="label"  style="color: #403b3b;">   入库人姓名:</span>
          <el-select  v-model="inputForm.name" size="small" clearable placeholder="请选择" style="width: 220px;">
            <el-option
                v-for="item in inPeopleNameList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="address" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人地址:</span>
          <el-input v-model="inputForm.address" placeholder="请输入地址" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="email" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
          <el-input v-model="inputForm.email" placeholder="请输入邮箱" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <!-- 每一行后面的 button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary" :loading="Loading" @click="searchMag('inputForm')" icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('inputForm')">重置</el-button>
      </div>
    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="dialogVisible = true">新增入库人</el-button>
      <!-- 新增入库人相关 -->
      <el-dialog title="添加入库人" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <!-- 信息区域 -->
        <el-form :inline="true" :model="inputFormNew" ref="inputRef" :rules="rules" label-width="120px" class="input-form">
          <el-form-item prop="inBoundPersonId" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人编号:</span>
            <el-input v-model="inputFormNew.inBoundPersonId" placeholder="请输入编号" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="userName" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人用户名:</span>
            <el-input v-model="inputFormNew.userName" placeholder="请输入用户名" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人电话:</span>
            <el-input v-model="inputFormNew.phone" placeholder="请输入电话" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="name" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人真实姓名:</span>
            <el-input v-model="inputFormNew.name" placeholder="请输入姓名" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="address" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人地址:</span>
            <el-input v-model="inputFormNew.address" placeholder="请输入地址" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="email" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
            <el-input v-model="inputFormNew.email" placeholder="请输入邮箱" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="email" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">备注:</span>
            <el-input v-model="inputFormNew.remark" placeholder="" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="submitDialog('inputFormNew')">确 定</el-button>
        </span>
      </el-dialog>

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
        <el-table-column prop="inBoundPersonId" label="入库人编号"></el-table-column>
        <el-table-column prop="userName" label="入库人用户名"></el-table-column>
        <el-table-column prop="name" label="入库人真实姓名"></el-table-column>
        <el-table-column prop="phone" label="入库人电话号码"></el-table-column>
        <el-table-column prop="address" label="入库人地址"></el-table-column>
        <el-table-column prop="email" label="入库人邮箱"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div style=" display: flex;">
              <el-button @click="deleteOne(scope.row)" type="text" style="flex: auto" size="small" >删除</el-button>
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
import peopleManger from "@/api/peopleManger";
import outAndIn from "@/api/outAndIn";

export default {
  data() {
    // 输入框逻辑判定
    var customerId = (rule, value, callback) => {
      var req = /^[A-Za-z0-9]*$/
      if (!value) {
        callback()
      } else if (!req.test(value)) {
        return callback(new Error('仅由数字和字母构成'))
      }
    }
    var phone = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!value) {
        callback()
      } else if (!reg.test(value)) {
        return callback(new Error('请输入手机号码'))
      }
    }
    var email = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback()
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确邮箱,例如10203022@bjtu.edu.cn'))
      }
    }

    return {
      Loading: false, // 加载中动画
      customForm: {
        customerId: '',
        userName: '',
        phone:'',
        companyName:'',
        name: '',
        address: '',
        email: ''
      },
      dialogVisible: false, // 对话框是否可见
      // 封装dialog提交的信息
      customerFormNew: {
        // customerId: '',
        userName: '',
        phone: '',
        companyName:'',
        name: '',
        address: '',
        email: '',
        // remark: ''
      },
      tableData: [
        {
          customId: '111',
          companyName: '顺丰快递员1',
          payableAmount:'',
          contactPersonName:'yyz',
          phone: '15302938395',
          address: '北京交通大学',
          email: '20301029@bjtu.edu.cn',
          remark: '开发测试'
        },
        {
          customId: '111',
          companyName: '顺丰快递员1',
          payableAmount:'',
          contactPersonName:'yyz',
          phone: '15302938395',
          address: '北京交通大学',
          email: '20301029@bjtu.edu.cn',
          remark: '开发测试'
        },
        {
          customId: '111',
          companyName: '顺丰快递员1',
          payableAmount:'',
          contactPersonName:'yyz',
          phone: '15302938395',
          address: '北京交通大学',
          email: '20301029@bjtu.edu.cn',
          remark: '开发测试'
        },
        {
          customId: '114'
        },
        {
          customId: '115'
        },
        {
          customId: '116'
        },
        {
          customId: '117'
        },
        {
          customId: '118'
        },
        {
          customId: '119'
        },
        {
          customId: '120'
        },
        {
          customId: '121'
        },
        {
          customId: '122'
        },
        {
          customId: '123'
        },
        {
          customId: '124'
        }
      ],
      customNameList: ["小李", "小猪"],
      rules: {
        customId: [{validator: customId, trigger: 'blur'}],
        phone: [{validator: phone, trigger: 'blur'}],
        email: [{validator: email, trigger: 'blur'}]
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    }
  },
  created() {
    this.fetchNewTable()
    this.getPeopleList()
  },
  methods: {
    // 该方法用于刷新表格
    fetchNewTable() {
      peopleManger.getCustomInformationAll().then(res => {
        if (res.data.status_code === true) {
          this.tableData = res.data.customList
        }
      })
    },
    // 该方法用于获取客户列表
    getPeopleList(){
      peopleManger.getCustomNameList().then(res =>{
        if (res.data.status_code === true) {
          this.customNameList = res.data.customNameList
        }
      })
    },
    // 该方法用于搜索
    searchMag(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Loading = true
          peopleManger.checkCustomInformation(this.customForm).then(res => {
            if (res.data.status_code === true) {
              this.tableData = res.data.customList
            } else {
              this.$message({
                message: "搜索异常",
                type: "error"
              })
            }
          }).finally(res => {
            this.Loading = false
          })
        }
      })
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
    submitDialog(formName){
      this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Loading = true
          peopleManger.addCustom(this.staffFormNew).then(res => {
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
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
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
      console.log("触发删除信息，id: ")
      var temp = []
      temp.push(row.customId)
      temp.push(row.userName)
      peopleManger.delCustomInformation(temp).then(res=>{
        if(res.data.status_code ==true){
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
    }
  }
}
</script>

<style lang="less" scoped>
// 输入区 卡片
.input-card{

}

// 输入区 表单
.input-form{

}

// 输入区 span
.input-span{
  font-size: 20px;
}

</style>

