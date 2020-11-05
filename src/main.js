import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import md5 from 'js-md5';
import {Button,Form,Field,Toast} from 'vant'
import store from "./store";
import 'lib-flexible/flexible'

Vue.use(Form).use(Field).use(Toast).use(Button)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.prototype.$md5=md5;