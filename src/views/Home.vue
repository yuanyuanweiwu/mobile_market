<template>
  <div class="home">
    <header class="home-header wrap" :class="{'active':headerScroll}">
      <router-link to="./category" tag="i">
        <i class="iconfont icon-category" />
      </router-link>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <router-link tag="span" to="./productList">发现精彩</router-link>
      </div>
      <router-link class="login" tag="span" to="'./Login.vue'" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="login" to="./User.vue" v-else tag="span">
        <van-icon name="user-o" />
      </router-link>
    </header>
    <swiper :list="swiperList" />
    <!-- 中部导航栏 -->
    <navMiddle />
    <!-- 新品上线 -->
    <goods-List :name='"新品上线"' :list='newGoodses'  :goTodetail='goTodetail'/>
    <!-- 热门商品 -->
    <goods-List :name='"热门商品"' :list='hots' :goTodetail='goTodetail'/>
    <!-- 最新推荐 -->
    <goods-List :name='"最新推荐"' :list='recommends' :goTodetail='goTodetail' :style="{paddingBottom:'100px'}"/>
  </div>
</template>  

<script>
import { getLocal } from "../common/js/utils";
import { getHome } from "../service/home";
import swiper from "@/components/Swiper";
import { Toast } from "vant";
import navMiddle from "../components/navMiddle";
import  GoodsList from '../components/GoodsList'
export default {
  name: "home",
  data() {
    return {
      isLogin: false,
      swiperList: [],
      newGoodses: [],
      recommends:[],
      hots:[],
      headerScroll:false
    };
  },
  components: {
    swiper,
    navMiddle,
    GoodsList
  },
  methods: {
    goTodetail(item){
      console.log(item)
    },
    pageScroll(){
      let scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop> 100? this.headerScroll=true:this.headerScroll=false
    }
  },
  async mounted() {
    window.addEventListener('scroll',this.pageScroll)
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
    Toast.loading({
      message: "loading",
      forbidClick: true,
    });
    const { data } = await getHome();
    this.swiperList = data.carousels; //轮播图
    this.newGoodses = data.newGoodses; //新品上线
    this.recommends = data.recommendGoodses; // 最新推荐
     this.hots = data.hotGoodses // 热门商品
    Toast.clear();
  },
  beforeDestroy(){
    window.removeEventListener('scroll')
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 999;
    .icon-category {
      font-size: 20px;
      font-weight: 700;
      color: @primary;
    }
    &.active {
      background: @primary;
      .icon-category,
      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      .wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
        margin-right: 10px;
      }
      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .login {
      color: @primary;
      line-height: 52px;
      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
  }
}
</style>
