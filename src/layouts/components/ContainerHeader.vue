<script setup>
import { useRouter } from "vue-router";
import {
  Fold, UserFilled, User, Setting, EditPen, Lock, Notebook, Refresh, SwitchButton
} from "@element-plus/icons-vue";

const emits = defineEmits(['CollapseChange'])
const router = useRouter()
const gopack = () => {
  emits('CollapseChange')
}
const amplification = () => {
// 全屏/缩小
  const elem = document.documentElement; // 获取整个文档的根节点元素

  if (document.fullscreenElement) {
    // 当前是全屏状态
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  } else {
    // 当前不是全屏状态
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
}
const cleanTheCache = () => {
  // 清理缓存
  localStorage.clear()
  sessionStorage.clear()
}
const logout = () => {
  // User.user.loginOut()
  router.push('/')
}
</script>

<template>
  <div class="toolbar">
    <div class="function-l">
      <el-icon class="fun-ico" size="35" @click="gopack">
        <component :is="Fold"/>
      </el-icon>
    </div>
    <el-dropdown class="setting">
      <div style="display: flex;justify-content: center;align-items: center">
        <el-icon size="25">
          <UserFilled/>
        </el-icon>
        <span style="margin-left: 15px;">欢迎您！</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="">
            <el-icon>
              <User/>
            </el-icon>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item @click="">
            <el-icon>
              <Setting/>
            </el-icon>
            账户设置
          </el-dropdown-item>
          <el-dropdown-item @click="">
            <el-icon>
              <EditPen/>
            </el-icon>
            系统设置
          </el-dropdown-item>
          <el-dropdown-item @click="">
            <el-icon>
              <Lock/>
            </el-icon>
            密码修改
          </el-dropdown-item>
          <el-dropdown-item @click="">
            <el-icon>
              <Notebook/>
            </el-icon>
            切换部门
          </el-dropdown-item>
          <el-dropdown-item @click="cleanTheCache">
            <el-icon>
              <Refresh/>
            </el-icon>
            清理缓存
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.toolbar {
  position: relative;

  .function-l {
    float: left;
    display: flex;
    height: 50px;
    align-items: center;

    .fun-ico {
      width: 26px;
      height: 25px;
      margin-right: 50px;
      cursor: pointer;
      color: #fff;
    }
  }

  .function-r {
    float: right;
    display: flex;
    height: 50px;
    align-items: center;

    .fun-ico {
      width: 26px;
      height: 25px;
      margin-left: 50px;
      cursor: pointer;
    }
  }

  .setting {
    color: #fff;
    float: right;
    cursor: pointer;
    display: flex;
    height: 50px;
    align-items: center;
  }
}
</style>