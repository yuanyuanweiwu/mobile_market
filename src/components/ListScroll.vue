<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    //点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true,
    },
    //是否开岂横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    //是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false,
    },
    //列表数据
    scrollData: {
      type: Array,
      default: null,
    },
    //是否派发滚动底部事件
    pullUp: {
      type: Boolean,
      default: false,
    },
    pulldown: {
      type: Boolean,
      default: false,
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
      });
      //派发滚动事件
      if (this.listenScroll) {
        const self = this;
        this.scroll.on("scroll", (position) => {
          self.$emit("scroll", position);
        });
      }
      if (this.pullUp) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxDcrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      if (this.pulldown) {
        this.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            // 下拉刷新
            this.$emit("pulldown");
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          // 列表滚动前触发
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理 better-scroll 的 disable 方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理 better-scroll 的 enable 方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理 better-scroll 的 refresh 方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理 better-scroll 的 scrollTo 方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理 better-scroll 的 scrollToElement 方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
