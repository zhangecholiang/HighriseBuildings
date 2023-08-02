<script setup>

defineProps({
  msg: String,
});
const emit = defineEmits(["click"]);

</script>

<template>
  <div id="dialog-app" class="Globallist">
    <div class="box">
      <div class="header">
        <div class="closeBox" @click="emit('click')">
          <!--          <el-icon><Close /></el-icon>-->
          <img
              alt=""
              src="data:image/png;base64,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"/>
        </div>
        <div class="title">
          {{ msg }}
        </div>
      </div>
      <div class="content">
        <!--        <GlobalTable></GlobalTable>-->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Globallist {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .closeBox {
        width: 60px;
        height: 60px;
      }

      .title {
        margin-top: 10px;
        text-align: center;
        width: 100%;
        height: 53px;
        font-size: 38px;
        //font-family: PingFangSC-Medium, "PingFang SC";
        font-weight: 500;
        color: rgb(41, 211, 178);
        line-height: 53px;
      }
    }

    .content {
      width: 1276px;
      height: 740px;
      background: url("http://kfq.kejin.net.cn:8005/zyfwzx/wtzx_dp/assets/qybg-bbfde3d8.png");

      .el-table {
        padding-top: 20px;
        --el-table-header-text-color: #36D6FA;
        --el-table-header-bg-color: transparent;
        --el-table-bg-color: transparent;
        --el-table-tr-bg-color: transparent;
        --el-table-row-hover-bg-color: rgb(51, 96, 145);
        --el-table-border-color: none;
        color: #FFFFFF;

        /* 斑马线背景色 */

        // .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
        //   background: rgba(63, 94, 153, 0.5) !important;
        // }

        /* 鼠标悬停 */

        // .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
        //   background-color: rgba(90, 144, 255, 0.5) !important;
        // }
      }
    }
  }
}

</style>