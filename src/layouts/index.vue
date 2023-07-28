<script setup>
import ContainerHeader from "@/layouts/components/ContainerHeader.vue";
import AsideMenu from "@/layouts/components/AsideMenu.vue";
import { ref } from "vue";

const Collapse = ref()
const closeColl = () => {
  Collapse.value.closeColl()
}
</script>

<template>
  <el-container class="common-layout">
    <el-aside>
      <el-scrollbar>
        <!--        <MenuheaderLogo></MenuheaderLogo>-->
        <AsideMenu ref="Collapse"></AsideMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <ContainerHeader @CollapseChange="closeColl"></ContainerHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-container,
.common-layout {
  .el-aside {
    width: auto;
    height: 100vh;
    background: #002140;
    //box-shadow: 2px 0px 20px 0px rgba(5, 49, 155, 0.5);

    .el-scrollbar {
      height: calc(100vh - 94px);
    }
  }

  .el-header {
    height: 59px;
    //background: #002140;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
  }

  .el-main {
    position: relative;
  }
}

</style>