import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入全局的样式文件
import "@/assets/scss/index.scss";

import "vant/lib/index.css";

import { Popup, Button, DatePicker, Field, Area } from "vant";

createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(DatePicker)
  .use(Field)
  .use(Popup)
  .use(Area)
  .mount("#app");
