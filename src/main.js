import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./mock";

import ElementUI from "element-ui";
import Fragment from "vue-fragment";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import "@/assets/css/main.css";
Vue.use(ElementUI);
Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
