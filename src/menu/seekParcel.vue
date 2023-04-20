<template>
    <div>
    <div class="Checkform">
        <el-form :inline="true" :model="checkMag" rules="rules" ref="checkMag">
         <el-form-item label="包裹ID:" prop="ID">
            <el-input v-model="checkMag.ID" placeholder="输入包裹id" maxlength="32"></el-input>
         </el-form-item>
         <el-form-item >
            <el-button icon="el-icon-search"  type="primary" circle @click="onSubmit('checkMag')"></el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-tabs type="border-card">
    <el-tab-pane label="入库记录">
        <el-table :data="inTableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"  width="180"></el-table-column>
        <el-table-column prop="in_time" label="入库时间"  width="180"></el-table-column>
        <el-table-column prop="location_xy" label="存放货架"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="出库记录">
      <el-table :data="outTableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"  width="180"></el-table-column>
        <el-table-column prop="in_time" label="出库时间"  width="180"></el-table-column>
        <el-table-column prop="location_xy" label="存放货架"></el-table-column>
        <el-table-column prop="address" label="目的地"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-dialog title="包裹详情" :visible.sync="dialogTableVisible">
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
          return callback(new Error('请输入密码'))
        } else if (!/^(?![0-9]+$)/.test(value)) {
          return callback(new Error('密码长度在3-18个字符,只能包含数字、大小写字母'))
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
                ID: [
                { validator: parcelId, trigger: 'blur' }
            ]
            }
    }
    },
    created(){
        this.token = JSON.parse(window.sessionStorage.getItem('Token')).token
        this.checkMag.token = this.token 
        this.initTable(),
        this.initOutTable()

    },
    methods:{

        //查询包裹
        onSubmit(formName){
            //表单验证-加载-发送请求-获得结果（）-利用弹窗展现结果-结束加载
            const _this = this
            _this.$refs[formName].validate((valid)=>{
                if(valid){
                    _this.loading = true
                    other.checkParcel(_this.checkMag).then(res=>{
                        if (res.data.status_code== true) {
                            //保存数据
                            _this.dialogTableVisible = true
                        } else {
                            _this.$message({
                                message:'查询异常',
                                type: 'error'
                            })
                        }
                    }).finally(res=>{
                        _this.loading = false
                    })
                }

            })
        },
        //表格数据请求
        initInTable(){
            const _this = this
            //获取用户名-发送请求-保存数据
            other.getInTable(_this.token).then(res=>{
                if(res.data.status_code == true) { //正常获取
                    _this.inTableData = res.data.inTableData
                } else {  //异常获取
                    _this.$message({
                        message: '获取异常',
                        type: 'error'
                    })
                }
            })
        },
        //获取出库记录表
        initOutTable(){
            const _this = this
            //获取用户名-发送请求-保存数据
            other.getOutTable(_this.token).then(res=>{
                if(res.data.status_code == true) { //正常获取
                    _this.outTableData = res.data.outTableData
                } else {  //异常获取
                    _this.$message({
                        message: '获取异常',
                        type: 'error'
                    })
                }
            })
        }
    }
}
</script>

<style>
/* #mysvg {
    border: #7a85e5;
} */
</style>