<template>
  <header  class="simple-header">
    <i class="iconfont icon-arrow-left-bold" @click="goBack"></i>
    <div class="simple-header-title">{{ title }}</div>
    <i class="iconfont icon-elipsis"></i>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .simple-header-title {
    font-size: 14px;
  }
}
</style>
