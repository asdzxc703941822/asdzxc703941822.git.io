import axios from "axios";
import { Notification } from "element-ui";
import router from "../router";
import store from "../store";
const request = axios.create();
let url;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  url = "http://192.168.1.99:53559/api/";
} else if (process.env.NODE_ENV === "production") {
  url = "http://192.168.1.169:8088/api/";
}
request.defaults.baseURL = url;
request.defaults.timeout = 60 * 1000;
// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log(config);
    config.headers["Authorization"] = localStorage.getItem("access_token");
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code === 1) {
      Notification({
        showClose: true,
        message: response.data.msg,
        type: "error"
      });
    }
    return response.data.data;
  },
  function(error) {
    // 对响应错误做点什么
    // console.log(error);
    let message = "网络错误";
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message = "请求错误";
          break;
        case 401:
          message = "未授权或登录信息已过期，跳到登录界面";
          // setTimeout(() => {
          localStorage.removeItem("account");
          localStorage.removeItem("access_token");
          store.commit("menuData", []);
          router.push(location.href.split("#")[1]);
          // window.location.href = "index.html";
          // }, 3000);
          break;
        case 403:
          message = "拒绝访问";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        case 501:
          message = "服务未实现";
          break;
        case 502:
          message = "网关错误";
          break;
        case 503:
          message = "服务不可用";
          break;
        case 504:
          message = "网关超时";
          break;
        case 505:
          message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    Notification({
      showClose: true,
      message,
      type: "error"
    });
    // $.messager.alert("消息提示", message, "error");
    return Promise.reject(error);
  }
);
export default request;
