<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
    <nav-bar v-if="isshowNav"></nav-bar>
  </div>
</template>

<script>
import navBar from "./components/NavBar";
export default {
  data() {
    return {
      transitionName: "slide-left",
      isshowNav: true,
      showMenuList: ["/", "/home", "/category", "/cart", "/user",],
    };
  },
  components: {
    navBar,
  },
  watch: {
    $route(to, from) {
      if (this.showMenuList.includes(to.path)) {
        this.isshowNav = true;
      } else {
        this.isshowNav = false;
      }

      // 由主级到次级
      // to.meta 能取到 route 路由参数中的 meta 属性
      if (to.meta.index > from.meta.index) {
        // 通过改变变量名称控制左右滑动
        this.transitionName = "slide-left"; // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        this.transitionName = "slide-right";
      } else {
        this.transitionName = ""; //同级无过渡效果
      }
    },
  },
};
</script>
<style lang="less">
@import "./common/style/mixin";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1000;
}
.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
