<template>
  <div class="category-list">
    <div
      v-for="item in categoryList"
      :key="item.categoryId"
      class="category-item"
    >
      <img :src="item.imgUrl" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "navMiddle",
  data() {
    return {
      categoryList: [
        {
          name: "新蜂超市",
          imgUrl: "//s.weituibao.com/1583585285461/cs.png",
          categoryId: 100001,
        },
        {
          name: "新蜂服饰",
          imgUrl: "//s.weituibao.com/1583585285468/fs.png",
          categoryId: 100003,
        },
        {
          name: "全球购",
          imgUrl: "//s.weituibao.com/1583585285470/qq.png",
          categoryId: 100002,
        },
        {
          name: "新蜂生鲜",
          imgUrl: "//s.weituibao.com/1583585285472/sx.png",
          categoryId: 100004,
        },
        {
          name: "新蜂到家",
          imgUrl: "//s.weituibao.com/1583585285467/dj.png",
          categoryId: 100005,
        },
        {
          name: "充值缴费",
          imgUrl: "//s.weituibao.com/1583585285465/cz.png",
          categoryId: 100006,
        },
        {
          name: "9.9元拼",
          imgUrl: "//s.weituibao.com/1583585285469/pt.png",
          categoryId: 100007,
        },
        {
          name: "领劵",
          imgUrl: "//s.weituibao.com/1583585285468/juan.png",
          categoryId: 100008,
        },
        {
          name: "省钱",
          imgUrl: "//s.weituibao.com/1583585285471/sq.png",
          categoryId: 100009,
        },
        {
          name: "全部",
          imgUrl: "//s.weituibao.com/1583585285470/qb.png",
          categoryId: 100010,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.category-list {
  margin-top: 10px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .category-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
    }
    span {
      margin-bottom: 10px;
    }
  }
}
</style>
