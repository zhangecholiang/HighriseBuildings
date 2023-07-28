<script setup>
import { editBuilding } from "@/apis/building.js";
import { reactive, ref } from "vue";
import { getcheckDetail } from "@/apis/examine.js";
import { getTreeMenu } from "@/apis/dict.js";

const props = defineProps({
  bh: {
    type: String, default: ''
  }, jcbh: {
    type: String, default: ''
  }
})
const getData = async () => {
  const {data} = await editBuilding(props.jcbh)
  Object.assign(Infor, data)
}
getData()
const size = ref('large')
const Infor = reactive({})
const BasicChecks = ref([])
const tableData = ref([])

const getinfos = async () => {
  const {data} = await getcheckDetail(props.bh)
  const Basic = await getTreeMenu(873)
  BasicChecks.value = Basic.data.map((item) => {
    return item.children.map((i) => {
      data.checkItem && data.checkItem.forEach((ite) => {
        if (ite.jcxm === i.dictName && ite.jcjg !== "") {
          i.iszg = ite.iszg
          i.jcxm = ite.jcxm
          i.jcjg = ite.jcjg
        }
        if (ite.jcxm === i.dictName && ite.zp) {
          i.files = ite.zp.map((item) => {
            return {
              url: 'http://kfq.kejin.net.cn:8223' + item.path, response: {
                data: item
              }
            }
          })
        }
      })
      return {
        parentName: item.dictName, jcjg: i.jcjg, jcxm: i.jcxm, iszg: i.iszg, files: i.files
      }
    })
  })
  tableData.value = BasicChecks.value.flat(Infinity).filter((item) => {
    return item.jcjg !== undefined
  })
}
getinfos()

const genderSpanCity = ({ row, column, rowIndex, columnIndex}) => {
  if (columnIndex === 0) {
    // 获取当前单元格的值
    const currentValue = row[column.property];
    // 获取上一行相同列的值
    const preRow = tableData.value[rowIndex - 1];
    const preValue = preRow ? preRow[column.property] : null;
    // 如果当前值和上一行的值相同，则将当前单元格隐藏
    if (currentValue === preValue) {
      return {rowspan: 0, colspan: 0};
    } else {
      // 否则计算当前单元格应该跨越多少行
      let rowspan = 1;
      for (let i = rowIndex + 1; i < tableData.value.length; i ++) {
        const nextRow = tableData.value[i];
        const nextValue = nextRow[column.property];
        if (nextValue === currentValue) {
          rowspan ++;
        } else {
          break;
        }
      }
      return {rowspan, colspan: 1};
    }
  }
}
</script>

<template>
  <el-scrollbar class="el-scrollbar">
    <el-descriptions :column="4" :size="size" border title="基本信息">
      <el-descriptions-item label="社区：" label-align="right" width="130px">{{
          Infor.departName
        }}
      </el-descriptions-item>
      <el-descriptions-item label="小区（楼）名称：" label-align="right" width="130px">{{
          Infor.xqName
        }}
      </el-descriptions-item>
      <el-descriptions-item label="楼号：" label-align="right" width="130px">{{ Infor.lh }}</el-descriptions-item>
      <el-descriptions-item label="所在地址：" label-align="right" width="130px">{{ Infor.szdz }}</el-descriptions-item>
      <el-descriptions-item label="建筑性质：" label-align="right">{{ Infor.jzxz }}</el-descriptions-item>
      <el-descriptions-item label="物业单位：" label-align="right">{{ Infor.wydw }}</el-descriptions-item>
      <el-descriptions-item label="联系人：" label-align="right">{{ Infor.lxr }}</el-descriptions-item>
      <el-descriptions-item label="联系电话：" label-align="right">{{ Infor.lxdh }}</el-descriptions-item>
      <el-descriptions-item :span="4" label="楼栋全貌：" label-align="right">
        <div style="display: flex;flex-wrap: wrap">
          <div v-for="i in Infor.ldqmzp">
            <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                      :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="contain"
                      style="width: 100px; height: 100px;margin-right: 10px;"/>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item :span="4" label="建筑工程消防意见书：">
        <div style="display: flex;flex-wrap: wrap">
          <div v-for="i in Infor.jzgcxfyjszp">
            <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                      :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="cover"
                      style="width: 100px; height: 100px;margin-right: 10px;"/>
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="4" :size="size" border style="margin-top: 20px;" title="建筑基本信息">
      <el-descriptions-item label="高层建筑类别：" label-align="right" width="150px">{{
          Infor.gcjzlb
        }}
      </el-descriptions-item>
      <el-descriptions-item label="楼高(米)：" label-align="right" width="150px">{{ Infor.lg }}</el-descriptions-item>
      <el-descriptions-item label="是否挂牌：" label-align="right" width="140px">{{ Infor.sfgp }}</el-descriptions-item>
      <el-descriptions-item label="地上建筑层数(层)：" label-align="right" width="150px">{{
          Infor.dsjzcs
        }}
      </el-descriptions-item>
      <el-descriptions-item label="地下建筑层数(层)：" label-align="right" width="140px">{{
          Infor.dxjzcs
        }}
      </el-descriptions-item>
      <el-descriptions-item label="架空层(层)：" label-align="right" width="140px">{{ Infor.jkc }}</el-descriptions-item>
      <el-descriptions-item label="架空层位置(层)：" label-align="right" width="140px">{{
          Infor.jkcwz
        }}
      </el-descriptions-item>
      <el-descriptions-item label="火灾发生情况：" label-align="right" width="140px">{{
          Infor.hzfsqk
        }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions style="margin-top: 20px;" title="检查汇总">
      <el-descriptions-item>
        <el-table
            :data="tableData"
            :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }"
            :span-method="genderSpanCity"
            border
            style="width: 100%; margin-top: 20px"
        >
          <el-table-column label="检查类型" prop="parentName" width="180"/>
          <el-table-column label="检查事项">
            <template #default="{row}">
              <div :style="{color:row.iszg?'red':''}">{{ row.jcxm }}</div>
            </template>
          </el-table-column>
          <el-table-column label="检查结果" prop="jcjg">
            <template #default="{row}">
              <div :style="{color:row.iszg?'red':''}">{{ row.jcjg }}</div>
            </template>
          </el-table-column>
          <el-table-column label="检查图片">
            <template #default="{row}">
              <el-image
                  v-for="item in row.files"
                  :key="item.url"
                  :preview-src-list="[item.url]"
                  :src="item.url"
                  fit="contain"
                  hide-on-click-modal
                  style="width: 100px; height: 100px;margin-right: 10px;"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.el-scrollbar {
  padding-right: 20px;
  height: calc(100vh - 310px);
}

.label-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;

  span {
    padding-left: 10px;
  }
}
</style>