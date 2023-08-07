<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import {onMounted, ref} from "vue";
import {getToken, getTokenuser} from "@/apis/index.js";
import {useStore} from "@/stores/user.js";
import {getCommunity, getTreeMenu, getVillage} from "@/apis/dict.js";
import {useDict} from "@/stores/dict.js";

const store = useStore();
const dict = useDict();
const iftoken = ref("");
onMounted(async () => {
  const query = new URLSearchParams(location.href.split("?")[1]);
  const token = query.get("token");
  if (token) {
    store.setToken(token);
    const user = await getTokenuser(token);
    store.setUserInfo(user.data);
  }
  if (localStorage.getItem('iftoken') === iftoken.value) {
  } else {
    localStorage.setItem("iftoken", iftoken.value);
    iftoken.value = token
    const {data} = await getToken();
    store.setToken(data.token);
    const csq = await getVillage();
    dict.setSqList(csq.data);
    const xq = await getCommunity(null);
    dict.setXqList(xq.data);
    const jzwxz = await getTreeMenu(875);
    dict.setJzwxzlist(jzwxz.data);
    const gcjzlb = await getTreeMenu(873);
    dict.setGcjzlblist(gcjzlb.data);
  }
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>