<template>
    <div :class="['container', { 'sign-up-mode': isLogin }]">
        <div class="form-container">
            <div class="signin-signup">
                <form action="#" class="sign-in-form">
                    <h2 class="title">登录</h2>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm"  >
                        <div style="margin-right: 30px;" >
                            <el-form-item  prop="userID" class="hover" >
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <el-button icon="el-icon-user" circle style="font-size: 20px;margin-right: 10px;"></el-button>
                         <el-input class=" login-input"  placeholder="请填写用户名"  v-model="loginForm.userID" style="width: 300px;"></el-input>
                            </div>
                        </el-form-item>
            
                        <el-form-item  prop="password" class="hover" v-show="!isCode" style="width: 100%;" >
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <el-button icon="el-icon-key" circle style="font-size: 20px;margin-right: 10px;"></el-button>
                        <el-input class=" login-input"  placeholder="请填写 3-18 位密码" type="password" v-model="loginForm.password" show-password></el-input>
                            </div>   
                        </el-form-item>
                        </div>
                        <el-form-item  >
                        <el-button type="primary" icon="el-icon-s-promotion" :loading="loading" class="btn " @click="loginToHome('loginForm')">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </form>

                <form action="#" class="sign-up-form">
                    <h2 class="title">注册</h2>
                    <el-form :model="registerForm" :rules="rules" ref="registerForm"   >
                        <div style="margin-right: 56px;">
                            <el-form-item  prop="userID" class="hover" style="margin-top: 0px;margin-bottom: 13px;" >
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <span slot="label" class="register-span">用户名</span>
                             <el-input class=" register-input"  placeholder="长度为2-16，数字或字母组成"  v-model="registerForm.userID" style="width: 300px;"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item  prop="password" class="hover" v-show="!isCode" style="margin-top: 0px;margin-bottom: 13px;" >
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <span slot="label" class="register-span" >密码</span>
                        <el-input class=" register-input"  placeholder="请填写 3-16 位密码" type="password" v-model="registerForm.password" show-password style="width: 300px;"></el-input>
                            </div>   
                        </el-form-item>
                        <el-form-item  prop="passwordConfirm" class="hover"  v-show="!isCode" style="margin-top: 0px;margin-bottom: 13px;">
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <span slot="label" class="register-span" >确认密码</span>
                        <el-input class=" register-input"  placeholder="请填写 3-16 位密码" type="password" v-model="registerForm.passwordConfirm" show-password style="width: 300px;"></el-input>
                            </div>   
                        </el-form-item>
                        <el-form-item  prop="userName" class="hover" v-show="!isCode" style="margin-top: 0px;margin-bottom: 13px;">
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <span slot="label" class="register-span" >真实姓名</span>
                        <el-input class=" register-input"  placeholder="中文组成,长度在2以上"  v-model="registerForm.userName" style="width: 300px;"></el-input>
                            </div>   
                        </el-form-item>
                        <el-form-item  prop="managerID" class="hover"  v-show="!isCode" style="margin-top: 0px;margin-bottom: 13px;" v-if="registerForm.isManager=='true'">
                            <div style="display: flex;justify-content: center; align-items: center;">
                                <span slot="label" class="register-span" >管理员ID</span>
                        <el-input class="register-input"  placeholder="长度为2-16，数字或字母组成" v-model="registerForm.managerID"  style="width: 300px;"></el-input>
                            </div>   
                        </el-form-item>
                        </div>
                        <el-form-item  style="margin-top: 0px;padding: 0px;height: 30px;">
                            <el-radio v-model="registerForm.isManager" label="true" style="font-weight: 550; font-size: 1.1rem;padding: 0px;" class="hover">管理员</el-radio>
                            <el-radio v-model="registerForm.isManager" label="false" style="font-weight: 550; font-size: 1.1rem;padding: 0px;" class="hover">普通员工</el-radio>
                        </el-form-item>
                        <el-form-item  style="margin-top: 0px;">
                        <el-button type="primary" icon="el-icon-s-promotion" @click="register('registerForm')" :loading="loading" class="btn " style="margin-top: 0px;">立即注册</el-button>
                        </el-form-item>
                    </el-form>
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>加入我们</h3>
                    <p>加入我们，成为本站的一份子。</p>
                    <button class="btn transparent" @click="isLogin = !isLogin">
                        去注册
                    </button>
                </div>
                <img src="@/assets/image/signin.svg" class="image" alt="" />
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>已有帐号？</h3>
                    <p>立即登录已有帐号，享受独家权益。</p>
                    <button class="btn transparent" @click="isLogin = !isLogin">
                        去登录
                    </button>
                </div>
                <img src="@/assets/image/signup.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>

