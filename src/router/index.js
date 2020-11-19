import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import category from '../views/Category.vue'
import user from '../views/User.vue'
import cart from '../views/Cart.vue'
import login from '../views/Login.vue'
import productList from '../views/ProductList.vue'
import detail from '../views/Detail.vue'
import productDetail from '../views/productDetail.vue'
import createOrder from '../views/CreateOrder.vue'
import address from '../views/Address.vue'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/", 
    name: "Home",
    redirect: Home,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      index: 1,
    },
  },
  {
    path: "/category",
    name: "category",
    component: category,
    meta: {
      index: 2,
    },
  },
  {
    path: "/user",
    name: "user",
    component:user,
    meta: {
      index: 1,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: cart,
    meta: {
      index: 1,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      index: 1,
    },
  },
  {
    path: "/productList",
    name: "productList",
    component: productList,
    meta: {
      index: 2,
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: detail,
    meta: {
      index: 2,
    },
  },
  {
    path: "/createOrder",
    name: "createOrder",
    component: createOrder,
    meta: {
      index: 2,
    },
  },
  {
    path: "/product/:id",
    name: "product",
    meta: {
      index: 3,
    },
    component: productDetail
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      index: 2
    },
    component: address,
  },
];

const router = new VueRouter({
  routes,
});


export default router;
