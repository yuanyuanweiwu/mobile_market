import axios from "axios";
import { from } from "core-js/fn/array";
import { Toast } from "vant";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "//api.newbee.ltd/api/v1"
    : "//api.newbee.ltd/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLRequest";
axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    Toast.fail("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message);
    if (res.data.resultCode == 416) {
      // 返回 416 代表没有登录状态，路由跳转到/login 页面（目前还为创建组件），这里的 window.vRouter 是在
      // main.js 里面设置好的 window.vRouter = router
      window.vRouter.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }

  return res.data;
});
export default axios