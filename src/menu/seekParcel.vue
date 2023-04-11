<template>
    <div>
     <!-- <svg
        id="mysvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 500"
        preserveAspectRatio="xMidYMid meet"
        >
  <circle id="mycircle" cx="100" cy="100" r="50" />
    </svg> -->
    <div class="Checkform">
        <el-form :inline="true" :model="checkMag">
         <el-form-item label="包裹ID:">
            <el-input v-model="checkMag.ID" placeholder="ID"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit(checkMag)">查询</el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-tabs type="border-card">
    <el-tab-pane label="入库记录">
        <el-table :data="inTableData" stripe style="width: 100%">
        <el-table-column prop="date" label="ID"  width="180"></el-table-column>
        <el-table-column prop="name" label="时间"  width="180"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="出库记录">
      <el-table :data="outTableData" stripe style="width: 100%">
        <el-table-column prop="date" label="ID"  width="180"></el-table-column>
        <el-table-column prop="name" label="时间"  width="180"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
  import other from '@/api/other.js'
  import user from '@/api/user'
  //this用于使用return中的数据和调用函数，_this一般用于methods和created等？
export default{
    data(){
        return{
         checkMag:{
            ID:""
        },
        inTableData: [],//后端传过来的表格记录数据[{},{}]的格式,现在不懂有啥
        outTableData: []
        }
    },
    created(){
        this.initTable()

    },
    methods:{
        //为啥用_this
        onSubmit(formName){
            //表单验证-加载-发送请求-获得结果（）-利用弹窗展现结果-结束加载
        },
        //表格数据请求
        initInTable(){
            //获取用户名-发送请求-保存数据
        },
        initOutTable(){

        }
    }
}
</script>

<style>
/* #mysvg {
    border: #7a85e5;
} */
</style>