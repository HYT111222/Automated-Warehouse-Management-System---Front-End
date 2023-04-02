<template>
    <div class="login_container">
      <div class="login">
        <div class="login-form">
          <h2>登录</h2>
          <!--model数据对象，rules整体表单验证规则，ref用来引用整体表单，prop整体规则中的单项规则-->
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input prefix-icon="el-icon-user" placeholder="请填写用户名" maxlength="32" v-model="loginForm.username" ></el-input>
            </el-form-item>
  
            <el-form-item label="密码" prop="password"  v-show="!isCode">
              <el-input prefix-icon="el-icon-lock" placeholder="请填写 6-18 位密码" type="password" maxlength="18" v-model="loginForm.password" show-password></el-input>
            </el-form-item>
  
            <el-form-item class="btn-r" label-width="0px">
              <el-button type="primary" icon="el-icon-s-promotion" :loading="loading" @click="submitForm('loginForm')">登 录</el-button>
            </el-form-item>
  
            <el-form-item class="btn-l" label-width="0px">
              <router-link to="/register">
              <el-button type="success" icon="el-icon-back">注 册</el-button></router-link>
            </el-form-item>
  
          </el-form>
        </div>
        <!--初始化仓库-->
        <el-dialog @close="clearForm('initStock')" title="仓库初始化设置" :visible.sync="initVisible" width="40%" class="initDialog">
          <el-form :model="initStock" ref="initStock"  label-width="100px">

             <el-form-item label="仓库宽度：" >
              <el-input-number v-model="initStock.capacity_x" controls-position="right" @change="handleChange" :min="20" :max="10000"></el-input-number>
            </el-form-item>

            <el-form-item label="仓库长度：">
              <el-input-number v-model="initStock.capacity_y" controls-position="right" @change="handleChange" :min="20" :max="10000"></el-input-number>
            </el-form-item>

            <el-form-item label="Avg数量：" >
              <el-input-number v-model="initStock.avg" controls-position="right" @change="handleChange" :min="2" :max="200"></el-input-number>
            </el-form-item>

            <el-form-item label="闸机数量：" >
              <el-input-number v-model="initStock.gateMachine" controls-position="right" @change="handleChange" :min="1" :max="40"></el-input-number>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loading" @click="intoHome('initStock')">开始使用</el-button>
          </div>

        </el-dialog>
      </div>
    </div>
    </template>
  
  <script>
  import common from '@/api/common'
  import user from '@/api/user'
  
  export default {
    data () {
      var username = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }

      var password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-18个字符，只能包含数字、大小写字母'))
        } else {
          callback()
        }
      }

      return {
        isCode: false,
        loading: false,//加载效果
        loginForm: {
          username: '',
          password: ''
        },
        //初始化仓库
        initVisible: false,
        initStock: {
          capacity_x: 100,
          capacity_y: 100,
          avg: 10,
          gateMachine: 5
        },
        rules: {
          username: [
            { validator: username, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 清空表单
      clearForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 登录
      submitForm (formName) {
        if(true){
          //账户密码正确后，根据返回数据判断用户是否是新用户，若是则跳到仓库初始化
          this.initVisible= true
        }
        // this.$refs[formName].validate((valid) => {//表单验证
        //   if (valid) {
        //     this.loading = true//当调用调用接口前开启
        //     // 登录请求
        //     user.login(this.loginForm).then(res => {//发送请求
        //       if (res) {
        //         // 登录成功（异步编程）
        //         setTimeout(() => {
        //           console.log(res.data.userList[0])
        //           // 定义常量，将获取到的数据赋值给它
        //           var infoUsername = res.data.userList[0].username
        //           var infoLevel = res.data.userList[0].level
        //           sessionStorage.setItem('user', JSON.stringify({
        //             username: infoUsername,
        //             level: infoLevel
        //           }))
        //          this.initVisible= true
        //         }, 500)
  
        //         this.$message({
        //           message: '登录成功',
        //           type: 'success'
        //         })
        //       }
        //     }).finally(_ => {
        //       this.loading = false//结束后关闭
        //     })
        //   }
        // })
      },
    
      //初始化仓库（不需要后端返回数据）
    intoHome(formName){
     // console.log(this.initStock.avg)
      // this.$refs[formName].validate((valid) => {
      //   if(valid){
      //     this.loading = true
      //     //保存数据
      //     sessionStorage.setItem('initData',JSON.stringify({
      //       capacity_x: this.initStock.capacity_x,
      //       capacity_y: this.initStock.capacity_y,
      //       avg: this.initStock.avg,
      //       gateMachine: this.initStock.gateMachine
      //     }))
          
      //     this.$router.push({ path: '/home' })
      //     this.loading = false
      //     this.initVisible= false
      //     // user.initStock(this.initStock).then(res=>{
      //     //   if(res) {
      //     //     this.$message({
      //     //         message: '仓库初始化成功',
      //     //         type: 'success'
      //     //       })
      //     //       this.$router.push({ path: '/home' })
      //     //   }
      //     // }).finally(_ => {
      //     //     this.loading = false
      //     //   })
      //   }
      // })
      
          this.loading = true
          //保存数据
          window.localStorage.setItem('initData',JSON.stringify({
            capacity_x: this.initStock.capacity_x,
            capacity_y: this.initStock.capacity_y,
            avg: this.initStock.avg,
            gateMachine: this.initStock.gateMachine
          }))
          var init = JSON.parse(window.localStorage.getItem('initData'))
          console.log("接收到")
          console.log(init.capacity_x)
          this.$router.push({ path: '/home' })
          this.loading = false
          this.initVisible= false
    }
    }
  }
  </script>
  
  <style>
  .login_container {
      background-image: url("../../assets/welcome.jpg");
      height: 900px;
  }
  
  .login {
    background-color: transparent !important;
    height: 100%;
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-form {
    height: 300px;
    width: 500px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    opacity: 0.8;
    padding: 10px 50px;
  }
  
  .login input::-webkit-outer-spin-button,
  .login input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  
  .login input[type='number'] {
      -moz-appearance: textfield;
  }
  
  .btn-r {
    width: 100px;
    float: right;
  }
  
  .btn-l {
    width: 100px;
    float: left;
  }
  
  .b span {
    font-size: 12px;
    cursor: pointer;
    display: inline-block;
    margin-top: 5px;
  }
  
  .findPassword {
    padding: 0px 50px;
  }

  /* .initDialog{

  } */
  </style>
  