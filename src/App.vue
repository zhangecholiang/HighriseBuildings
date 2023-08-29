<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { onMounted, ref } from "vue";
import { getTokenuser } from "@/apis/index.js";
import { useStore } from "@/stores/user.js";
import { getTreeMenu, getVillage } from "@/apis/dict.js";
import { useDict } from "@/stores/dict.js";

const store = useStore ();
const dict = useDict ();
const iftoken = ref ("1111");
onMounted (async () => {
  const query = new URLSearchParams (location.href.split ("?")[1]);
  const token = query.get ("token");
  if (token) {
    const user = await getTokenuser (token);
    store.setUserInfo (user.data);
    if (user.data.ssdepartdlid == 20) {
      store.setCsqLoginid (user.data.departLoginid);
    } else {
      store.setCsqLoginid (null);
    }
    store.setToken (token);
  } else {
    // window.location.href = "http://kfq.kejin.net.cn:8005/login_230307.aspx"
  }
  if (localStorage.getItem ('iftoken') === iftoken.value) {
    console.log (iftoken.value, 'sfdafdsaf')
  } else {
    iftoken.value = token
    localStorage.setItem ("iftoken", iftoken.value);
    const csq = await getVillage ();
    dict.setSqList (csq.data);
    const jzwxz = await getTreeMenu (875);
    dict.setJzwxzlist (jzwxz.data);
    const gcjzlb = await getTreeMenu (873);
    dict.setGcjzlblist (gcjzlb.data);
  }
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view v-if="store.token"></router-view>
  </el-config-provider>
</template>