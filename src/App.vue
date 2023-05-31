<template>
  <div id="app">
    <!-- <router-view/> -->
    <transition name="slide-fade">
	<router-view v-if="isRouterAlive"></router-view>
 </transition>
  
  </div>
</template>
<script>

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  },
  components: {}
};
</script>

<style >
@import url('@/assets/icon/iconfont.css');
/**删除浏览器滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
/* ::-webkit-scrollbar {
  width: 0 !important;
} */
/**动画 */
/* .slide-fade {
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
  position: absolute;
  transform: translateY(100%);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
  transform: translateY(-100%);
  z-index: 100;
} */
</style>
