<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {routes} from "@/router/index.js";

const route = useRoute();
const isCollapse = ref(false);
const closeColl = () => {
  isCollapse.value = !isCollapse.value;
};
defineExpose({
  closeColl
});
</script>

<template>
  <el-menu
      :collapse="isCollapse"
      :default-active="route.path"
      :unique-opened="true"
      active-text-color="#fff"
      class="el-menu-vertical-demo">
    <template v-for="v in routes">
      <el-sub-menu v-if="v.children" :index="String(v.path)">
        <template #title>
          <el-icon>
            <component :is="v.meta.icon"/>
          </el-icon>
          <span class="menu-title">{{ v.meta.name }}</span>
        </template>
        <template v-for="vitem in v.children">
          <el-sub-menu v-if="vitem.children" :index="String(vitem.path)">
            <template #title>
              <el-icon>
                <component :is="vitem.meta.icon"/>
              </el-icon>
              <span class="menu-title">{{ vitem.meta.name }}</span>
            </template>
            <el-menu-item v-for="vv in vitem.children" :index="'/high-buildings/yhgl/'+vv.path"
                          @click="() => $router.push('/high-buildings/yhgl/'+vv.path)">
              <template #title>
                <el-icon>
                  <component :is="vv.meta.icon"/>
                </el-icon>
                {{ vv.meta.name }}
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="'/high-buildings/'+vitem.path"
                        @click="() => $router.push('/high-buildings/'+vitem.path)">
            <template #title>
              <el-icon>
                <component :is="vitem.meta.icon"/>
              </el-icon>
              {{ vitem.meta.name }}
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else-if="v.meta" :index="String(v.path)" @click="() => $router.push(v.path)">
        <template #title>
          <el-icon>
            <component :is="v.meta.icon"/>
          </el-icon>
          <span style="margin-left: 15px;">{{ v.meta.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="less" scoped>
:deep(.el-menu-item-group__title) {
  padding: 0;
}

.el-menu {
  background-color: #001529;
  border-right: none;
  --el-menu-hover-bg-color: #409EFF;
  --el-menu-text-color: #fff;
  --el-menu-bg-color: #000c17;
  --el-menu-active-color: #fff;

  .menu-title {
    font-size: 15px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    //color: #FFFFFF;
    line-height: 23px;
    letter-spacing: 1px;
  }

  .el-menu-item {
    //background-color: #027FBC;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}

.el-menu-item.is-active {
  background: #409EFF;
}

</style>