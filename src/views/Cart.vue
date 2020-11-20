<template>
  <div class="cart-box">
    <simple-header :title="'购物车'"></simple-header>
    <div class="cart-body">
      <van-checkbox-group
        v-model="result"
        @change="groupChange"
        ref="checkboxGroup"
      >
        <van-swipe-cell
          :right-width="50"
          v-for="(item, index) in carList"
          :key="index"
        >
          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />
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
                  :max="5"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="numberChange"
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
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="total * 100"
      button-text="去结算"
      @submit="onSubmit"
      class="submit-all"
    >
      <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  SwipeCell,
  CheckboxGroup,
  Checkbox,
  SubmitBar,
  Stepper,
  Toast,
} from "vant";
import SimpleHeader from "../components/SimpleHeader";
import { getCart, modifyCartNumber } from "../service/cart";

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
      result: [],
      checkAll: false, //全选按钮,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      Toast.loading({ message: "loading...", forbidClick: true });

      const { data } = await getCart({ pageNumber: 1 });
      this.carList = data;
      this.result = data.map((item) => item.cartItemId);
      Toast.clear();
    },
    //步进器数量
    async numberChange(value, detail) {
      if (
        this.carList.filter((item) => item.cartItemId == detail.name)[0]
          .goodsCount == value
      )
        return;
      const params = {
        cartItemId: detail.name,
        goodsCount: value,
      };

      const { data, resultCode } = await modifyCartNumber(params);
      if (resultCode === 200) {
        this.carList.forEach((item) => {
          if (item.cartItemId === detail.name) {
            item.goodsCount = value;
          }
        });
      }
    },
    //每个checkbox触发事件
    groupChange(result) {
      if (result.length == this.carList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.result = result;
    },
    //结算
    onSubmit() {
      const params = JSON.stringify(this.result);
      this.$router.push({ path: `createOrder?cartItemIds=${params}` });
    },
    //全选
    allCheck() {
      //首先判断checkAll ，如果是true改为false，result清空，价格清空
      //如果是false，改为true，result填满，算价格
      if (this.checkAll) {
        this.result = this.carList.map((item) => item.cartItemId);
      } else {
        this.result = [];
      }
    },
  },
  computed: {
    total: function() {
      let price = 0;
      let tmpList = this.carList.filter((item) =>
        this.result.includes(item.cartItemId)
      );
      tmpList.forEach((item) => (price += item.goodsCount * item.sellingPrice));
      return price;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      margin-left: 1px;
      height: 100%;
    }
  }
  .submit-all {
    margin-bottom: 55px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
}
</style>
