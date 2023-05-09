<template>
  <div id="app">
    <router-view/>
    <!-- <transition name="slide-fade">
	<router-view v-if="isRouterAlive"></router-view>
 </transition> -->
  
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
  transform: translateX(100%);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
  transform: translateX(-100%);
  z-index: 100;
} */


</style>
