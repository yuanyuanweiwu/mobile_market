<template>
  <div class="product-detail">
    <simple-Header :title="'商品详情'"></simple-Header>
    <div class="detail-content">
      <!-- 轮播图 -->
      <div class="detail-swip-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item
            v-for="(item, index) in detail.goodsCarouselList"
            :key="index"
          >
            <img :src="`${item}`" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品简要信息 -->
      <div class="product-info">
        <div class="product-title">{{ detail.goodsName }}</div>
        <div class="product-desc">免运费 顺丰包邮</div>
        <div class="product-price">
          <span>{{ detail.sellingPrice }}</span>
        </div>
      </div>
      <!-- 商品介绍 -->
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
      <!-- 商品导航 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge ="count ? count : ''" @click="goTo"  />
        <van-goods-action-button type="warning" text="加入购物车"  @click="addCart"/>
        <van-goods-action-button type="danger" text="立即购买" @click="goToCart"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import { getDetail } from "../service/good";
import { addCart } from "../service/cart";
import { Toast } from "vant";
export default {
  data() {
    return {
      detail: {
        goodsCarouselList: [],
      },
    };
  },
  components: {
    SimpleHeader,
  },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await getDetail(id);
    console.log(data);
    this.detail = data;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goTo() {
      this.$router.push({ path: "/cart" });
    },
    async addCart() {
      const { data, resultCode } = await addCart({
        goodsCount: 1,
        goodsId: this.detail.goodsId,
      });
      this.$store.dispatch("updateCart");
      if (resultCode === 200) Toast.success("添加成功");
    },
    async goToCart() {
      const { data, resultCode } = await addCart({
        goodsCount: 1,
        goodsId: this.detail.goodsId,
      });
      this.$store.dispatch("updateCart");
      this.$router.push({ path: "/cart" });
    },
  },
  computed:{
    count(){
      return this.$store.state.cartCount
    }
  }
};
</script>

<style lang="less">
@import "../common/style/mixin";
.product-detail {
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    margin-top: 44px;
    .detail-swip-wrap {
      .van-swipe-item img {
        width: 100%;
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        color: #333;
      }
      .prouct-desc {
        font-size: 14px;
        padding: 5px 0;
        color: #999;
      }
      .product-price {
        span {
          color: #f63515;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
    .product-content {
      padding: 0 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
