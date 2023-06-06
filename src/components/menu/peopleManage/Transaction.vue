<template>
  <div>
    <!-- 展示客户信息区 -->
    <el-card class="input-card">


    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
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
        <el-table-column prop="transactionId" label="交易id"></el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额"></el-table-column>
        <el-table-column prop="time" label="交易时间"></el-table-column>
        <el-table-column prop="contactName" label="客户联系姓名"></el-table-column>
        <el-table-column prop="phone" label="客户电话"></el-table-column>
        <el-table-column prop="bankName" label="开户行"></el-table-column>
        <el-table-column prop="bankCardNum" label="银行卡号"></el-table-column>
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <div style=" display: flex;">-->
<!--              <el-button @click="deleteOne(scope.row)" type="text" style="flex: auto" size="small" >删除</el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
    // var inBoundPersonId = (rule, value, callback) => {
    //   var req = /^[A-Za-z0-9]*$/
    //   if (!value) {
    //     callback()
    //   } else if (!req.test(value)) {
    //     return callback(new Error('仅由数字和字母构成'))
    //   }
    // }
    // var phone = (rule, value, callback) => {
    //   const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    //   if (!value) {
    //     callback()
    //   } else if (!reg.test(value)) {
    //     return callback(new Error('请输入手机号码'))
    //   }
    // }
    // var email = (rule, value, callback) => {
    //   const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    //   if (!value) {
    //     callback()
    //   } else if (!reg.test(value)) {
    //     return callback(new Error('请输入正确邮箱,例如10203022@bjtu.edu.cn'))
    //   }
    // }

    return {
      Loading: false, // 加载中动画
      // inputForm: {
      //   inBoundPersonId: '',
      //   userName: '',
      //   phone: '',
      //   name: '',
      //   address: '',
      //   email: ''
      // },
      // dialogVisible: false, // 对话框是否可见
      // // 封装dialog提交的信息
      // inputFormNew: {
      //   inBoundPersonId: '',
      //   userName: '',
      //   phone: '',
      //   name: '',
      //   address: '',
      //   email: '',
      //   remark: ''
      // },
      tableData: [
        {
          transactionId: '111',
          transactionAmount: '123',
          time: '2023-09-11-12-08-09',
          contactName:'yyz',
          phone: '15302938395',
          bankName: '招商银行',
          bankCardNum:'111001001101001010'
        },
        {
          transactionId: '111',
          transactionAmount: '123',
          time: '2023-09-11-12-08-09',
          contactName:'yyz',
          phone: '15302938395',
          bankName: '招商银行',
          bankCardNum:'111001001101001010'
        },
        {
          transactionId: '111',
          transactionAmount: '123',
          time: '2023-09-11-12-08-09',
          contactName:'yyz',
          phone: '15302938395',
          bankName: '招商银行',
          bankCardNum:'111001001101001010'
        },
        {
          transactionId: '114'
        },
        {
          transactionId: '115'
        },
        {
          transactionId: '116'
        },
        {
          transactionId: '117'
        },
        {
          transactionId: '118'
        },
        {
          transactionId: '119'
        },
        {
          transactionId: '120'
        },
        {
          transactionId: '121'
        },
        {
          transactionId: '122'
        },
        {
          transactionId: '123'
        },
        {
          transactionId: '124'
        }
      ],
      // inPeopleNameList: ["小李", "小猪"],
      // rules: {
      //   inBoundPersonId: [{validator: inBoundPersonId, trigger: 'blur'}],
      //   phone: [{validator: phone, trigger: 'blur'}],
      //   email: [{validator: email, trigger: 'blur'}]
      // },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    }
  },
  created() {
    this.fetchNewTable()
    // this.getPeopleList()
  },
  methods: {
    // 该方法用于刷新表格
    fetchNewTable() {
      peopleManger.checkCustomTransaction().then(res => {
        if (res.data.status_code === true) {
          this.tableData = res.data.transactionList
        }
      })
    },
    // 该方法用于获取入库人列表
    // getPeopleList(){
    //   outAndIn.fetchInPeopleNameList().then(res =>{
    //     if (res.data.status_code === true) {
    //       this.inPeopleNameList = res.data.inPeopleNameList
    //     }
    //   })
    // },
    // 该方法用于搜索
    // searchMag(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.Loading = true
    //       peopleManger.checkInBoundPeorsonInformation(this.inputForm).then(res => {
    //         if (res.data.status_code === true) {
    //           this.tableData = res.data.inBoundPeopleList
    //         } else {
    //           this.$message({
    //             message: "搜索异常",
    //             type: "error"
    //           })
    //         }
    //       }).finally(res => {
    //         this.Loading = false
    //       })
    //     }
    //   })
    // },
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
    // submitDialog(formName){
    //   this.dialogVisible = false
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.Loading = true
    //       peopleManger.addInBoundPeople(this.inputFormNew).then(res => {
    //         if(res.data.status_code === true) {
    //           this.fetchNewTable()
    //           this.getPeopleList()
    //         }else{
    //           this.$message({
    //             message:"提交异常",
    //             type:"error"
    //           })
    //         }
    //       }).finally(res => {
    //         this.Loading = false
    //       })
    //     }
    //   })
    // },
    // 关闭对话框
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {
    //       });
    // },
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
  //   deleteOne(row){
  //     console.log("触发删除信息，id: " +row.inBoundPersonId)
  //     var temp = []
  //     temp.push(row.inBoundPersonId)
  //     peopleManger.delFetchInPeopleInformation(temp).then(res=>{
  //       if(res.data.status_code ==true){
  //         this.fetchNewTable()
  //         this.getPeopleList()
  //         this.$message({
  //           message:"删除成功",
  //           type:"success"
  //         })
  //       }else{
  //         this.$message({
  //           message:"删除异常",
  //           type:"error"
  //         })
  //       }
  //     })
  //   }
  }
}
</script>

<style lang="less" scoped>

</style>
