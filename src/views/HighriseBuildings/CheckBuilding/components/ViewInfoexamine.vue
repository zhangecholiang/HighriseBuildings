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

const genderSpanCity = ({row, column, rowIndex, columnIndex}) => {
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
    <div class="label-title">
      基本信息
    </div>
    <div class="info">
      <div class="tab">
        <div class="label">社区：</div>
        <div class="content">
          {{ Infor.departName }}
        </div>
      </div>
      <div class="tab">
        <div class="label">小区（楼）名称：</div>
        <div class="content">
          {{ Infor.xqName }}
        </div>
      </div>
      <div class="tab">
        <div class="label">楼号：</div>
        <div class="content">
          {{ Infor.lh }}
        </div>
      </div>
      <div class="tab">
        <div class="label">所在地址：</div>
        <div class="content">
          {{ Infor.szdz }}
        </div>
      </div>
      <div class="tab">
        <div class="label">建筑性质：</div>
        <div class="content">
          {{ Infor.jzxz }}
        </div>
      </div>
      <div class="tab">
        <div class="label">物业单位：</div>
        <div class="content">
          {{ Infor.wydw }}
        </div>
      </div>
      <div class="tab">
        <div class="label">联系人：</div>
        <div class="content">
          {{ Infor.lxr }}
        </div>
      </div>
      <div class="tab">
        <div class="label">联系电话：</div>
        <div class="content">
          {{ Infor.lxdh }}
        </div>
      </div>
      <div class="tab">
        <div class="label">
          <span>建筑全景照片:</span>
        </div>
        <div v-for="i in Infor.ldqmzp" class="content">
          <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                    :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="contain"
                    style="width: 100px; height: 100px;margin-right: 10px;"/>
        </div>
      </div>
      <div class="tab">
        <div class="label">
          <span>建筑全景照片:</span>
        </div>
        <div v-for="i in Infor.jzgcxfyjszp" class="content">
          <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                    :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="contain"
                    style="width: 100px; height: 100px;margin-right: 10px;"/>
        </div>
      </div>
    </div>
    <div class="label-title">
      建筑基本信息
    </div>
    <div class="info">
      <div class="tab">
        <div class="label">
          高层建筑类别：
        </div>
        <div class="content">
          {{ Infor.gcjzlb }}
        </div>
      </div>
      <div class="tab">
        <div class="label">
          楼高（米）：
        </div>
        <div class="content">
          {{ Infor.lg }}
        </div>
      </div>
      <div class="tab">
        <div class="label">
          是否挂牌：
        </div>
        <div class="content">{{ Infor.sfgp }}</div>
      </div>
      <div class="tab">
        <div class="label">
          地上建筑层数（层）：
        </div>
        <div class="content">{{ Infor.dsjzcs }}</div>
      </div>
      <div class="tab">
        <div class="label">
          地下建筑层数（层）：
        </div>
        <div class="content">{{ Infor.dxjzcs }}</div>
      </div>
      <div class="tab">
        <div class="label">
          架空层（层）：
        </div>
        <div class="content">{{ Infor.jkc }}</div>
      </div>
      <div class="tab">
        <div class="label">
          架空层位置（层）：
        </div>
        <div class="content">{{ Infor.jkcwz }}</div>
      </div>
      <div class="tab">
        <div class="label">
          火灾发生情况：
        </div>
        <div class="content">{{ Infor.hzfsqk }}</div>
      </div>
    </div>
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