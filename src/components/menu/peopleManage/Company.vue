<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="customForm" ref="customForm" :rules="rules" label-width="120px" class="custom-form">
        <el-form-item prop="customId" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">客户编号:</span>
          <el-input v-model="customForm.customId" placeholder="请输入编号" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">客户用户名:</span>
          <el-input v-model="customForm.userName" placeholder="请输入用户名" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">客户联系电话:</span>
          <el-input v-model="customForm.phone" placeholder="请输入电话" size="small" clearable style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item prop="companyName" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">公司:</span>
          <el-input v-model="customForm.companyName" placeholder="请输入公司名称" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="" class="textInput el-form-item">
          <span slot="label"  style="color: #403b3b;">客户姓名:</span>
          <el-select  v-model="customForm.name" size="small" clearable placeholder="请选择" style="width: 220px;">
            <el-option
                v-for="item in customNameList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="address" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人地址:</span>
          <el-input v-model="customForm.address" placeholder="请输入地址" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item prop="email" label-position="left" class="custom-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
          <el-input v-model="customForm.email" placeholder="请输入邮箱" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <!-- 每一行后面的 button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary" :loading="Loading" @click="searchMag('customForm')" icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('customForm')">重置</el-button>
      </div>
    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="dialogVisible = true">新增客户</el-button>
      <!-- 新增客户相关 -->
      <el-dialog title="添加客户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <!-- 信息区域 -->
        <el-form :inline="true" :model="customFormNew" ref="customRef" :rules="rulesNew" label-width="120px" class="custom-form">
<!--          <el-form-item prop="inBoundPersId" label-position="left" class="input-el-form-item">-->
<!--            <span slot="label"  style="color: #403b3b">入库人编号:</span>-->
<!--            <el-input v-model="inputFormNew.inBoundPersonId" placeholder="请输入编号" size="small" clearable style="width: 165px;"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item prop="userName" label-position="left" class="custom-el-form-item">
            <span slot="label"  style="color: #403b3b">客户用户名:</span>
            <el-input v-model="customFormNew.userName" placeholder="请输入用户名" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label-position="left" class="custom-el-form-item">
            <span slot="label"  style="color: #403b3b">客户电话:</span>
            <el-input v-model="customFormNew.phone" placeholder="请输入电话" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="companyName" label-position="left" class="custom-el-form-item">
            <span slot="label"  style="color: #403b3b">客户公司名称:</span>
            <el-input v-model="customFormNew.name" placeholder="请输入公司名称" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="name" label-position="left" class="custom-el-form-item">
            <span slot="label"  style="color: #403b3b">客户真实姓名:</span>
            <el-input v-model="customFormNew.name" placeholder="请输入真实姓名" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="address" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">客户公司地址:</span>
            <el-input v-model="customFormNew.address" placeholder="请输入地址" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
          <el-form-item prop="email" label-position="left" class="input-el-form-item">
            <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
            <el-input v-model="customFormNew.email" placeholder="请输入邮箱" size="small" clearable style="width: 165px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="submitDialog('customFormNew')">确 定</el-button>
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
        <el-table-column prop="customId" label="客户编号"></el-table-column>
        <el-table-column prop="companyName" label="客户联系公司"></el-table-column>
        <el-table-column prop="payableAmount" label="客户应付款">
          <template slot-scope="scope">
            <div style=" display:initial">
              <div>
                <p>{{scope.row.payableAmount}}</p>
              </div>
              <div>
                <el-button @click="inc(scope.row)" type="text" style="flex: auto" size="small" >+应付</el-button>
                <!-- 增加客户应付款Dialog -->
                <el-dialog
                    title="增加客户应付款"
                    :visible.sync="dialogVisible_incAccounts"
                    width="30%"
                    :before-close="handleClose">
                  <el-form :inline="true" :model="incAccountsDia" ref="incAccountsDia" :rules="rulesInc" label-width="48px" class="custom-form">
                    <el-form-item prop="notes" label-position="left" class="input-el-form-item">
                      <el-input-number v-model="incAccountsDia.incAccounts" :precision="2" :step="0.1" size="medium" min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item prop="notes" label-position="left" class="input-el-form-item">
                      <span slot="label"  style="color: #403b3b">备注:</span>
                      <el-input v-model="incAccountsDia.notes" placeholder="请输入备注" size="small" clearable style="width: 154px;"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_incAccounts = false">取 消</el-button>
                    <el-button type="primary" @click="incAccounts('incAccountsDia')">确 定</el-button>
                  </span>
                </el-dialog>
                <el-button @click="bal(scope.row)" type="text" style="flex: auto" size="small" >-结款</el-button>
                <!-- 客户应付款结款 -->
                <el-dialog
                    title="客户应付款结款"
                    :visible.sync="dialogVisible_balAccounts"
                    width="30%"
                    :before-close="handleClose">
                  <el-form :inline="true" :model="balAccountsDia" ref="balAccountsDia" :rules="rulesBal" label-width="48px" class="custom-form">
                    <el-form-item prop="notes" label-position="left" class="input-el-form-item">
                      <el-input-number v-model="balAccountsDia.balAccounts" :precision="2" :step="0.1" size="medium" min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item prop="notes" label-position="left" class="input-el-form-item">
                      <span slot="label"  style="color: #403b3b">备注:</span>
                      <el-input v-model="balAccountsDia.notes" placeholder="请输入备注" size="small" clearable style="width: 154px;"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_balAccounts = false">取 消</el-button>
                    <el-button type="primary" @click="balAccounts('balAccountsDia')">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="contactPersonName" label="联系人姓名"></el-table-column>
        <el-table-column prop="phone" label="客户联系电话"></el-table-column>
        <el-table-column prop="address" label="客户地址"></el-table-column>
        <el-table-column prop="email" label="客户邮箱"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div style=" display: flex;">
              <el-button @click="checkDetail(scope.row)" type="text" style="flex: auto" size="small" >查看流水</el-button>
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
import peopleManger from "@/api/peopleManage";

