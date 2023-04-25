<template>
    <div>
    <div class="Checkform">
        <el-form :inline="true" :model="checkMag" rules="rules" ref="checkMag">
         <el-form-item label="包裹ID:" prop="ID">
            <el-input v-model="checkMag.ID" placeholder="数字组成" maxlength="32"></el-input>
         </el-form-item>
         <el-form-item >
            <el-button icon="el-icon-search"  type="primary" circle @click="onSubmit('checkMag')"></el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-tabs type="border-card">
    <el-tab-pane label="入库记录">
        <el-table :data="inTableData"  height="500"  border stripe style="width: 100%">
        <el-table-column prop="id" label="ID"  ></el-table-column>
        <el-table-column prop="time" label="入库时间"  ></el-table-column>
        <el-table-column prop="location_xy" label="存放货架"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="出库记录">
      <el-table :data="outTableData" height="500"  border  stripe style="width: 100%">
        <el-table-column prop="id" label="ID"  ></el-table-column>
        <el-table-column prop="time" label="入库时间" ></el-table-column>
        <el-table-column prop="location_xy" label="存放货架"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-dialog title="包裹详情" :visible.sync="dialogTableVisible" style="width: 500px">
    <el-table :data="parcel">
        <el-table-column property="id" label="包裹id" ></el-table-column>
        <el-table-column property="status" label="姓名" ></el-table-column>
        <el-table-column property="location_xy" label="所属货架"></el-table-column>
        <el-table-column property="place" label="目的地"></el-table-column>
        <el-table-column property="in_time" label="入库时间"></el-table-column>
        <el-table-column property="out_time" label="出库时间"></el-table-column>
    </el-table>
    </el-dialog>
    </el-tabs>
    </div>
</template>

<script>
  import other from '@/api/other.js'
  import user from '@/api/user'
  //this用于使用return中的数据和调用函数，_this一般用于methods和created等？
export default{
    data(){
        var parcelId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入ID'))
        } else if (!/^(?![0-9]+$)/.test(value)) {
          return callback(new Error('只能由数字组成'))
        } else {
          callback()
        }
      }
        return{
            loading:false,
            dialogTableVisible: false,
            token: '',
            parcel:{
                id:'',
                status:'',
                location_xy:'',
                place:'',
                in_time:'',
                out_time:''
            },
            checkMag:{
                ID:"",
                token:""
            },
            inTableData: [],//后端传过来的表格记录数据[{},{}]的格式,现在不懂有啥
            outTableData: [],
            //规则名称要与:model中的一致
            rules: {
                ID: [{ validator: parcelId, trigger: 'blur' }]
            }
    }
    },
    created(){
        
        this.token = JSON.parse(window.localStorage.getItem('Token')).token
        this.checkMag.token = this.token
        this.initInTable()
        this.initOutTable()
    },
    methods:{

        //查询包裹
        onSubmit(formName){
            //表单验证-加载-发送请求-获得结果（）-利用弹窗展现结果-结束加载
            console.log(this.$refs[formName])
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.loading = true
                    other.checkParcel(this.checkMag).then(res=>{
                        if (res.data.status_code== true) {
                            //保存数据
                            console.log(res)
                            this.parcel.id= this.checkMag.ID
                            this.parcel.in_time=res.data.in_time
                            this.parcel.location_xy=res.data.location_xy
                            this.parcel.out_time=res.data.out_time
                            this.parcel.place=res.data.place
                            this.parcel.status=res.data.status
                            this.dialogTableVisible = true

                        } else {
                            this.$message({
                                message:'查询异常',
                                type: 'error'
                            })
                        }
                    }).finally(res=>{
                        this.loading = false
                    })
                }
            })
        },
        //表格数据请求
        initInTable(){
            let temp = JSON.parse(window.localStorage.getItem('Token')).token
            //获取用户名-发送请求-保存数据
            console.log(this.token)
            other.getInTable(temp).then(res=>{
                console.log(res)
                if(res.data.status_code == true) { //正常获取
                    this.inTableData = res.data.inTableData
                } else {  //异常获取
                    this.$message({
                        message: '获取异常',
                        type: 'error'
                    })
                }
            })
        },
        //获取出库记录表
        initOutTable(){
            let temp = JSON.parse(window.localStorage.getItem('Token')).token
            //获取用户名-发送请求-保存数据
            other.getOutTable(temp).then(res=>{
                console.log(res)
                if(res.data.status_code == true) { //正常获取
                    this.outTableData = res.data.outTableData
                } else {  //异常获取
                    this.$message({
                        message: '获取异常',
                        type: 'error'
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>