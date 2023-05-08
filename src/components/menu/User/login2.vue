<template>
    <div class="system">
        <!-- 一级菜单下面所拥有的二级菜单 -->
        <el-aside>
            <SideMenu :lists="lists"></SideMenu>
        </el-aside>
 
        <!-- 以及二级菜单所对应的页面 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </div>
</template>
 
<script>
import SideMenu from '@/components/MenuGlobal/sidebar.vue';
export default {
    components: {
        SideMenu
    },
    data() {
        return {
            lists: [
                {
                    title: '菜单管理',
                    children: [
                        { index: 'test', title: '菜单管理' },
                        { index: 'contentManage', title: '内容管理' },
                        { index: 'roleManage', title: '角色管理' }
                    ]
                },
                {
                    title: '系统管理',
                    children: [
                        {
                            index: 'systemManage',
                            title: '系统设置'
                        }
                    ]
                }
            ]
        };
    }
};
</script>
 
<style scoped>
</style>