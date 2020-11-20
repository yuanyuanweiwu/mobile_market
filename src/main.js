import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import md5 from 'js-md5';
import {Button,Form,Field,Toast,Icon,Swipe,SwipeItem,Tabs,Tab,PullRefresh,List,GoodsAction,GoodsActionIcon,GoodsActionButton,AddressList,AddressEdit,Popup,Card } from 'vant'
import store from "./store";
import 'lib-flexible/flexible'

Vue.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(PullRefresh).use(List).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon).use(AddressList).use(AddressEdit ).use(Popup).use(Card)
Vue.config.productionTip = false;
window.vRouter = router
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.prototype.$md5=md5;