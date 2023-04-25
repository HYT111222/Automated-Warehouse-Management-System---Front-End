<template>
    <el-container class="home-container">
    <el-container class="all">
      <el-aside width="140px">
        <!-- background-color=#69a7e5   text-color="#EAEDF1"-->
        <el-menu class="menu"
          text-color= #ffffff
          active-text-color="#3f3a3a"
          :collapse-transition="false"
          router="true" 
          >
              <el-menu-item index="plan">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>出库入库</span>
                </template>
              </el-menu-item>
              <el-menu-item index="seek">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>包裹信息查询</span>
                </template>
              </el-menu-item>
              <el-menu-item index="personalPage">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>个人主页</span>
                </template>
              </el-menu-item>
              <el-menu-item index="cost">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>消费中心</span>
                </template>
              </el-menu-item>
        <el-menu-item index="data" class="test">
        <i class="el-icon-place"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </template>

<script>
export default {
  name: 'Home',
  components: {
  },
  created () {
    const _this = this
    var User = JSON.parse(sessionStorage.getItem('user'))
    if (User) {
      var level = User.level
      console.log(level)
      if (level === 'admin') {
        _this.isNotAdmin = false
      }
    }
  },
  methods: {
    tryAction () {
      this.$router.push('/main')
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  data () {
    return {
      isNotAdmin: true
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
      background-image: url("../assets/welcome8.jpg");
      height: 100%;
      width: 100%;
      position:fixed;
      background-size:100% 100%;
}
// .all {
//   height: 660px;
// }
.el-aside{
  // opacity: 0.4;
  // background-color:#55585a+7a  ;
  background-color:  rgba(155, 147, 147, 0.7);
  color: #3f3a3a;
  // background-color: transparent !important;
  height: 100%;
  margin-top: 1%;
  border-radius: 3%;
}
.el-main{
  // background-color: transparent !important;
  height: 100%;
  margin-left: 1.5%;
  margin-top: 1%;
  border-radius: 3%;
  // margin-right: 2%;
  // opacity: 0.7;
  // background-color:#ffffff  ;
  background-color:  rgba(212, 204, 204, 0.83);
}
.menu {
  background-color: transparent !important;
}
.el-header {
  height: 30px;
  background-color: #d8e9f7;
}
.el-menu-item.is-active {
  color: #edeaea !important;
  background: #adb3b9 !important;
  background-color:  rgba(133, 134, 103, 0.485);
}

.el-icon-s-home,.el-icon-video-camera,.el-icon-user,.el-icon-user-solid,.el-icon-edit,.el-icon-place,.test{
    color: #ffffff;
}
</style>
