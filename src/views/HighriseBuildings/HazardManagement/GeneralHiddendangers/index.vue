<script setup>
import { reactive, ref } from "vue";
import NewInformation
  from "@/views/HighriseBuildings/HazardManagement/GeneralHiddendangers/components/NewInformation.vue";
import { ElMessage } from "element-plus";
import { Refresh, Search } from "@element-plus/icons-vue";
import { getHiddenDangerList } from "@/apis/hiddenTrouble.js";
import { useDict } from "@/stores/dict.js";
import { getCommunity } from "@/apis/dict.js";
import dayjs from "dayjs";
import ViewHainfo from "@/views/HighriseBuildings/HazardManagement/GeneralHiddendangers/components/ViewHainfo.vue";

const params = reactive({
                          "pageIndex": 1,
                          "pageSize": 20,
                          "where": {
                            "csqLoginid": "",
                            "xqbh": "",
                            "zt": "",
                            "jzxz": "",
                            "yhdj": "",
                            "iszg": 1
                          }
                        });
const xqlist = ref([]);
const getxqList = async (loginid) => {
  params.where.xqbh = "";
  if (loginid !== "") {
    const { data } = await getCommunity(loginid);
    xqlist.value = data;
  } else {
    loginid = null;
    xqlist.value = [];
  }
};
const dict = useDict();
const tableData = ref([]);
const loading = ref(false);
const getData = () => {
  loading.value = true;
  setTimeout(async () => {
    const { data } = await getHiddenDangerList(params);
    tableData.value = data.list;
    total.value = data.total;
    loading.value = false;
  }, 500);
};
getData();
const currentPage3 = ref(1);
const pageSize3 = ref(20);
const total = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  params.pageSize = val;
  getData();
};
const handleCurrentChange = (val) => {
  params.pageIndex = val;
  getData();
};
const showSuccess = ref(false);
const onClose = () => {
  showSuccess.value = false;
};
const param = ref({});
const addmasg = (row) => {
  if (row.zt === "未整改") {
    showSuccess.value = true;
  } else {
    showView.value = true;
  }
  param.value.bh = row.bh;
  param.value.jcxm = row.jcxm;
};
const onRefresh = () => {
  params.where.csqLoginid = "";
  params.where.xqbh = "";
  params.where.zt = "";
  params.where.jzxz = "";
  params.where.iszg = "";
  ElMessage({
              message: "清除成功",
              grouping: true,
              type: "success",
            });
  getData();
};
const Confirm = ref();
const onConfirm = () => {
  Confirm.value.submitForm(Confirm.value.ruleFormRef);
  getData();
};

const showView = ref(false);
</script>

<template>
  <div class="table-title">
    隐患管理
  </div>
  <el-form :model="params" class="demo-form-inline">
    <el-row :gutter="20" justify="space-between">
      <el-col :span="4">
        <el-form-item>
          <el-select v-model="params.where.csqLoginid" clearable placeholder="社区名称" @change="getxqList">
            <el-option
                v-for="item in dict.sqList"
                :key="item.loginid"
                :label="item.departName"
                :value="item.loginid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-select v-model="params.where.xqbh" clearable placeholder="小区">
            <el-option
                v-for="item in xqlist"
                :key="item.xqbh"
                :label="item.xqName"
                :value="item.xqbh">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-select v-model="params.where.zt" clearable placeholder="状态选择">
            <el-option label="未整改" value="未整改"/>
            <el-option label="已整改" value="已整改"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-select v-model="params.where.jzxz" clearable placeholder="建筑性质">
            <el-option
                v-for="item in dict.jzwxzlist"
                :key="item.id"
                :label="item.dictName"
                :value="item.dictName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-select v-model.number="params.where.iszg" clearable placeholder="隐患等级">
            <el-option :value="1" label="一般隐患">一般隐患</el-option>
            <el-option :value="2" label="重大隐患">重大隐患</el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="1.5">
        <el-form-item>
          <el-button :icon="Search" type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="2.5">
        <el-form-item>
          <el-button :icon="Refresh" @click="onRefresh">清除查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!--  <div class="tab-header">-->
  <!--    <el-row>-->
  <!--      <el-col :span="24" align="right">-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </div>-->
  <el-table v-loading="loading" :data="tableData"
            :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }"
            element-loading-text="加载中..."
            height="calc(100vh - 250px)" stripe>
    <el-table-column label="序号" type="index" width="80"/>
    <el-table-column label="检查人" prop="jcr" width="100"/>
    <el-table-column label="检查时间" prop="jcsj" width="120"/>
    <el-table-column label="建筑性质" prop="jzxz" width="120"/>
    <el-table-column label="社区" prop="departName" width="120"/>
    <el-table-column label="小区(楼)名称" prop="xqName" width="120"/>
    <el-table-column label="检查类型" prop="jcxm" show-overflow-tooltip width="220"/>
    <el-table-column label="检查事项" prop="jcjg" show-overflow-tooltip width="220"/>
    <el-table-column label="隐患等级">
      <template #default="{row}">
        <span v-if="row.iszg === 1">一般隐患</span>
        <span v-else>重大隐患</span>
      </template>
    </el-table-column>
    <el-table-column label="隐患状态">
      <template #default="{row}">
        <el-tag v-if="row.zt === '未整改'" class="ml-2" size="large" type="warning">{{ row.zt }}</el-tag>
        <el-tag v-else class="ml-2" size="large" type="success">{{ row.zt }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="整改期限">
      <template #default="{row}">
        <span v-if="row.zgqx">{{ dayjs(row.zgqx).format("YYYY-MM-DD") }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="140">
      <template #default="{row}">
        <el-button v-if="row.zt === '未整改'" color="rgb(49, 109, 198)" @click="addmasg(row)">整改</el-button>
        <el-button v-else type="primary" @click="addmasg(row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      :background="background"
      :disabled="disabled"
      :small="small"
      :total="total"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
  <el-dialog v-model="showSuccess" center draggable title="查看" width="65%">
    <NewInformation v-if="showSuccess" ref="Confirm" :params="param" @colsemasg="onClose"></NewInformation>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSuccess = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showView" center draggable title="查看" width="65%">
    <ViewHainfo v-if="showView" ref="Confirm" :params="param" @colsemasg="onClose"></ViewHainfo>
  </el-dialog>
</template>

<style lang="less" scoped>
.demo-form-inline {
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-select) {
  width: 100%;
}

.el-form-item {
  width: 100%;
  --el-form-inline-content-width: 100%;
}

.tab-header {
  margin: 15px 0;
}

.el-table {
  margin-top: 5px;
  height: calc(100vh - 260px);
}

:deep(.el-table__cell) {
  text-align: center;
}

.pagination {
  margin-top: 15px;
  float: right;
}

</style>