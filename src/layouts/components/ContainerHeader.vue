<script setup>
import { useRouter } from "vue-router";
import { Fold, Refresh, SwitchButton, UserFilled } from "@element-plus/icons-vue";
import { useStore } from "@/stores/user.js";

const store = useStore ();
const emits = defineEmits ([ "CollapseChange" ]);
const router = useRouter ();
const gopack = () => {
  emits ("CollapseChange");
};
const goHome = () => {
  window.location.href = "http://kfq.kejin.net.cn:8005/deskV5.aspx?fh=sjdz";
};
const amplification = () => {
// 全屏/缩小
  const elem = document.documentElement; // 获取整个文档的根节点元素

  if (document.fullscreenElement) {
    // 当前是全屏状态
    if (document.exitFullscreen) {
      document.exitFullscreen ();
    }
  } else {
    // 当前不是全屏状态
    if (elem.requestFullscreen) {
      elem.requestFullscreen ();
    }
  }
};
const cleanTheCache = () => {
  // 清理缓存
  localStorage.clear ();
  sessionStorage.clear ();
};
const gobigScreen = () => {
  console.log (store.token)
  if (store.userInfo.ssdepartdlid == 20) {
    window.open (`http://kfq.kejin.net.cn:8001/bigscreenv2/#/highbuilding-inspection-csq?token=${ store.token }`)
  } else {
    window.open (`http://kfq.kejin.net.cn:8001/bigscreenv2/#/highbuilding-inspection-kfq?token=${ store.token }`)
  }
}
const logout = () => {
  localStorage.clear ();
  // router.push('/')
  window.location.href = "http://kfq.kejin.net.cn:8005/login_230307.aspx";
};
</script>

<template>
  <div class="toolbar">
    <el-row>
      <el-col :span="18">
        <div class="function-l">
          <el-icon class="fun-ico" size="35" @click="gopack">
            <component :is="Fold"/>
          </el-icon>
          <span style="color: #000c17;line-height: 59px">欢迎进入 昆山开发区应急高层建筑检查系统</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="platform" @click="gobigScreen"></div>
      </el-col>
      <el-col :span="1">
        <div class="home" @click="goHome"></div>
      </el-col>
      <el-col :span="3">
        <el-dropdown class="setting">
          <div style="display: flex;justify-content: center;align-items: center">
            <el-icon size="25">
              <UserFilled/>
            </el-icon>
            <span style="margin-left: 15px;">欢迎您！{{ store.userInfo.realName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
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
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.toolbar {
  .el-row {
    align-items: center;
  }

  .platform {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 32px;
    height: 35px;
    background: url("/static/images/dp.png") no-repeat top/ 100% 100%;
  }

  .home {
    background: url("https://bpic.588ku.com/element_origin_min_pic/01/39/37/31573cba85d4ebb.jpg") no-repeat
      top/ 100% 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .function-l {
    display: flex;
    height: 59px;
    align-items: center;

    .fun-ico {
      width: 26px;
      height: 25px;
      margin-right: 25px;
      cursor: pointer;
      color: #000;
    }
  }

  .function-r {
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
    color: gray;
    float: right;
    cursor: pointer;
    margin-right: 10px;
    display: flex;
    height: 59px;
    align-items: center;
  }
}
</style>