import Vue from "vue";
import Router from "vue-router";

// 原文链接：https://blog.csdn.net/weixin_43202608/article/details/98884620
//解决跳转相同路由的报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
//----------------
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      // redirect: "/layout",
      component: () => import("@/views/login")
    }
    // {
    //   path: "/layout",
    //   name: "layout",
    //   component: () => import("@/layout"),
    //   children: [
    //     { path: "/layout/rep1", name: "rep1", component: () => import("@/views/report_one") },
    //     {
    //       path: "/layout/rep2",
    //       name: "rep2",
    //       component: () => import("@/views/report_two"),
    //       children: [{ path: "/layout/rep2/rep3", name: "rep3", component: () => import("@/views/report_three") }]
    //     }
    //   ]
    // }
  ]
});
