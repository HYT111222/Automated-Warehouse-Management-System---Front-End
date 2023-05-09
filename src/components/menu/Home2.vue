<template>
    <div class="whole">
        <el-container class="whole">
        <el-header class="header">
            <div class="header-left">
                <div class="logo-box">
                    <div class="logo"><img src="@/assets/logo.png" width="50px" height="50px"  class="img"/></div>
                        <span class="system-name">xxx仓库管理系统</span>
                </div>
               
            </div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 客服聊天 -->
                    <div style="cursor: pointer; font-size: 16px" @click="contact">联系客服</div>
                    <!-- 用户头像 -->
                    <div class="user-avator"><img src="@/assets/R.jpg" /></div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ username }}
                            
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item disabled>修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="personal">个人中心</el-dropdown-item>
                            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container class="aside"  >
            <el-aside width="200px" >
                <el-menu   router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">人员管理模块</span>
                        </template>
                        <el-menu-item index="enter">入库交接人</el-menu-item>
                        <el-menu-item index="outer">出库交接人</el-menu-item>
                        <el-menu-item index="company">客户</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">出/入库管理模块</span>
                        </template>
                        <el-menu-item index="outStock">出库</el-menu-item>
                        <el-menu-item index="inStock">入库</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">仓库管理模块</span>
                        </template>
                        <el-menu-item index="area">库区管理</el-menu-item>
                        <el-menu-item index="shelf">货架管理</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="parcel">
                        <template slot="title">
                        <i class="el-icon-s-cooperation"></i>
                        <span>包裹管理模块</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="data">
                        <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span>数据统计</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                    <!-- 路由占位符 -->
            <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default{
    data() {
      return {
        username:'HYT',
       
      };
    },
    methods:{
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
.whole {
    height: 100%;
    width: 100%;
}
/* --------------- 左侧导航栏 --------------------- */

.aside {
    height: 100%;
}
/* --------------- 顶层导航栏 --------------------- */
.header {
    height: 70px;
    background-color: antiquewhite;
    position: relative;//内部元素可以使用 top、bottom、left、right 属性来调整它的位置。
}
/* -------------左-------------*/
.logo-box {
    display: flex;
    align-items: center;
    height: 65px;
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
    width: 50px;
    height: 50px;
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