<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="inputForm" ref="inputRef" :rules="rules" label-width="100px" class="input-form">

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
          <el-input v-model="inputForm.phone" placeholder="请输入电话" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>

        <el-form-item prop="name" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人姓名:</span>
          <el-input v-model="inputForm.name" placeholder="请输入姓名" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>

        <el-form-item prop="address" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人地址:</span>
          <el-input v-model="inputForm.address" placeholder="请输入地址" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>

        <el-form-item prop="email" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">入库人邮箱:</span>
          <el-input v-model="inputForm.email" placeholder="请输入邮箱" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <!-- button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary"  icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small">重置</el-button>
      </div>
    </el-card>
    <br>
    <!-- 查询结果区 -->
    <el-card class="output-card">

    </el-card>

  </div>
</template>

<script>
export default{
  data() {
    // 输入框逻辑判定
    var inBoundPersonId = (rule, value, callback) => {
      var req = /^[A-Za-z0-9]*$/
      if (!value) {
        callback()
      } else if(!req.test(value)){
        return callback(new Error('仅由数字和字母构成'))
      }
    }
    var phone = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!value) {
        callback()
      } else if(!reg.test(value)){
        return callback(new Error('请输入手机号码'))
      }
    }
    var email = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback()
      } else if(!reg.test(value)){
        return callback(new Error('请输入正确邮箱,例如10203022@bjtu.edu.cn'))
      }
    }

    return {
      inputForm: {
        inBoundPersonId:'',
        userName:'',
        phone:'',
        name:'',
        address:'',
        email:''
      },
      rules:{
        inBoundPersonId:[{validator: inBoundPersonId, trigger: 'blur'}],
        phone:[{validator: phone, trigger: 'blur'}],
        email:[{validator: email, trigger: 'blur'}]
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    }
  },
  methods:{
    // 该方法用于提交表单中的信息
    onsubmit(){
      console.log('Enter submit!')
    },
    // 该方法用于清除填入的信息
    clean(){

    }

  }

}
</script>

<style lang="less" scoped>
.input-card{

}

.input-form{

}

.input-span{
  font-size: 20px;
}

.output-card{

}
</style>
