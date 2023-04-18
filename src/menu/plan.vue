<template>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">
                <el-form :inline="true" :model="InData" ref="InData" class="mag" :rules="rules">
                  <div  v-for= "(item,index) in InData.parcelInList" >
                <el-form-item label="包裹ID:" :prop="'parcelInList.'+index+'.id'" :rules="rules.id">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="1"></el-option>
                    <el-option label="上海" value="2"></el-option>
                    <el-option label="广东" value="3"></el-option>
                    <el-option label="天津" value="4"></el-option>
                    <el-option label="重庆" value="5"></el-option>
                    <el-option label="河北" value="6"></el-option>
                    <el-option label="山西" value="7"></el-option>
                    <el-option label="陕西" value="8"></el-option>
                    <el-option label="山东" value="9"></el-option>
                    <el-option label="河南" value="10"></el-option>
                    <el-option label="辽宁" value="11"></el-option>
                    <el-option label="吉林" value="12"></el-option>
                    <el-option label="黑龙江" value="13"></el-option>
                    <el-option label="江苏" value="14"></el-option>
                    <el-option label="浙江" value="15"></el-option>
                    <el-option label="安徽" value="16"></el-option>
                    <el-option label="江西" value="17"></el-option>
                    <el-option label="福建" value="18"></el-option>
                    <el-option label="湖北" value="19"></el-option>
                    <el-option label="湖南" value="20"></el-option>
                    <el-option label="四川" value="21"></el-option>
                    <el-option label="贵州" value="22"></el-option>
                    <el-option label="云南" value="23"></el-option>
                    <el-option label="海南" value="24"></el-option>
                    <el-option label="甘肃" value="25"></el-option>
                    <el-option label="内蒙古" value="26"></el-option>
                    <el-option label="青海" value="27"></el-option>
                    <el-option label="新疆" value="28"></el-option>
                    <el-option label="西藏" value="29"></el-option>
                    <el-option label="广西" value="30"></el-option>
                    <el-option label="宁夏" value="31"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="primary" :loading="loading" @click="avgPlace('InData')">入库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>

              <el-tab-pane label="出库" name="second">
                <el-form :inline="true" :model="OutData" class="mag" ref="OutData" :rules="rules">
                  <div  v-for= "(item2,index2) in OutData.parcelOutList" :key="index2">
                <el-form-item label="包裹ID:" :prop="'parcelOutList.'+index2+'.id'">
                    <el-input v-model="item2.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item2.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="1"></el-option>
                    <el-option label="上海" value="2"></el-option>
                    <el-option label="广东" value="3"></el-option>
                    <el-option label="天津" value="4"></el-option>
                    <el-option label="重庆" value="5"></el-option>
                    <el-option label="河北" value="6"></el-option>
                    <el-option label="山西" value="7"></el-option>
                    <el-option label="陕西" value="8"></el-option>
                    <el-option label="山东" value="9"></el-option>
                    <el-option label="河南" value="10"></el-option>
                    <el-option label="辽宁" value="11"></el-option>
                    <el-option label="吉林" value="12"></el-option>
                    <el-option label="黑龙江" value="13"></el-option>
                    <el-option label="江苏" value="14"></el-option>
                    <el-option label="浙江" value="15"></el-option>
                    <el-option label="安徽" value="16"></el-option>
                    <el-option label="江西" value="17"></el-option>
                    <el-option label="福建" value="18"></el-option>
                    <el-option label="湖北" value="19"></el-option>
                    <el-option label="湖南" value="20"></el-option>
                    <el-option label="四川" value="21"></el-option>
                    <el-option label="贵州" value="22"></el-option>
                    <el-option label="云南" value="23"></el-option>
                    <el-option label="海南" value="24"></el-option>
                    <el-option label="甘肃" value="25"></el-option>
                    <el-option label="内蒙古" value="26"></el-option>
                    <el-option label="青海" value="27"></el-option>
                    <el-option label="新疆" value="28"></el-option>
                    <el-option label="西藏" value="29"></el-option>
                    <el-option label="广西" value="30"></el-option>
                    <el-option label="宁夏" value="31"></el-option>
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
          return callback()
        } else {
            if (!/^\d+$/.test(value)) {
            return callback(new Error('只能包含数字'))
          }else {
            callback()
          }
        }
         
      }

    return{
      InData:{
        parcelInList:[],//入库信息
        token: ''
      },
      OutData:{
        parcelOutList:[],//出库信息
        token: ''
      },
      
      loading: false,//加载效果
      defaultTab:'first',

      rules:{
        id:[ { validator: parcelID, trigger: 'blur' } ]
      }
    }
  },
  //初始化数据
  created(){
    let temp = JSON.parse(window.sessionStorage.getItem('initData'))
    //初始化表单
    console.log(temp.gateMachine)
    for (let i = 0; i < temp.gateMachine; i++) {
      //不能将parcel放在循环外，用同一个parcel赋给列表
      let parcel={
        id:'',
        place: ''
      }
      let parcel2={
        id:'',
        place: ''
      }
      this.InData.parcelInList.push(parcel)
      this.OutData.parcelOutList.push(parcel2)
    }
    
  },
  //仓库初始化（画出平面图,根据后端返回的数据）
  mounted() {

    },  

    methods: {
      //入库
      avgPlace(formName) {
        const _this =this
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = {
            parcelInList:[],
            token:''
          }
          for (let i = 0; i<_this.InData.parcelInList.length;i++){
            if (_this.InData.parcelInList[i].id!='' && _this.InData.parcelInList[i].place!=''){
              temp.parcelInList.push(_this.InData.parcelInList[i])
            }
          }
          console.log(temp.parcelInList.length)
          if (temp.parcelInList.length>0){
          console.log("ok")
          this.loading = true//要在动画之前关闭
          console.log(temp.parcelInList[0].place)
          temp.token = JSON.parse(window.localStorage.getItem("Token")).token
          other.enterStock(temp).then(res=>{
          console.log(res)
            // if(res) {
            //   setTimeout(() => {
            //     for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
            //     if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
            //     //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
            //     //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
            //     }else {
            //       //提示用户该包裹不可入库
            //     }
            //   }
            //   },500)
            //   this.$message({
            //     message: '',
            //     type: 'success'
            //   })
            // }
          }).finally(res=>{
            this.loading = false
          })
          } else {
                this.$message({
                message: '包裹信息输入不可为空',
                type: 'error'
              })
          }
        }
       })
       

      },
      //出库
      avgFetch(formName) {
        const _this =this
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = {
            parcelInList:[],
            token:''
          }
          for (let i = 0; i<_this.OutData.parcelOutList.length;i++){
            if (_this.OutData.parcelOutList[i].id!='' && _this.OutData.parcelOutList[i].place!=''){
              temp.parcelInList.push(_this.OutData.parcelOutList[i])
            }
          }
          if (temp.parcelInList.length>0){
            this.loading = true//要在动画之前关闭
            temp.token = JSON.parse(window.localStorage.getItem("Token")).token
            this.loading = true//要在动画之前关闭
            other.enterStock(temp).then(res=>{
            console.log(res)
              // if(res) {
              //   setTimeout(() => {
              //     for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
              //     if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
              //     //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
              //     //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
              //     }else {
              //       //提示用户该包裹不可入库
              //     }
              //   }
              //   },500)
              //   this.$message({
              //     message: '',
              //     type: 'success'
              //   })
              // }
            }).finally(res=>{
              this.loading = false
            })
          } else {
                this.$message({
                message: '包裹信息输入不可为空',
                type: 'error'
              })
          }
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