<script setup>

// const appstore = appStore();
</script>

<template>
  <div class="header-box">
    <div class="icon"></div>
    <div class="ic-lian"></div>
    <div class="ic-title">
      <div class="to-tit">
        关爱行动
      </div>
      <div class="bo-tit">
        我们在行动！
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-box {
  height: 94px;
  display: flex;
  margin-left: 20px;
  position: relative;

  .icon {
    width: 41px;
    height: 42px;
    background: url("@/assets/imgs/logo@2x.png") no-repeat top/ 100% 100%;
    margin-top: 15px;
    margin-right: 5px;
  }

  .ic-lian {
    position: absolute;
    left: 50px;
    top: 15px;
    width: 1px;
    height: 43px;
    border: 1px solid #F5F5F5;
  }

  .ic-title {
    margin-left: 25px;

    .to-tit {
      margin-top: 8px;
      height: 35px;
      font-size: 27px;
      font-family: YouSheBiaoTiHei;
      color: #FFFFFF;
      line-height: 35px;
      letter-spacing: 2px;
    }

    .bo-tit {
      width: 85px;
      height: 13px;
      font-size: 13px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
}
</style>