<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <i class="iconfont icon-shouye " />
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item active" to="category">
        <i class="iconfont icon-fenlei" />
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item active" to="cart">
        <van-icon  name="shopping-cart-o" :badge ="!count ?'':count" />
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item active" to="user">
        <i class="iconfont icon-wode" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
 import { getLocal } from '../common/js/utils'
export default {
  data() {
    return {};
  },
  mounted() {
    const token = getLocal("token");
    if (token) {
      this.$store.dispatch("updateCart");
    }
  },
  computed: {
    count() {
      return this.$store.state.cartCount;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 999;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
      .van-icon{
        .van-info{
          right: 30px;
        }
      }
    }
  }
}
</style>
