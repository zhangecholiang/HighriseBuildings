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

const objectSpanMethod = ({rowIndex, columnIndex}) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2, colspan: 1,
      }
    } else {
      return {
        rowspan: 0, colspan: 0,
      }
    }
  }
}
</script>

<template>
  <el-scrollbar class="el-scrollbar">
    <el-descriptions :column="4" :size="size" border title="基本信息">
      <el-descriptions-item label="社区：">{{ Infor.departName }}</el-descriptions-item>
      <el-descriptions-item label="小区（楼）名称：">{{ Infor.xqName }}</el-descriptions-item>
      <el-descriptions-item label="楼号：">{{ Infor.lh }}</el-descriptions-item>
      <el-descriptions-item label="所在地址：">{{ Infor.szdz }}</el-descriptions-item>
      <el-descriptions-item label="建筑性质：">{{ Infor.jzxz }}</el-descriptions-item>
      <el-descriptions-item label="物业单位：">{{ Infor.wydw }}</el-descriptions-item>
      <el-descriptions-item label="联系人：">{{ Infor.lxr }}</el-descriptions-item>
      <el-descriptions-item label="联系电话：">{{ Infor.lxdh }}</el-descriptions-item>
      <el-descriptions-item label="楼栋全貌：">
        <div style="display: flex">
          <div v-for="i in Infor.ldqmzp">
            <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                      :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="cover"
                      style="width: 100px; height: 100px;margin-right: 10px;"/>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="建筑工程消防意见书：">
        <div style="display: flex">
          <div v-for="i in Infor.jzgcxfyjszp">
            <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                      :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="cover"
                      style="width: 100px; height: 100px;margin-right: 10px;"/>
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="4" :size="size" border style="margin-top: 20px;" title="建筑基本信息">
      <el-descriptions-item label="高层建筑类别：">{{ Infor.gcjzlb }}</el-descriptions-item>
      <el-descriptions-item label="楼高（米）：">{{ Infor.lg }}</el-descriptions-item>
      <el-descriptions-item label="是否挂牌：">{{ Infor.sfgp }}</el-descriptions-item>
      <el-descriptions-item label="地上建筑层数(层)：">{{ Infor.dsjzcs }}</el-descriptions-item>
      <el-descriptions-item label="地下建筑层数(层)：">{{ Infor.dxjzcs }}</el-descriptions-item>
      <el-descriptions-item label="架空层(层)：">{{ Infor.jkc }}</el-descriptions-item>
      <el-descriptions-item label="架空层位置(层)：">{{ Infor.jkcwz }}</el-descriptions-item>
      <el-descriptions-item label="火灾发生情况：">{{ Infor.hzfsqk }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions style="margin-top: 20px;" title="检查汇总">
      <el-descriptions-item>
        <el-table
            :data="tableData"
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
                  :src="item.url"
                  fit="cover"
                  hide-on-click-modal
                  :preview-src-list="[item.url]"
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