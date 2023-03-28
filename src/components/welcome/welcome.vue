<template>
    <div class="welcome_container">
          <div class="titleBox">
            自 动 化 仓 库 管 理 系 统
          </div>
      <div class="welcome_box">
          <div class="button_box">
              <el-col>
                  <el-button round id="registerbtn" @click="registerAct">注 册</el-button>
              </el-col>
              <el-col>
                  <el-button round @click="loginAct">登 录</el-button>
              </el-col>
              <el-col>
                  <el-button round>关 于 我 们</el-button>
              </el-col>
              <el-col>
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
    methods: {
      registerAct () {
        this.$router.push('/register')
      },
      loginAct () {
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    .welcome_container {
      //background-color: #193653;
      background-image: url("../../assets/welcome.jpg");
      height: 900px;
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
  
//   .logo_box{
//       height: 130px;
//       width: 130px;
//       border: 1px solid ghostwhite;
//       background-color: ghostwhite;
//       border-radius: 50%;
//       padding: 5px;
//       box-shadow: 0 0 10px #2b4b6b;
//       position: absolute;
//       left: 50%;
//       transform: translate(-50%, -50%);
//   }
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
  top:10%;
  }
  </style>
  