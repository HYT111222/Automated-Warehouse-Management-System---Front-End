<template>
    <!--:style="{
		'--color':color}":inline="true"-->
        <div class="personalPageWhole">
            <div :inline="true">
                <el-avatar :src="userJPG" :size="120" class="jpg"></el-avatar>
                <span class="welcome">Hi~ {{ userName }}</span>
            </div>
            
            <el-form :model="userInfoForm" class="personalInfo" >
                <el-form-item  >
                    <el-card class="box-card">
                        <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size">
                            <template slot="extra">
                            <el-button type="primary" icon="el-icon-edit" circle @click="modify()"></el-button>
                            </template>
                            <el-descriptions-item  label="用户名">{{ userName }}</el-descriptions-item>
                            <el-descriptions-item label="手机号" class="test">{{ phone }}</el-descriptions-item>   
                            <el-descriptions-item label="所属中转站">
                            <el-tag size="small">{{ address }}</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="产生费用：">
                                <el-tag type="danger">{{  totalCost }}</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </el-form-item>
            </el-form>
        </div>
</template>

<script>
import other from '@/api/other.js'
import user from '@/api/user'
import jpg from '../assets/R.jpg'
export default{
    data(){
        // var test = JSON.parse(window.localStorage.getItem('testCss'))
        // var color = test.colorCss
        return{
            // color
            userJPG:jpg,
            userName:"hyt",
            phone:"1425",
            address:"北京中关村二部",
            totalCost:0
        }
    },
    created() {
        // const _this =this
        // _this.userName = JSON.parse(window.localStorage.getItem('user')).userName
    },
    methods:{
        //修改信息以及密码
        modify(){

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