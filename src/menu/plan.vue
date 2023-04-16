<template>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">
                <el-form :inline="true" :model="InData" :ref="parcelInList" class="mag" :rules="rules">
                  <div  v-for= "(item,index) in InData.parcelInList" >
                <el-form-item label="包裹ID:" :prop="'parcelInList.'+index+'.id'" :rules="rules.id">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" :prop="'parcelInList.'+index+'.place'" :rules="rules.place">
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="上海" value="上海"></el-option>
                    <el-option label="广东" value="广"></el-option>
                    <el-option label="天津" value="天津"></el-option>
                    <el-option label="重庆" value="重庆"></el-option>
                    <el-option label="河北" value="河北"></el-option>
                    <el-option label="山西" value="山西"></el-option>
                    <el-option label="陕西" value="陕西"></el-option>
                    <el-option label="山东" value="山东"></el-option>
                    <el-option label="河南" value="河南"></el-option>
                    <el-option label="辽宁" value="辽宁"></el-option>
                    <el-option label="吉林" value="吉林"></el-option>
                    <el-option label="黑龙江" value="黑龙江"></el-option>
                    <el-option label="江苏" value="江苏"></el-option>
                    <el-option label="浙江" value="浙江"></el-option>
                    <el-option label="安徽" value="安徽"></el-option>
                    <el-option label="江西" value="江西"></el-option>
                    <el-option label="福建" value="福建"></el-option>
                    <el-option label="湖北" value="湖北"></el-option>
                    <el-option label="湖南" value="湖南"></el-option>
                    <el-option label="四川" value="四川"></el-option>
                    <el-option label="贵州" value="贵州"></el-option>
                    <el-option label="云南" value="云南"></el-option>
                    <el-option label="海南" value="海南"></el-option>
                    <el-option label="甘肃" value="甘肃"></el-option>
                    <el-option label="内蒙古" value="内蒙古"></el-option>
                    <el-option label="青海" value="青海"></el-option>
                    <el-option label="新疆" value="新疆"></el-option>
                    <el-option label="西藏" value="西藏"></el-option>
                    <el-option label="广西" value="广西"></el-option>
                    <el-option label="宁夏" value="宁夏"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="primary" :loading="loading" @click="avgPlace('InData')">入库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>

              <el-tab-pane label="出库" name="second">
                <el-form :inline="true" :model="OutData" class="mag" :rules="rules">
                  <div  v-for= "(item,index) in OutData.parcelOutList" :key="index">
                <el-form-item label="包裹ID:" :prop="'parcelOutList.'+index+'.id'">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="上海" value="上海"></el-option>
                    <el-option label="广东" value="广"></el-option>
                    <el-option label="天津" value="天津"></el-option>
                    <el-option label="重庆" value="重庆"></el-option>
                    <el-option label="河北" value="河北"></el-option>
                    <el-option label="山西" value="山西"></el-option>
                    <el-option label="陕西" value="陕西"></el-option>
                    <el-option label="山东" value="山东"></el-option>
                    <el-option label="河南" value="河南"></el-option>
                    <el-option label="辽宁" value="辽宁"></el-option>
                    <el-option label="吉林" value="吉林"></el-option>
                    <el-option label="黑龙江" value="黑龙江"></el-option>
                    <el-option label="江苏" value="江苏"></el-option>
                    <el-option label="浙江" value="浙江"></el-option>
                    <el-option label="安徽" value="安徽"></el-option>
                    <el-option label="江西" value="江西"></el-option>
                    <el-option label="福建" value="福建"></el-option>
                    <el-option label="湖北" value="湖北"></el-option>
                    <el-option label="湖南" value="湖南"></el-option>
                    <el-option label="四川" value="四川"></el-option>
                    <el-option label="贵州" value="贵州"></el-option>
                    <el-option label="云南" value="云南"></el-option>
                    <el-option label="海南" value="海南"></el-option>
                    <el-option label="甘肃" value="甘肃"></el-option>
                    <el-option label="内蒙古" value="内蒙古"></el-option>
                    <el-option label="青海" value="青海"></el-option>
                    <el-option label="新疆" value="新疆"></el-option>
                    <el-option label="西藏" value="西藏"></el-option>
                    <el-option label="广西" value="广西"></el-option>
                    <el-option label="宁夏" value="宁夏"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="success" :loading="loading" @click="avgFetch('parcelOutList')">入库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
    </div>
</template>

<script>
  import other from '@/api/other.js'
  import user from '@/api/user'
export default{
  data(){
    var parcelID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入包裹id'))
        } else if (!/^\d+$/.test(value)) {
          return callback(new Error('长度在1-16个字符，只能包含数字、大小写字母'))
        }else {
          callback()
        }
      }
      var parcelPlace = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择目的地'))
        } else {
          callback()
        }
      }

    return{
      InData:{
        parcelInList:[{}]//入库信息
      },
      OutData:{
        parcelOutList:[{}]//出库信息
      },
      
      loading: false,//加载效果
      defaultTab:'first',

      rules:{
        id:[ { validator: parcelID, trigger: 'blur' } ],
        place:[ {validator: parcelPlace, trigger: 'blur'}]
      }
    }
  },
  //初始化数据
  created(){
    const _this = this
    var token = JSON.parse(window.localStorage.getItem("Token")).token
    //SVG测试
    let temp = JSON.parse(window.localStorage.getItem('initData'))
    let parcel={
        id:'',
        place: ''
      }
    //初始化表单
    console.log(temp.gateMachine)
    for (let i = 0; i < temp.gateMachine; i++) {
      this.InData.parcelInList.push(parcel)
      this.OutData.parcelOutList.push(parcel)
    }
    
  },
  //仓库初始化（画出平面图,根据后端返回的数据）
  mounted() {

    },  

    methods: {
      //入库avg动画
      avgPlace(formName) {
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true//要在动画之前关闭
          other.enterStock(formName,token).then(res=>{
            if(res) {
              setTimeout(() => {
                for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
                if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
                //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
                //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
                }else {
                  //提示用户该包裹不可入库
                }
              }
              },500)
              this.$message({
                message: '仓库初始化成功',
                type: 'success'
              })
            }
          }).finally(res=>{
            this.loading = false
          })  
        }
       })
       

      },
      //出库avg动画
      avgFetch(formName) {
        //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
        console.log(this.parcelOutList[0].place)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true//要在动画之前关闭
            other.enterStock(formName,token).then(res=>{
              if(res) {
                setTimeout(() => {
                  for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
                  if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
                  //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
                  //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
                  }else {
                    //提示用户该包裹不可入库
                  }
                }
                },500)
                this.$message({
                  message: '仓库初始化成功',
                  type: 'success'
                })
              }
            }).finally(res=>{
              this.loading = false
            })  
          }
        })
      },
      //切换
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="less" scoped>

  .can {
    border: #101a28;
  }
</style>