export default {
  data() {
    // 输入框逻辑判定
    var customId = (rule, value, callback) => {
      var req = /^[A-Za-z0-9]*$/
      if (!value) {
        callback()
      } else if (!req.test(value)) {
        return callback(new Error('仅由数字和字母构成'))
      } else {
        return callback()
      }
    }
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
      // 上方查找返回
      customForm: {
        customId: 'sss',
        userName: '',
        // 应付款
        phone:'',
        companyName:'',
        name: '',
        address: '',
        email: '',
      },
      dialogVisible: false, // 添加用户对话框是否可见
      // 封装dialog提交的信息
      customFormNew: {
        // customerId: '',
        userName: '',
        phone: '',
        companyName:'',
        name: '',
        address: '',
        email: '',
        // remark: ''
      },
      num: 1, // 计数器初始值
      dialogVisible_incAccounts: false, // 增加客户应付款对话框
      incAccountsDia: {
        customId:'',
        incAccounts:'1',
        notes:''
      },
      dialogVisible_balAccounts: false, // 减少客户应付款对话框
      balAccountsDia:{
        customId:'',
        balAccounts:'1',
        notes:''
      },
      tableData: [
        // {
        //   customId: '111',
        //   companyName: '北京交通大学',
        //   payableAmount:'111.23',
        //   contactPersonName:'yyz',
        //   phone: '15302938395',
        //   address: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        //   remark:''
        // },
        // {
        //   customId: '112',
        //   companyName: '北京交通大学',
        //   payableAmount:'111.23',
        //   contactPersonName:'yyz',
        //   phone: '15302938395',
        //   address: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        //   remark:''
        // },
        // {
        //   customId: '113',
        //   companyName: '北京交通大学',
        //   payableAmount:'111.23',
        //   contactPersonName:'yyz',
        //   phone: '15302938395',
        //   address: '北京交通大学',
        //   email: '20301029@bjtu.edu.cn',
        //   remark:''
        // },
        // {
        //   customId: '114'
        // },
        // {
        //   customId: '115'
        // },
        // {
        //   customId: '116'
        // },
        // {
        //   customId: '117'
        // },
        // {
        //   customId: '118'
        // },
        // {
        //   customId: '119'
        // },
        // {
        //   customId: '120'
        // },
        // {
        //   customId: '121'
        // },
        // {
        //   customId: '122'
        // },
        // {
        //   customId: '123'
        // },
        // {
        //   customId: '124'
        // }
      ],
      customNameList: ["小李", "小猪"],
      rules: {
        customId: [{validator: customId, trigger: 'blur'}],
        userName:[],
        phone: [{validator: phone, trigger: 'blur'}],
        companyName:[],
        name:[],
        address:[],
        email: [{validator: email, trigger: 'blur'}]
      },
      rulesNew: {
        userName:[],
        phone: [{validator: phone, trigger: 'blur'}],
        companyName:[],
        name:[],
        address:[],
        email: [{validator: email, trigger: 'blur'}]
      },
      rulesInc: {
        customId: [],
        incAccounts:[],
        notes:[]
      },
      rulesBal: {
        customId:[],
        balAccounts:[],
        notes:[]
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
          peopleManger.addCustom(this.customFormNew).then(res => {
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
    // 保存客户id
    inc(row){
      this.dialogVisible_incAccounts = true
      incAccountsDia.customId = row.customId
    },
    // 该方法用于增加客户应付款
    incAccounts(formName){
      this.dialogVisible_incAccounts = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Loading = true
          peopleManger.incAccountsPayment(this.incAccountsDia).then(res => {
            if(res.data.status_code === true) {
              // 更新该行应付
              this.fetchNewTable()
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
    // 保存客户id
    bal(row){
      this.dialogVisible_balAccounts = true
      balAccountsDia.customId = row.customId
    },
    // 该方法用于客户结款
    balAccounts(formName){
      this.dialogVisible_balAccounts = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Loading = true
          peopleManger.balanceAccountsPayment(this.balAccountsDia).then(res => {
            if(res.data.status_code === true) {
              // 更新该行应付款
              this.fetchNewTable()
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
    // 该方法用于查看流水
    checkDetail(row){
      window.sessionStorage.setItem('transaction','true')
      window.sessionStorage.setItem('customId',row.customId)
      console.log("customId: " + row.customId)
      this.$router.push({path:'/transaction'})
    },
    // 该方法用于删除信息
    deleteOne(row){
      console.log("触发删除信息")
      var temp = []
      temp.push(row.customId)
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

