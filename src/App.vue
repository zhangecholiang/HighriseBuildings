<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { onMounted } from "vue";
import { getToken } from "@/apis/index.js";
import { useStore } from "@/stores/user.js";
import { getCommunity, getTreeMenu, getVillage } from "@/apis/dict.js";
import { useDict } from "@/stores/dict.js";
// import { useStore } from './stores/user';
// const store = useStore()
// const query = new URLSearchParams(location.href.split('?')[1])
// const token = query.get('token')
// 判断 `url` 是否携带 `token`
// 如果携带，则存储到全局状态，同时存储到本地缓存
// 如果未携带，则从本地缓存读取，读取成功时存储到全局状态
// if (token) {
//   store.setToken(token)
//   sessionStorage.setItem('token', token)
// } else {
//   const localToken = sessionStorage.getItem('token') || ''
//   if (localToken) {
//     store.setToken(localToken)
//   }
// }
const store = useStore()
const dict = useDict()
onMounted(async () => {
  if (store.token) return
  const {data} = await getToken()
  store.setToken(data.token)
  const csq = await getVillage()
  dict.setSqList(csq.data)
  const xq = await getCommunity(null)
  dict.setXqList(xq.data)
  const jzwxz = await getTreeMenu(875)
  dict.setJzwxzlist(jzwxz.data)
  const gcjzlb = await getTreeMenu(873)
  dict.setGcjzlblist(gcjzlb.data)
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>