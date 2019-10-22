import router from "./router";
import store from "@/store";
import { getMenue } from "@/api/login";
import layout from "@/layout";

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    //先判断是否跳转到登录页面
    next();
  } else {
    if (localStorage.getItem("account")) {
      //判断是否登录未登录跳转到登录页面
      if (store.state.menuData.length > 0) {
        //已登录再判断vuex中是否有菜单内容，没有重新请求
        console.log("有菜单");
        next();
      } else {
        console.log("没菜单");
        getMenue().then(res => {
          let children = routerHandler(res);
          let routerData = [{ name: "首页", path: "/layout", component: layout, children }];
          router.addRoutes(routerData);
          let menuData = menuHandler(children);
          store.commit("menuData", menuData);
          next({ ...to, replace: true });
        });
      }
    } else {
      next({ path: "/", query: { redirect: to.fullPath } });
    }
  }
});

function menuHandler(data) {
  return data.map(el => {
    if (Array.isArray(el.children) && el.children.length > 0) {
      el.children = menuHandler(el.children);
    }
    return {
      title: el.name,
      path: el.path,
      children: el.children
    };
  });
}
//
function routerHandler(data) {
  return data.map(el => {
    if (Array.isArray(el.children) && el.children.length > 0) {
      el.children = routerHandler(el.children);
    }
    return {
      name: el.text,
      path: el.attributes.Params.path,
      component: () => import(`@/views/${el.attributes.url}`),
      children: el.children
    };
  });
}
export default router;
