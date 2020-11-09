<template>
  <div class="good">
    <header class="good-header">
      {{ name }}
    </header>
    <div class="good-box">
      <div
        class="good-item"
        v-for="(item, index) in list"
        :key="index"
        @click="go(item)"
      >
        <img
          v-if="item.goodsCoverImg.includes('http')"
          :src="`${item.goodsCoverImg}`"
          alt=""
        />
        <img v-else :src="`//47.99.134.126:28019/${item.goodsCoverImg}`" alt="" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    list: Array,
    goTodetail: Function,
  },
  methods: {
    go(item) {
      //1.父组件像react 直接传递函数 用v-bind绑定
      if (this.goTodetail) {
        this.goTodetail(item);
      }
      //2.this.$emit  用v-on 触发绑定的事件监听器
      // this.$emit("goTodetail", item);
      //3.this.$parent
      //this.$parent.goTodetail(item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 0;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(odd) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
