<template>
    <div>
    <div class="Checkform">
        <el-form :inline="true" :model="checkMag" :rules="rules" :ref="checkMag">
         <el-form-item label="包裹ID:" prop="ID">
            <el-input v-model="checkMag.ID" placeholder="输入包裹id" maxlength="32"></el-input>
         </el-form-item>
         <el-form-item >
            <el-button icon="el-icon-search"  type="primary" circle @click="onSubmit(checkMag)"></el-button>
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
            checkMag:{
                ID:""
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
                        if (res) {
                            //获取数据
                            //弹窗显示
                            this.$alert('这是一段内容', _this.checkMag.ID, {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                                });
                            }
                            });


                        }
                    }).finally(res=>{
                        _this.loading = false
                    })
                }

            })
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