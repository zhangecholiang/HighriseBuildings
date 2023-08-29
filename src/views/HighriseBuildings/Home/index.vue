<script setup>

import { ref } from "vue";
import { getStatistics, getStatisticsTotal } from "@/apis/home.js";
import { useStore } from "@/stores/user.js";
import { init } from 'echarts';

const store = useStore ();
const dataName = ref ([
  { name: ' 公共建筑', value: '0' },
  { name: ' 商用建筑', value: '0' },
  { name: ' 住宅建筑', value: '0' },
  { name: ' 商住两用', value: '0' },
  { name: ' 工贸企业', value: '0' },
])
const buildList = ref ([
  { name: '高层建筑总数', value: '0' },
  { name: '公共建筑', value: '0' },
  { name: '商用建筑', value: '0' },
  { name: '住宅建筑', value: '0' },
  { name: '商住两用', value: '0' },
  { name: '工贸企业', value: '0' },
  { name: '一类建筑', value: '0' },
  { name: '二类建筑', value: '0' },
  { name: '一般隐患', value: '0' },
  { name: '重大隐患', value: '0' },
  { name: '检查总数', value: '0' },
])
const yhList = ref ([
  { name: '一般隐患', value: '0' },
  { name: '重大隐患', value: '0' },
])
const getList = async (loginid) => {
  const { data } = await getStatistics (loginid)
  if (data) {
    buildList.value[0].value = data[0].gcjzzs
    buildList.value[1].value = data[0].ggjz
    buildList.value[2].value = data[0].syjz
    buildList.value[3].value = data[0].zzjz
    buildList.value[4].value = data[0].szly
    buildList.value[5].value = data[0].gmqy
    buildList.value[6].value = data[0].yjjzw
    buildList.value[7].value = data[0].ejjzw
    buildList.value[8].value = data[0].ybyh
    buildList.value[9].value = data[0].zdyh
    buildList.value[10].value = data[0].jcts

    yhList.value[0].value = data[0].ybyh
    yhList.value[1].value = data[0].zdyh

    dataName.value[0].value = data[0].ggjz
    dataName.value[1].value = data[0].syjz
    dataName.value[2].value = data[0].zzjz
    dataName.value[3].value = data[0].szly
    dataName.value[4].value = data[0].gmqy
  }
  initChart ()
  initChart1 ()
}
getList (store.csqLoginid)
const TotalList = ref ([ '高层建筑总数', '隐患数', '检查数', ])
const getTotal = async (loginid) => {
  const { data } = await getStatisticsTotal (loginid)
  if (data) {
    TotalList.value = TotalList.value.map ((item, index) => {
      return {
        name: item,
        value: Object.values (data[0])[index]
      }
    })
  }
}
getTotal (store.csqLoginid)

const chartRef = ref (null);
let chart
const initChart = () => {
  chart = init (chartRef.value);
  const option = {
    tooltip: {
      trigger: "item",
      // formatter: '{a} <br/>{b} : {c} ({d}%)',
      textStyle: {
        fontSize: 14, // 字体大小
      },
    },
    legend: {
      icon: 'rect',
      // type: 'scroll',
      itemHeight: 15,
      itemWidth: 15,
      itemGap: 30,
      top: '8%',
      left: "55%",
      width: 280,
      height: 50,
      // selectedMode: false,
      textStyle: {
        color: "#000",
        lineHeight: 10,
        width: 70,
        fontSize: 14,
        padding: [ 12, 12, 10, 1 ],
      },
    },
    series: [
      {
        name: "建筑物性质",
        type: "pie",
        radius: [ "40%", "80%" ],
        center: [ "25%", "50%" ],
        // roseType: "area",
        data: dataName.value,
        label: {
          show: true,
          position: 'inside',
          color: '#FFFFFF',
          formatter: '{d}%'
        },
        emphasis: {
          label: {
            show: false
          }
        },
      },
    ],
  };
  chart.setOption (option);
}

const chartRef1 = ref (null);
let chart1
const initChart1 = () => {
  chart1 = init (chartRef1.value);
  const option = {
    tooltip: {
      trigger: "item",
      // formatter: '{a} <br/>{b} : {c} ({d}%)',
      textStyle: {
        fontSize: 14, // 字体大小
      },
    },
    legend: {
      icon: 'rect',
      // type: 'scroll',
      itemHeight: 15,
      itemWidth: 15,
      itemGap: 30,
      top: '8%',
      left: "55%",
      width: 280,
      height: 50,
      // selectedMode: false,
      textStyle: {
        color: "#000",
        lineHeight: 10,
        width: 70,
        fontSize: 14,
        padding: [ 12, 12, 10, 1 ],
      },
    },
    series: [
      {
        name: "建筑物性质",
        type: "pie",
        radius: [ "40%", "80%" ],
        center: [ "25%", "50%" ],
        // roseType: "area",
        data: yhList.value,
        label: {
          show: true,
          position: 'inside',
          color: '#FFFFFF',
          formatter: '{d}%'
        },
        emphasis: {
          label: {
            show: false
          }
        },
      },
    ],
  };
  chart1.setOption (option);
}
</script>

<template>
  <div class="home">
    <div class="gk-card">
      <div class="gk-header">
        整体概况
      </div>
      <div class="gk-body">
        <div v-for="i in TotalList" class="body-item">
          <div class="item-title">{{ i.name }}</div>
          <div class="item-content">{{ i.value }}</div>
        </div>
      </div>
    </div>
    <div class="gk-card">
      <div class="gk-header">
        高层建筑概括
      </div>
      <div class="gk-body">
        <div v-for="i in buildList" class="body-item">
          <div class="item-title">{{ i.name }}</div>
          <div class="item-content">{{ i.value }}</div>
        </div>
      </div>
    </div>
    <div class="jzwxz">
      <div class="xz">
        <div class="gk-header">
          建筑物性质分类
        </div>
        <div ref="chartRef" class="chart"></div>
      </div>
      <div class="yh">
        <div class="gk-header">
          检查隐患分析
        </div>
        <div ref="chartRef1" class="chart1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  .gk-header {
    color: #171a1d;
    font-size: 20px;
    padding: 5px 0 20px;
  }

  .gk-card {
    margin-bottom: 15px;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, .2);

    .gk-header {
      color: #171a1d;
      font-size: 20px;
      padding: 5px 0 20px;
    }

    .gk-body {
      display: flex;
      flex-wrap: wrap;

      .body-item {
        width: 15%;
        margin: 5px 10px;
        height: 100px;
        padding: 10px 15px;
        background-color: #f8f8f8;
        color: #999;
        border-radius: 2px;

        .item-title {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .item-content {
          font-style: normal;
          font-size: 30px;
          font-weight: 300;
          color: #009688;
        }
      }
    }
  }

  .jzwxz {
    width: 100%;
    display: flex;

    .yh {
      margin-left: 55px;
    }

    .chart {
      width: 500px;
      height: 250px;
    }

    .chart1 {
      width: 500px;
      height: 250px;
    }
  }
}
</style>