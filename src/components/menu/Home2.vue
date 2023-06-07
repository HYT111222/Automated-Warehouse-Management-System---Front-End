<template>
    <div class="whole">
        <el-container class="whole">
        <el-header class="header" style="height: 50px;">
            <div class="header-left">
                <div class="logo-box">
                    <div class="logo"><img src="@/assets/image/logo.png" width="40px" height="40px"  class="img"/></div>
                        <span class="system-name text">自动化仓库管理系统</span>
                        <!-- <div style="margin-left: 40px;">
                            <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div> -->
                </div>


            </div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 客服聊天 -->
                    <div style="cursor: pointer; font-size: 16px" @click="contact" class="text-shadow text">联系客服</div>
                    <!-- 用户头像 -->
                    <div class="user-avator"><img src="@/assets//image/R.jpg" /></div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name text-shadow" trigger="click" @command="handleCommand" >
                        <span class="el-dropdown-link text" >
                            {{ username }}

                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item disabled class="text-shadow2">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="personal" class="text-shadow2">个人中心</el-dropdown-item>
                            <el-dropdown-item command="loginout" class="text-shadow2">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container class="aside"  >
            <el-aside width="200px" >
                <el-menu   router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
                    <el-menu-item index="HomePage" class="el-menu-item">
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>首页</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="1" class="test">
                        <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">人员管理模块</span>
                        </template>
                        <el-menu-item index="enter" class="el-menu-item">入库交接人</el-menu-item>
                        <el-menu-item index="outer" >出库交接人</el-menu-item>
                        <el-menu-item index="company" >客户</el-menu-item>
                        <el-menu-item index="staff" >员工</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" class="test">
                        <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">出/入库管理模块</span>
                        </template>
                        <el-menu-item index="inStock" >入库</el-menu-item>
                        <el-menu-item index="outStock" >出库</el-menu-item>
                        <el-menu-item index="managerCheck" v-if="isManager==true">审批中心</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="area" >
                        <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span>仓库管理模块</span>
                        </template>
                    </el-menu-item>
                    <!-- <el-submenu index="3" class="test">
                        <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">仓库管理模块</span>
                        </template>
                        <el-menu-item index="area" >库区管理</el-menu-item>
                        <el-menu-item index="shelf" >货架管理</el-menu-item>
                    </el-submenu> -->
                    <el-menu-item index="parcel" >
                        <template slot="title">
                        <i class="el-icon-s-cooperation"></i>
                        <span>包裹管理模块</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="data" class="el-menu-item">
                        <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span>数据统计</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                    <!-- 路由占位符 -->
            <router-view></router-view>
            <!-- <transition name="slide-fade">
                <router-view v-if="isRouterAlive"></router-view>
            </transition> -->
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default{
    provide() {
    return {
      reload: this.reload
    };
  },
    data() {
      return {
        username:'HYT',
        isManager:true,
        isRouterAlive: true,

      };
    },
    created(){
        this.username = window.sessionStorage.getItem('userName')
        if (window.sessionStorage.getItem('authority') == "manager"){
            this.isManager=true
        }else{
            this.isManager=false
        }

    },
    methods:{
        reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
            this.isRouterAlive = true;
        });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
        if (command == 'loginout') {
            localStorage.removeItem('ms_username');
            this.$router.push('/login');
            window.localStorage.clear()
            window.sessionStorage.clear()
        }
        },
        // 联系客服
        contact() {
            this.$router.push('/contact');//跳转
        },
        personal(){
            this.$router.push('/personalPage')
        }
    }

}
</script>

<style lang="less" scoped>
/**动画 */
.text-shadow2:hover{
    transform: scale(107%,107%);
    // text-shadow: 3px 5px 5px #8f929a;
}
.text-shadow:hover{
    transform: scale(110%,110%);
    text-shadow: 3px 5px 5px #8f929a;
}
.test:hover,
.el-menu-item:hover{
    transform: scale(110%,110%);
    text-shadow:5px 5px 10px rgba(21, 118, 208, 0.5);
}
 .slide-fade {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  top: 0;
  right: 0;
  position:relative;
  transform: translateY(100%);
}
.slide-fade-enter-active {
  transition: all 0.5s linear;
}
.slide-fade-leave-active {
  transition: all 0.5s linear;
  transform: translateY(-100%);
  z-index: 9;
}
/**------------------总------------------------ */
.whole {
    height: 100%;
    width: 100%;
}
.text {
    color: aliceblue;
}
.main {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding:10px;//设置内部边缘距离
    // position: relative;
    // background-image: url('@/assets/image/');rrgb(203, 220, 246);rgb(254, 250, 195);
    background-color:rgb(203, 220, 246);
}
/* --------------- 左侧导航栏 --------------------- */

.aside {
    height: 100%;
}
/* --------------- 顶层导航栏 --------------------- */
.header {
    height: 50px;//在此设置不管用，要在style里
    background-color: #4481eb;
   // position: relative;//内部元素可以使用 top、bottom、left、right 属性来调整它的位置。
}
/* -------------左-------------*/
.logo-box {
    display: flex;
    align-items: center;
    height: 50px;
}
.system-name {
    margin-left: 10px;
    font-size: medium;
    font-style: italic;
}
.img {
    margin-left: 10px;
    border-radius: 20%;
}
.header-left {
    float: left;
    position: absolute;//相对于最近的已定位祖先元素进行定位。如果没有已定位的祖先元素，则相对于浏览器窗口进行定位
    left: 0px;
}

/* -------------右-------------*/
.header-right {
    float: right;
}
.header-user-con {
    margin-top: 5px;
    display: flex;
    align-items: center;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.user-name {
    margin-left: 15px;

}
.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
