import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.less";
import "normalize.css/normalize.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import store from "./stores";


const app = createApp (App);
app.use (store);
app.use (router);
app.use (ElementPlus);
app.mount ("#app");
