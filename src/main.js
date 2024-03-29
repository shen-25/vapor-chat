import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入全局的样式文件
import "@/assets/scss/index.scss";

import "vant/lib/index.css";

import {
  Popup,
  Button,
  DatePicker,
  Field,
  Area,
  Form,
  CellGroup,
  Picker,
  Uploader,
} from "vant";

import { useImClient } from "./im/core/use-im-client";

const app = createApp(App);

import { setupStore } from "./store/index";
// 配置store
setupStore(app);

app.provide("$imSdk", useImClient);

app.use(store).use(router);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Picker);
app.use(Uploader);

app.use(Button).use(DatePicker).use(Popup).use(Area).mount("#app");
