<template>
    <div class="welcome_container">
      <transition  name="el-zoom-in-center" appear >
          <h3 class="titleBox" >
            自 动 化 仓 库 管 理 系 统
          </h3>
        </transition>
      
      <div class="welcome_box">
        
          <div class="button_box" >
            <transition-group name="el-zoom-in-center" appear>
              <el-col key="1">
                  <el-button round id="registerbtn" @click="registerAct">注 册</el-button>
              </el-col >
              <el-col key="2">
                  <el-button round @click="loginAct">登 录</el-button>
              </el-col>
              <el-col key="3">
                  <el-button round @click="title=!title">关 于 我 们</el-button>
              </el-col>
              <el-col key="4">
                  <el-button round>退 出</el-button>
              </el-col>
            </transition-group>
          </div>
        
      </div>
    
  </div>
    </template>
  
  <script>
  export default {
    name: 'app',
    components: {
    },
    data(){

      return{
        title: false
      }
    
    },
    created(){
      // setTimeout(this.test(),1000)
      
    },
    methods: {
      registerAct () {
        this.$router.push('/register')
      },
      loginAct () {
        this.$router.push('/login')
      },
      test(){
        
        this.title = true
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    .welcome_container {
      //background-color: #193653;
      background-image: url("../../assets/welcome.jpg");
      height: 800px;
  }
  
  .welcome_box{
      width: 350px;
      height: 350px;
      background-color: transparent !important;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      top:44%;
      transform: translate(-50%, -20%);
  }
  
  .el-button{
  color: rgb(17, 66, 88);
  background-color: #f0f4d2;
  border-color: rgb(17, 66, 88);
  height: 60px;
  width: 300px;
  font-size: larger;
  font-family: Youyuan;
  margin-bottom: 20px;
  }
  .button_box{
          //设置到中间
    position: absolute;
    left:50%;
    top:53%;
    transform: translate(-50%,-50%);
  }
  
  .titleBox{
  font-size: 80px;
  font-family: 华文行楷;
  color: white;
  margin-left: 10%;
  position: absolute;
  // top:10%;
  }


  </style>
  