<script setup>
import { reactive, ref } from "vue";
import NewInformation from "@/views/HighriseBuildings/EnterStatistics/components/NewInformation.vue";
import { ElMessage } from 'element-plus'
import { Refresh, Search } from "@element-plus/icons-vue";
import { getStatisticsList } from "@/apis/statistics.js";
import { useDict } from "@/stores/dict.js";
import { getCommunity } from "@/apis/dict.js";

const params = reactive({
  "pageIndex": 1, "pageSize": 100, "where": {
    "loginid": "", "sj": ['', ''],
  }
})
const dict = useDict()
const xqlist = ref([])
const getxqList = async (loginid) => {
  params.where.xqbh = ''
  if (!loginid) {
    loginid = null
  }
  const {data} = await getCommunity(loginid)
  xqlist.value = data
}
const tableData = ref([])
const loading = ref(false)
const getData = () => {
  loading.value = true
  setTimeout(async () => {
    const {data} = await getStatisticsList(params)
    tableData.value = data.list
    total.value = data.total
    loading.value = false
  }, 1000)
}
getData()
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const total = ref(1)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val) => {
  params.pageSize = val
  getData()
}
const handleCurrentChange = (val) => {
  params.pageIndex = val
  getData()
}
const showSuccess = ref(false)
const onRefresh = () => {
  params.where.loginid = ''
  params.where.sj = ['', '']
  ElMessage({
    message: '清除成功', grouping: true, type: 'success',
  })
  getData()
}
const Confirm = ref()
const onConfirm = () => {
  Confirm.value.submitForm(Confirm.value.ruleFormRef)
}
</script>

<template>
  <el-form :inline="true" :model="params" class="demo-form-inline">
    <el-form-item>
      <el-select v-model="params.where.loginid" clearable placeholder="社区名称" @change="getxqList">
        <el-option
            v-for="item in dict.sqList"
            :key="item.loginid"
            :label="item.departName"
            :value="item.loginid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-date-picker
          v-model="params.where.sj"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          type="daterange"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="getData">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Refresh" @click="onRefresh">清除查询</el-button>
    </el-form-item>
  </el-form>
  <!--  <div class="tab-header">-->
  <!--    <el-row>-->
  <!--      <el-col :span="24" align="right">-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </div>-->
  <!--  height="calc(100vh - 220px)"-->
  <el-scrollbar class="el-scrollbar">
    <el-table v-loading="loading" :data="tableData"
              :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }"
              element-loading-text="加载中..." show-summary stripe
    >
      <el-table-column fixed label="序号" type="index" width="100"/>
      <el-table-column label="社区" prop="departName"/>
      <el-table-column label="高层建筑物总数" prop="gcjzzs"/>
      <el-table-column label="建筑物性质">
        <el-table-column label="公共建筑" prop="ggjz"/>
        <el-table-column label="商业建筑" prop="syjz"/>
        <el-table-column label="住宅建筑" prop="zzjz"/>
        <el-table-column label="商住建筑" prop="szly"/>
        <el-table-column label="工贸企业" prop="gmqy"/>
      </el-table-column>
      <el-table-column label="建筑物类别">
        <el-table-column label="一级建筑物" prop="yjjzw"/>
        <el-table-column label="二级建筑物" prop="ejjzw"/>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <el-dialog v-model="showSuccess" center draggable title="新增建筑物" width="65%">
    <NewInformation v-if="showSuccess" ref="Confirm"></NewInformation>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSuccess = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.demo-form-inline {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  flex-wrap: wrap;
}

.tab-header {
  margin: 15px 0;
}

.el-scrollbar {
  height: calc(100vh - 150px);
  overflow-y: auto;
}

.el-table {
  margin-top: 20px;
  //max-height: calc(100vh - 260px);
}

//:deep(.el-table__footer-wrapper) {
//  position: fixed;
//  bottom: 32px;
//}

:deep(.el-table__cell) {
  text-align: center;
}

.pagination {
  margin-top: 15px;
  float: right;
}

</style>