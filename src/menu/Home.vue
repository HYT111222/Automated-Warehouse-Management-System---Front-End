<template>
    <el-container class="home-container">
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color=#69a7e5
          text-color="#EAEDF1"
          active-text-color="#b2b2b2"
          :collapse-transition="false"
          router="true" >
          <!-- 一级菜单1 -->
          <el-submenu>
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-home"></i>
              <!-- 文本 -->
              <span>功能主页</span>
            </template>
            <el-menu-item index="enter">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>入库</span>
                </template>
              </el-menu-item>
              <el-menu-item index="out">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>出库</span>
                </template>
              </el-menu-item>
              <el-menu-item index="plan">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>仓库实时平面图</span>
                </template>
              </el-menu-item>
              <el-menu-item index="seek">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>包裹信息查询</span>
                </template>
              </el-menu-item>
        </el-submenu>
        <el-submenu>
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user"></i>
              <!-- 文本 -->
              <span>个人中心</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group>
              <!-- <template slot="title">个人信息中心</template> -->
              <el-menu-item index="personalPage">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>个人主页</span>
                </template>
              </el-menu-item>
              <el-menu-item index="changeInfo">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>消费记录</span>
                </template>
              </el-menu-item>
              <el-menu-item index="changePW">
                <template slot="title">
                  <i class="el-icon-edit"></i>
                  <span>密码修改</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="userManagement" >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-place"></i>
              <!-- 文本 -->
              <span>数据统计</span>
            </template>
        </el-submenu>
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
.el-aside{
  background-color: #69a7e5;
  height: 800px;
}
.el-main{
  background-color: #e8f2fa;
  height: 100%;
}
.el-icon-s-home,.el-icon-video-camera,.el-icon-user,.el-icon-user-solid,.el-icon-user-solid,.el-icon-edit,.el-icon-place{
    color: #e8f2fa;
}
</style>
