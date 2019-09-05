import router from "./router";
import store from "@/store";
import { getMenue } from "@/api/menue";
import layout from "@/layout";

getMenue().then(res => {
  let children = routerHandler(res);
  let routerData = [{ name: "layout", path: "/layout", component: layout, children }];
  router.addRoutes(routerData);
  // console.log(children);
  // store.state.menuData = menuHandler(children);
  let menuData = menuHandler(children);
  store.commit("menuData", menuData);
  // console.log(store.state.menuData);
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
