<template>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">
               
                <el-form :inline="true" :model="parcelInList" class="mag" :rules="rules">
                  <div  v-for= "(item) in parcelInList" >
                <el-form-item label="包裹ID:" prop="id">
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
                    <el-button type="primary" :loading="loading" @click="avgPlace('parcelInList')">入库</el-button>
                </el-form-item>
            </el-form>
          
              </el-tab-pane>

              <el-tab-pane label="出库" name="second">

                <el-form :inline="true" :model="parcelOutList" class="mag" :rules="rules">
                  <div  v-for= "(item) in parcelOutList" >
                <el-form-item label="包裹ID:" prop="id">
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
          <div class="can" >
            <!--SVG测试-->
            <!--若viewBox="0 0 x y"则会调整大小-->
            <svg
        class="mysvg"
        preserveAspectRatio="xMidYMid meet"
        :style="{
		   '--box':box}"
        >
        <circle id="mycircle" cx="50" cy="50" r="50" />
          </svg>
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
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,16}$/.test(value)) {
          return callback(new Error('长度在1-16个字符，只能包含数字、大小写字母'))
        }else {
          callback()
        }
      }

    return{
      //svg画布初始化数据
      box:"",
      parcelInList:[{}],//入库信息
      parcelOutList:[{}],//出库信息
      loading: false,//加载效果
      defaultTab:'first',
      parcelIn:{
        id:'',
        place: '',
        userName: ''//是否需要每次传用户名，还是用token？
      },
      parcelOut:{
        id:'',
        place: '',
        userName: ''
      },
      canvas:null,
      context:null,
      rules:{
        id:[{ validator: parcelID, trigger: 'blur' }]
      }
    }
  },
  //初始数据
  created(){
    const _this = this
    // this.parcelIn.userName = JSON.parse(window.localStorage.getItem('user')).userName
    // this.parcelOut.userName = JSON.parse(window.localStorage.getItem('user')).userName
    
    //SVG测试
    let temp = JSON.parse(window.localStorage.getItem('initData'))
    console.log(temp)
    let x = temp.capacity_x
    let y = temp.capacity_y
    this.box = "0 0 "+ x + " " + y
    console.log("svg")
    console.log(this.box)

    //初始化表单
    console.log(temp.gateMachine)
    for (let i = 0; i < temp.gateMachine; i++) {
      this.parcelInList[i] = this.parcelIn
      this.parcelOutList[i] = this.parcelOut
    }
    
  },
  //仓库初始化（画出平面图,前端自己算还是后端返回？）
  mounted() {

    },  

    methods: {
      //入库avg动画
      avgPlace(formName) {
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       console.log(this.parcelOut.place)
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          
        }
       })
       

      },
      //出库avg动画
      avgFetch(formName) {
        //表单验证-加载-发送请求-得到后端数据-关闭加载-触发动画
      },
      //切换
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="less" scoped>
.mysvg {
  viewBox: var(--box)
  
}
  .can {
    border: #101a28;
  }
</style>