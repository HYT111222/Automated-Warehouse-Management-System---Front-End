<template>
    <div class="welcome_container">
     
          <h3 class="titleBox" >
            自 动 化 仓 库 管 理 系 统
          </h3>
     
      
      <div class="welcome_box">
        
          <div class="button_box" >
          
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
      background-image: url("../../assets/welcome7.jpg");
      height: 100%;
      width: 100%;
      position:fixed;
      background-size:100% 100%;
  }
  
  .welcome_box{
      width: 300px;
      height: 350px;
      background-color:  rgba(111, 98, 98, 0.4);
      // background-color: transparent !important;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      top:44%;
      transform: translate(-50%, -20%);
  }
  
  .el-button{
  color: rgb(235, 241, 244);
  background-color:  rgba(200, 199, 199, 0.142);
  border-color: rgb(235, 241, 244);
  height: 50px;
  width: 250px;
  font-size: 17px;
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
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  // font-family:monospace;
  color: rgb(235, 241, 244);
  left: 12%;
  // bottom: 10px;
  // margin-left: 15%;
  // transform: translate(-50%,-50%);
  position: absolute;
  // top:10%;
  }


  </style>
  