<script >
import user from '@/api/user.js'
export default {
    name: 'Login',
    
    data() {
        var userID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不可为空'))
        }else if (!/^[A-Za-z0-9]{2,16}$/.test(value)) {
          return callback(new Error('长度在2-16个字符,数字或字母组成'))
        } else {
          callback()
        }
      }

      var password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else {
          callback()
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
      var userName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入真实姓名'))
        } else if (!/^[\u4e00-\u9fa5]{2,20}$/.test(value)) {
          return callback(new Error('2个以上汉字'))
        } else {
          callback()
        }
      }
      var managerID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入所属管理员ID'))
        } else if (!/^[A-Za-z0-9]{2,16}$/.test(value)) {
          return callback(new Error('长度在2-16个字符,数字或字母组成'))
        } else {
          callback()
        }
      }

      return {
        isCode: false,
        isLogin: false,
        loading: false,//加载效果
        //登录参数
        loginForm: {
          userID: '',
          password: ''
        },
        //注册参数
        registerForm: {
          userID: '',
          password: '',
          userName:'',
          managerID:'',
          isManager: 'false',
          passwordConfirm: '',
        },
        rules: {
          userID: [
            { validator: userID, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          passwordConfirm: [{validator: passwordConfirm, trigger: 'blur'}],
          userName: [ {validator: userName, trigger: 'blur'} ],
          managerID: [{validator: managerID, trigger: 'blur'}]

        }
        }
    },
    methods:{
        //登录
        loginToHome(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.loading = true
                user.login(this.loginForm).then(res => {
                    console.log(res)
                if (res.data.status_code === true ) {
                    //保存token、用户权限类型、用户名
                    window.localStorage.setItem('token',res.data.token)
                    window.sessionStorage.setItem('authority',res.data.authority)
                    window.sessionStorage.setItem('userName',this.loginForm.userID)
                    // 登录成功
                    this.$message({
                    message: '登录成功',
                    type: 'success'
                    })
                    window.localStorage.setItem('token',res.data.token)
                    this.$router.push('/home')
                } else {
                    this.$message({
                    message: '登录失败，用户名或密码错误',
                    type: 'error'
                    })
                }
                }).finally(res => {
                this.loading = false
                })
            }
        })
        },
        //注册
        register(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.registerForm.isManager == 'false'){//普通用户
                    this.loading = true
                    user.userRegister(this.registerForm).then(res => {
                        console.log(res)
                    if (res.data.status_code ===true ) {
                        // 注册成功
                        this.$message({
                        message: '注册成功',
                        type: 'success'
                        })
                        this.isLogin = !this.isLogin
                    } else {
                        this.$message({
                        message: '注册失败，该用户已存在',
                        type: 'error'
                        })
                    }
                    }).finally(res => {
                        this.loading = false
                    })
                } else {//管理员
                    this.loading = true
                    user.managerRegister(this.registerForm).then(res => {
                        console.log(res)
                    if (res.data.status_code ===true ) {
                        // 注册成功
                        this.$message({
                        message: '注册成功',
                        type: 'success'
                        })
                        this.isLogin = !this.isLogin
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
                
            }
        })
        }
    }
}
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap'); */
.hover:hover{
    transform: scale(105%,105%);
}
.register-span {
    color: #444;
    width: 80px;
    font-weight: 550;
    font-size: 1.1rem;
    text-align:right;
    padding-bottom: 3px;
    margin-bottom: 7px;
    
}
.register-input /deep/ .el-input__inner {
    max-width: 500px;
    width: 100%;
    background-color: #f0f0f0;
    margin-top: 0px;
    margin-bottom: 5px;
    margin-left: 10px;
    height: 40px;
    border-radius: 55px;
    /* display: grid; */
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
    line-height: 1;
    font-weight: 500;
    font-size: 1.0rem;
    color: #333;
}
.login-input /deep/ .el-input__inner {
    
    max-width: 500px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 5px 0;
    height: 55px;
    border-radius: 55px;
    /* display: grid; */
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
    line-height: 1;
    font-weight: 500;
    font-size: 1.1rem;
    color: #333;
}
/**----------------------------------------------------------------- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body,
input {
    font-family: 'Poppins', sans-serif;
}

.container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}

.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

form.sign-up-form {
    opacity: 0;
    z-index: 1;
}

form.sign-in-form {
    z-index: 2;
}

.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}
.input-field:hover{
    transform: scale(107%,107%);
}
.input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
}

.input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.1rem;
}

.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
}

.social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
}

.social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
}

.btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
    transform: scale(107%,107%);
}
.panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.container:before {
    content: '';
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
}

.image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
    transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
    left: 25%;
}

.container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
    pointer-events: none;
}

.container.sign-up-mode .right-panel {
    pointer-events: all;
}

@media (max-width: 870px) {
    .container {
        min-height: 800px;
        height: 100vh;
    }
    .signin-signup {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .container.sign-up-mode .signin-signup {
        left: 50%;
    }

    .panels-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .image {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .panel h3 {
        font-size: 1.2rem;
    }

    .panel p {
        font-size: 0.7rem;
        padding: 0.5rem 0;
    }

    .btn.transparent {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }

    .container:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .container.sign-up-mode:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateY(-300px);
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateY(300px);
    }

    .container.sign-up-mode .signin-signup {
        top: 5%;
        transform: translate(-50%, 0);
    }
}

@media (max-width: 570px) {
    form {
        padding: 0 1.5rem;
    }

    .image {
        display: none;
    }
    .panel .content {
        padding: 0.5rem 1rem;
    }
    .container {
        padding: 1.5rem;
    }

    .container:before {
        bottom: 72%;
        left: 50%;
    }

    .container.sign-up-mode:before {
        bottom: 28%;
        left: 50%;
    }
}
</style>