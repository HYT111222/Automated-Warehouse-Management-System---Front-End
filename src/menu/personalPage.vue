<template>
    <div class="personalPageWhole">
        <div :inline="true">
            <el-avatar :src="userJPG" :size="120" class="jpg"></el-avatar>
            <span class="welcome">Hi~ {{ userName }}</span>
        </div>
        <div>
        <el-form :model="userInfoForm" class="personalInfo" >
            <el-form-item  >
                <el-card class="box-card">
                    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size">
                        <template slot="extra">
                        <el-button type="text" @click="changePasswordDialog = true">修改密码</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
                        </template>
                        <el-descriptions-item  label="用户名">{{ userName }}</el-descriptions-item>
                        <el-descriptions-item label="手机号" class="test">{{ phone }}</el-descriptions-item>   
                        <el-descriptions-item label="所属中转站">
                        <el-tag size="small">{{ address }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="产生费用">
                            <el-tag type="danger">{{  totalCost }}</el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-form-item>
        </el-form>
    </div>
        <el-dialog width="450px" title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="changeInfo" ref="changeInfo" :rules="rules">
                <el-form-item label="电话号码:" label-width="100px" prop="phone">
                   <el-input v-model="changeInfo.phone" ></el-input>
                </el-form-item>
                <el-form-item label="所属中转站:" label-width="100px" prop="addr">
                    <el-input v-model="changeInfo.addr" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changeInfo')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="modify('changeInfo')">确 定</el-button>
            </div>
            </el-dialog>
            <el-dialog width="450px" title="修改密码" :visible.sync="changePasswordDialog">
            <el-form :model="changePassword" ref="changePassword" :rules="rules">
                <el-form-item label="旧密码:" label-width="100px" prop="pre_password">
                   <el-input prefix-icon="el-icon-lock" placeholder="请填写 3-16 位密码" type="password" maxlength="18" v-model="changePassword.pre_password" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码:" label-width="100px" prop="new_password">
                    <el-input prefix-icon="el-icon-lock" placeholder="请填写 3-16 位密码" type="password" maxlength="18" v-model="changePassword.new_password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changePassword')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="changePassword('changePassword')">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
import other from '@/api/other.js'
import user from '@/api/user'
import jpg from '../assets/R.jpg'

export default{
    data(){
        var phone = (rule, value, callback) => {
            if (!value) {
                return callback()
                } else {
                    if (!/^\d+$/.test(value)) {
                    return callback(new Error('只能包含数字'))
                }else {
                    callback()
                }
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
            userName: "hyt",
            phone: "1425",
            address: "北京中关村二部",
            totalCost: 0,
            token: '',
            dialogFormVisible: false,
            changePasswordDialog: false,
            changePassword: {
                pre_password:'',
                new_password:'',
                token:''
            },
            changeInfo: {
                phone:'',
                addr:'',
                token:''
            },
            rules:{
                phone: [{ validator: phone, trigger: 'blur'}],
                addr: [{}],
                pre_password: [{ validator: pre_password, trigger: 'blur'}],
                new_password: [{ validator: new_password, trigger: 'blur'}]
            }
        }
    },
    created() {
        this.token = JSON.parse(window.localStorage.getItem('Token')).token
        this.changeInfo.token = this.token
        this.changePassword.token = this.token
        // this.getPersonalInfo()
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
                    if (this.changeInfo.addr == '' && this.changeInfo.phone == '') {
                        this.$message({
                            message: '输入信息为空',
                            type: 'error'
                        })
                    } else {
                        this.loading = true
                        user.changeInfo(this.changeInfo).then(res=> {
                            if (res.data.status_code == "true"){
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
                    
                }
            })
        },
        //获取用户信息
        getPersonalInfo(){
            user.getUserInfo(this.token).then(res=> {
                if (res.status=="true") {
                    this.userName = res.user_name
                    this.phone = res.phone
                    this.address = res.address
                    this.totalCost = res.totalCost
                }
            }).finally(res=>{
                this.$message({
                    message: '欢迎来到个人主页',
                    type: 'success'
                  })
            })
        },
        //修改密码
        changePassword(formName){
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading = true
                    user.changePassword(this.changePassword).then(res=> {
                        if (res.data.status_code=='true') {
                            this.$message({
                                message: '成功修改密码',
                                type:'success'
                            })
                        }
                    }).finally(res=> {
                        this.loading = false
                    })
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
/* .personalPageWhole {
    color: var(--color)
} */
/* .personalInfo {
    background-color: rgb(229, 238, 246);
} */
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
.personalPageWhole {
    margin-left: 20px;
}
.welcome {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 50px;
    margin-top: auto;
    margin-left: 50px;
    color: #5379a7;
}

</style>