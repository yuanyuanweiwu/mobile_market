<template>
  <div class="cart-box">
    <simple-header :title="购物车"></simple-header>
    <div class="cart-body">
      <van-swipe-cell
        :right-width="50"
        v-for="(item, index) in carList"
        :key="index"
      >
        <div class="good-item">
          <van-checkbox />
          <div class="good-img"><img :src="item.goodsCoverImg" /></div>
          <div class="good-desc">
            <div class="good-title">
              <span>{{ item.goodsName }}</span>
              <span>x{{ item.goodsCount }}</span>
            </div>
            <div class="good-btn">
              <div class="price">¥{{ item.sellingPrice }}</div>
              <van-stepper
                integer
                :min="1"
                :value="item.goodsCount"
                :name="item.cartItemId"
                async-change
                @change="onChange"
              />
            </div>
          </div>
        </div>
        <van-button
          slot="right"
          square
          icon="delete"
          type="danger"
          class="delete-button"
          @click="deleteGood(item.cartItemId)"
        />
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { SwipeCell, CheckboxGroup, Checkbox, SubmitBar, Stepper } from "vant";
import SimpleHeader from "../components/SimpleHeader";
import SimpleHeader from "../components/SimpleHeader.vue";
export default {
  components: {
    SimpleHeader,
    [SwipeCell.name]: SwipeCell,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [Stepper.name]: Stepper,
  },
  data() {
    return {
      carList: [],
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.cart-box {
}
</style>
