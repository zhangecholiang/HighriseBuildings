<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Refresh, Search } from "@element-plus/icons-vue";
import { useDict } from "@/stores/dict.js";
import { getCommunity } from "@/apis/dict.js";
import ViewCommunity from "@/views/HighriseBuildings/CommunityManagement/components/ViewCommunity.vue";
import { deleteCommunity, getCommunityList } from "@/apis/community.js";
import { useStore } from "@/stores/user.js";

const store = useStore ();
const params = reactive ({
  "pageIndex": 1,
  "pageSize": 20,
  "where": {
    "csqLoginid": store.csqLoginid,
    "xqName": "",
  }
});
const xqlist = ref ([]);
const getxqList = async (loginid) => {
  params.where.xqbh = "";
  if (loginid !== "") {
    const { data } = await getCommunity (loginid);
    xqlist.value = data;
  } else {
    loginid = null;
    xqlist.value = [];
  }
};
store.csqLoginid && getxqList (store.csqLoginid);
const dict = useDict ();
const tableData = ref ([]);
const loading = ref (false);
const getData = () => {
  loading.value = true;
  setTimeout (async () => {
    const { data } = await getCommunityList (params);
    tableData.value = data.list;
    total.value = data.total;
    loading.value = false;
  }, 500);
};
getData ();
const currentPage3 = ref (1);
const pageSize3 = ref (20);
const total = ref (1);
const small = ref (false);
const background = ref (false);
const disabled = ref (false);
const handleSizeChange = (val) => {
  params.pageSize = val;
  getData ();
};
const handleCurrentChange = (val) => {
  params.pageIndex = val;
  getData ();
};
const onClose = () => {
  showView.value = false;
  getData ();
};
const bh = ref ("");
const onRefresh = () => {
  params.where.csqLoginid = "";
  params.where.xqName = "";
  ElMessage ({
    message: "清除成功",
    grouping: true,
    type: "success",
  });
  getData ();
};
const Confirm = ref ();
const showView = ref (false)
const addCommunity = () => {
  bh.value = "";
  showView.value = true;
}
const onClick = () => {
  Confirm.value.submitForm (Confirm.value.ruleFormRef)
}
const onEditor = (row) => {
  bh.value = row.bh;
  showView.value = true;
}
const delSuccess = (row) => {
  ElMessageBox.confirm ("是否删除该小区？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then (async () => {
    const data = await deleteCommunity (row.bh);
    if (data.code === 200) {
      ElMessage ({
        message: "删除成功",
        type: "success",
      });
      getData ();
    } else {
      ElMessage ({
        message: data.msg,
        type: "error",
      });
    }
  }).catch (() => {
  });
}
</script>

<template>
  <div class="table-title">
    小区管理
  </div>
  <el-form :model="params" class="demo-form-inline">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item>
          <el-select v-model="params.where.csqLoginid" :disabled="store.csqLoginid" clearable placeholder="社区名称"
                     @change="getxqList">
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
          <el-input v-model="params.where.xqName" clearable placeholder="小区名称"></el-input>
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
      <el-col :span="2.5">
        <el-form-item>
          <el-button :icon="Plus" type="primary" @click="addCommunity">添加小区</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table v-loading="loading" :data="tableData"
            :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }"
            element-loading-text="加载中..."
            height="calc(100vh - 250px)" stripe>
    <el-table-column label="序号" type="index" width="120"/>
    <el-table-column label="社区" prop="departName"/>
    <el-table-column label="小区" prop="xqName"/>
    <el-table-column fixed="right" label="操作" width="250">
      <template #default="{row}">
        <el-button type="warning" @click="onEditor(row)">编辑</el-button>
        <el-button type="danger" @click="delSuccess(row)">删除</el-button>
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
  <el-dialog v-model="showView" center draggable title="小区管理" width="50%">
    <ViewCommunity v-if="showView" ref="Confirm" :bh="bh" @close="onClose"></ViewCommunity>
    <template #footer>
      <el-button type="primary" @click="onClick">确 定</el-button>
      <el-button @click="onClose">取 消</el-button>
    </template>
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