<template>
    <div class="welcome_container">
     
          <h3 class="titleBox" >
            Welcome to Automated warehouse management system
          </h3>
     
      <div class="welcome_box">
        <div class="welcome">
          <h3 class="pText">自动化仓库管理系统</h3>
          <h3 class="pText">Automated warehouse management system</h3>
          <div class="welcomeP">
            <img class="img" src="../../assets/welcome7.jpg" alt="">
          </div>
          
        </div>
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
  .img {
    border-radius: 10px;
    margin-left: 10%;
    width: 100%;
    height: 100%;
  }
  .pText{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    width: 300px;
    color: #ffffff;
    margin-left: 20%;
  }
  .welcome {
    width: 20%;
  }
  .welcome_box{
      width: 600px;
      height: 400px;
      background-color:  rgba(111, 98, 98, 0.4);
      // background-color: transparent !important;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      top:44%;
      transform: translate(-50%, -20%);
  }
  .welcomeP {
    width: 250px;
    height: 200px;
  }
  .el-button{
  color: rgb(235, 241, 244);
  background-color:  rgba(200, 199, 199, 0.142);
  border-color: rgb(235, 241, 244);
  height: 50px;
  width: 200px;
  font-size: 17px;
  font-family: Youyuan;
  margin-bottom: 20px;
  margin-left: 0%;
  }
  .button_box{
    width: 300px;
        //设置到中间
    position: absolute;
    left:70%;
    top:53%;
    transform: translate(-20%,-50%);
  }
  
  .titleBox{
  font-size: 60px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  // font-family:monospace;
  color: rgb(235, 241, 244);
  left: 10%;
  // bottom: 10px;
  // margin-left: 15%;
  // transform: translate(-50%,-50%);
  position: absolute;
  // top:10%;
  }


  </style>
  