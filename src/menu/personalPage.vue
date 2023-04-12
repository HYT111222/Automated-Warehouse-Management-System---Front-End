<template>
    <!--:style="{
		'--color':color}":inline="true"-->
        <div class="personalPageWhole">
            <el-avatar :src="userJPG" :size="120" class="jpg"></el-avatar>
            <el-form :model="userInfoForm" class="personalInfo" >
                <el-form-item  >
                    <el-card class="box-card">
                        <el-descriptions class="margin-top" title="无边框列表" :column="3" :size="size">
                            <template slot="extra">
                            <el-button type="primary" size="small">操作</el-button>
                            </template>
                            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                            <el-descriptions-item label="备注">
                            <el-tag size="small">学校</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
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
            userName:""
        }
    },
    created() {
        // const _this =this
        // _this.userName = JSON.parse(window.localStorage.getItem('user')).userName
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
</style>