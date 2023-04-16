<template>
    <div class="register_container">
      <div class="register">
        <div class="register-form">
          <h2>注册</h2>
          <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请填写用户名" maxlength="32" v-model="registerForm.username" ></el-input>
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请填写 3-18 位密码" type="password" maxlength="18" v-model="registerForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input prefix-icon="el-icon-lock" placeholder="请填写 3-18 位密码" type="password" maxlength="18"  v-model="registerForm.passwordConfirm" show-password></el-input>
          </el-form-item>
      
          <el-form-item class="btn-r" label-width="0px">
            <el-button type="danger" icon="el-icon-s-promotion" :loading="loading" @click="submitForm('registerForm')">注 册</el-button>
          </el-form-item>
          <el-form-item class="btn-l" label-width="0px">
            <router-link to="/login">
            <el-button type="success" icon="el-icon-back">登 录</el-button></router-link>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
    </template>

  <script>
  import other from '@/api/other.js'
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
          return callback(new Error('请输入密码！'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else if (this.registerForm.passwordConfirm !== '') {
          this.$refs.registerForm.validateField('passwordConfirm')
          return callback()
        } else {
          return callback()
        }
      }
      var passwordConfirm = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入确认密码！'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else if (value !== this.registerForm.password) {
          return callback(new Error('两次输入的密码不一致！'))
        } else {
          return callback()
        }
      }

      return {
        registerForm: {
          username: '',
          password: '',
          passwordConfirm: ''
        },
        // 按钮加载
        loading: false,
        rules: {
          username: [
            { validator: username, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          passwordConfirm: [
            { validator: passwordConfirm, trigger: 'blur' }
          ]
       
        }
      }
    },
    methods: {
      // 注册
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            user.register(this.registerForm).then(res => {
              if (res.status_code=="true") {
                // 注册成功
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push({ path: '/login' })
              } else {
                this.$message({
                  message: '注册失败，该用户已存在',
                  type: 'error'
                })
              }
            }).finally(res => {
              this.loading = false
            })
          }
        })
      },
    }
  }
  </script>
  
    <style>
    .register_container {
      background-image: url("../../assets/welcome.jpg");
      height: 900px;
  }
    .register {
      background-color: transparent !important;
      height: 100%;
  
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .register-form {
      height: 350px;
      width: 500px;
      box-sizing: border-box;
      background-color: #fff;
      opacity: 0.8;
      border-radius: 10px;
      padding: 10px 50px;
    }
  
    .register-form input::-webkit-outer-spin-button,
    .register-form input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  
    .register-form input[type='number'] {
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
    </style>
  