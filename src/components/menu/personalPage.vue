<template>
    <div class="personalPageWhole">
        <div :inline="true">
            <el-avatar :src="userJPG" :size="120" class="jpg"></el-avatar>
            <span class="welcome">Hi~ {{ userName }}</span>
        </div>
        <div>
        <el-form  class="personalInfo" >
            <el-form-item  >
                <el-card class="box-card">
                    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size">
                        <template slot="extra">
                        <el-button type="text" @click="changePasswordDialog = true">修改密码</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
                        </template>
                        <el-descriptions-item  label="用户名">{{ this.userName }}</el-descriptions-item>
                        <el-descriptions-item label="手机号" class="test">{{ this.phone }}</el-descriptions-item>   
                        <el-descriptions-item label="所属中转站">
                        <el-tag >{{ this.stationName }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="账号创建时间" class="test">{{ this.startTime }}</el-descriptions-item> 
                    </el-descriptions>
                </el-card>
            </el-form-item>
        </el-form>
    </div>
        <el-dialog width="450px" title="修改个人信息" :visible.sync="dialogFormVisible" append-to-body>
            <el-form :model="changeInfo" ref="changeInfo" :rules="rules">
                <el-form-item label="电话号码:" label-width="100px" prop="phone">
                   <el-input v-model="changeInfo.userPhone" placeholder="11位数手机号"></el-input>
                </el-form-item>
                <el-form-item label="所属中转站:" label-width="100px" prop="address">
                    <el-input v-model="changeInfo.stationName" ></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱:" label-width="100px" prop="userEmail">
                    <el-input v-model="changeInfo.userEmail" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changeInfo')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="modify('changeInfo')">确 定</el-button>
            </div>
            </el-dialog>
            <el-dialog width="450px" title="修改密码" :visible.sync="changePasswordDialog" append-to-body>
            <el-form :model="changePassword" ref="changePassword" :rules="rules">
                <el-form-item label="旧密码:" label-width="100px" prop="pre_password">
                   <el-input prefix-icon="el-icon-lock" placeholder="长度3-16个字符,包含数字、大小写字母" type="password" maxlength="18" v-model="changePassword.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码:" label-width="100px" prop="new_password">
                    <el-input prefix-icon="el-icon-lock" placeholder="长度3-16个字符,包含数字、大小写字母" type="password" maxlength="18" v-model="changePassword.passwordNew" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changePassword')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="change('changePassword')">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
import jpg from '@/assets//image/R.jpg'
import center from '@/api/center.js'
export default{
    data(){
        var phone = (rule, value, callback) => {
            if (!value && this.changeInfo.addr== '') {
                return callback(new Error('二者不能同时为空'))
                } else {
                    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'))
                }else {
                    callback()
                }
                }
      }
      var addr = (rule, value, callback) => {
            if (!value && this.changeInfo.phone== '') {
                return callback(new Error('二者不能同时为空'))
                } else {
                    callback()
                }
      }
       var pre_password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else {
          callback()
        }  
      }
      var new_password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else if (value == this.changePassword.pre_password) {
          return callback(new Error('两次输入的密码必须不一致！'))
        } else {
          return callback()
        }
      }
        return{
            loading: false,
            userJPG: jpg,
            userName: "hyt4",
            phone: "142578343",
            stationName: "北京中关村二部",
            startTime:"2022.5.1",
            userEmail:"123@qq.com",
            dialogFormVisible: false,
            changePasswordDialog: false,
            changePassword: {
                password:'',
                passwordNew:'',
            },
            changeInfo: {
                userPhone:'',
                stationName:'',
                userEmail:''
            },
            rules:{
                phone: [{ validator: phone, trigger: 'blur' }],
                address: [{ validator: addr, trigger: 'blur'}],
                pre_password: [{ required: true,validator: pre_password, trigger: 'blur'}],
                new_password: [{ required: true,validator: new_password, trigger: 'blur'}]
            }
        }
    },
    created() {
        // this.token = JSON.parse(window.localStorage.getItem('Token')).token
        // this.changeInfo.token = this.token
        // this.changePassword.token = this.token
        this.getPersonalInfo()
    },
    methods:{
        //重置表单(被重置的表单元素必须有prop规则引用)
        resetForm(formName) {
           this.$refs[formName].resetFields();
        },
        //修改个人信息
        modify(formName){
            this.$refs[formName].validate(valid=> {
                if (valid) {
                    this.loading = true
                    console.log(this.changeInfo)
                    center.modifyUserInformation(this.changeInfo).then(res=> {
                        if (res.data.status_code == true){
                            //重新获取用户信息
                            this.getPersonalInfo()
                            this.$message({
                            message: '修改信息成功',
                            type: 'success'
                            }) 
                        }
                    }).finally(res=>{
                        this.loading = false
                        this.dialogFormVisible = false
                    })  
                }
            })
        },
        //获取用户信息
        getPersonalInfo(){
            center.personInformation().then(res=> {
                if (res.data.status_code==true) {
                    console.log(res)
                    this.userName = res.data.userName
                    this.phone = res.data.userPhone
                    this.stationName = res.data.stationName
                    this.startTime = res.data.startTime
                    this.userEmail = res.data.userEmail
                }
            }).finally(res=>{
                
            })
        },
        //修改密码
        change(formName){
            console.log(this.$refs[formName])
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading = true
                    center.modifyPassword(this.changePassword).then(res=> {
                        if (res.data.status_code==true) {
                            this.$message({
                                message: '成功修改密码',
                                type:'success'
                            })
                        }
                    }).finally(res=> {
                        this.loading = false
                        this.changePasswordDialog = false
                    })
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
.box-card {
    background-color: #f6f9fb;
    color: #2675aa;
    width: 700px;
}
.jpg {
    margin-top: 2%; 
}
.margin-top {
    background-color: #f6f9fb;
}
.personalInfo {
    margin-top: 2%;
}


.welcome {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 50px;
    margin-top: auto;
    margin-left: 50px;
    color: #5379a7;
}

</style>