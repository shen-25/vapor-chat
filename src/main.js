import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

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
  Popover,
  Checkbox,
  CheckboxGroup,
  Cell,
} from "vant";

import { useImClient } from "./im/core/use-im-client";

const app = createApp(App);

import { setupStore } from "./store/index";
// 配置store
setupStore(app);

app.provide("$imSdk", useImClient);

app.use(router);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Cell);
app.use(Picker);
app.use(Uploader);
app.use(Popover);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(Button).use(DatePicker).use(Popup).use(Area).mount("#app");
