<script setup>
import { getHiddenDangerList } from "@/apis/hiddenTrouble.js";
import { ref } from "vue";

const yhTotal = ref();
const getTotal = async () => {
  const { data } = await getHiddenDangerList();
  yhTotal.value = data.total;
};
getTotal();
</script>

<template>
  <div class="process-box">
    <div class="process-list"><span @click="()=> $router.push('/high-buildings/jzwgl')">建筑物登记</span></div>
    <div class="process-list"><span @click="()=> $router.push('/high-buildings/jzwjc')">建筑物检查</span></div>
    <div class="process-list"><span @click="()=> $router.push('/high-buildings/yhgl/ybyh')">隐患分级</span></div>
    <div class="process-list">
      <div class="border-line"></div>
      <div class="process-list-item">
        <span style="position: relative" @click="()=> $router.push('/high-buildings/yhgl/ybyh')">隐患数量
        <span class="tip">{{ yhTotal }}</span>
        </span>
      </div>
      <div class="process-list-item">
        <span @click="()=> $router.push('/high-buildings/yhgl/ybyh')">隐患整改数量</span>
      </div>
    </div>
    <div class="process-list"><span>验收</span></div>
  </div>
</template>

<style lang="less" scoped>
.process-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .process-list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
    background-color: #fff;

    span {
      cursor: pointer;
      z-index: 1;
      border-radius: 5px;
      margin-bottom: 40px;
      text-align: center;
      font-size: 18px;
      width: 135px;
      height: 50px;
      line-height: 50px;
      color: #fff !important;
      background-color: #00a3ff !important;
      border: 1px solid #00a3ff !important;

      &:after {
        content: "";
        display: block;
        height: 40px;
        width: 2px;
        position: absolute;
        background-color: #b5b5b5;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
      }
    }

    &:nth-child(4) {
      justify-content: space-between;
      position: relative;

      .border-line {
        left: 12%;
        position: absolute;
        width: 76%;
        height: 100%;
        border: 2px solid #b5b5b5;
      }

      .process-list-item {
        width: 200px;
        height: 100px;
        background-color: #fff;
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          margin: 0;
        }

        span:after {
          content: none;
        }
      }

      .tip {
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: red !important;
        border: 1px solid red !important;
        border-radius: 50%;
        top: -12px;
        right: -12px;
        text-align: center;
        line-height: 25px;
      }
    }

    &:nth-child(5) {
      span {
        position: relative;
        margin-top: 40px;
      }

      span:before {
        content: "";
        display: block;
        height: 40px;
        width: 2px;
        position: absolute;
        background-color: #b5b5b5;
        left: 50%;
        top: -41px;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
      }

      span:after {
        content: none;
      }
    }
  }

}
</style>