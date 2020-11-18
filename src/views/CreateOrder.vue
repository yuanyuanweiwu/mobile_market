<template>
  <div class="create-order">
    <s-header :title="'生成订单'"></s-header>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>{{ address.userName }}</span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{ address.provinceName }} {{ address.cityName }}
        {{ address.regionName }} {{ address.detailAddress }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in carList" :key="index">
        <div class="good-img">
          <img :src="item.goodsCoverImg" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-price">
            <div class="price">¥2000</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block
        >生成订单
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import SHeader from "../components/SimpleHeader";
import { getLocal, setLocal } from "../common/js/utils";
import { getByCartItemIds } from "../service/cart";
import { getAddressList, getDefaultAddress } from "../service/address";
export default {
  components: {
    SHeader,
  },
  data() {
    return {
      carList: [],
      address: {},
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    total: function() {
      let sum = 0;
      this.carList.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    },
  },
  methods: {
    async init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { cartItemIds, addressId } = this.$route.query;

      const _cartItemIds = cartItemIds
        ? JSON.parse(cartItemIds)
        : JSON.parse(getLocal("cartTiemIds"));
      setLocal("cartItemIds", JSON.stringify(_cartItemIds));
      const { data: list } = await getByCartItemIds({
        cartItemIds: _cartItemIds.join(","),
      });
      const { data: address } = addressId
        ? await getAddressList(addressId)
        : await getDefaultAddress(addressId);

      if (address) {
        this.$router.push({ path: "address" });
        return;
      }
      this.address = address;
      this.carList = list;
      Toast.clear();
    },
    goTo() {
      this.$router.push({
        path: `address?cartItemIds=${JSON.stringify(this.cartItemIds)}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.create-order {
  background: #f9f9f9;
  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 40px;
    font-size: 14px;
    padding: 14px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .good {
    margin-bottom: 120px;
    .good-item {
      padding: 10px;
      display: flex;
      background: #fff;
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
        .good-price {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    .price {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
