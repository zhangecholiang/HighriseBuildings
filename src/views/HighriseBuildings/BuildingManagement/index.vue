<script setup>
import { reactive, ref } from "vue";
import NewInformation from "@/views/HighriseBuildings/BuildingManagement/components/NewInformation.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Refresh, Search } from "@element-plus/icons-vue";
import { useDict } from "@/stores/dict.js";
import { getCommunity } from "@/apis/dict.js";
import { deleteBuilding, getBuildingList } from "@/apis/building.js";
import dayjs from "dayjs";
import NewInforexamine from "@/views/HighriseBuildings/CheckBuilding/components/NewInforexamine.vue";
import ViewInfomation from "@/views/HighriseBuildings/BuildingManagement/components/ViewInfomation.vue";
import { useStore } from "@/stores/user.js";

const store = useStore ();
const params = reactive ({
  "pageIndex": 1,
  "pageSize": 20,
  "where": {
    "csqLoginid": store.csqLoginid,
    "xqbh": "",
    "jzxz": "",
    "szdz": "",
    "lh": "",
    "lxr": "",
  }
});
const dict = useDict ();
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
getxqList (store.csqLoginid);
const tableData = ref ([]);
const loading = ref (false);
const getData = () => {
  loading.value = true;
  setTimeout (async () => {
    const { data } = await getBuildingList (params);
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
const showSuccess = ref (false);
const onClose = () => {
  showSuccess.value = false;
  getData ();
};
const addmasg = () => {
  lcbh.value = "";
  showSuccess.value = true;
};
const onRefresh = () => {
  params.where.csqLoginid = "";
  params.where.xqbh = "";
  params.where.jzxz = "";
  params.where.szdz = "";
  params.where.lh = "";
  params.where.lxr = "";
  ElMessage ({
    message: "清除成功",
    grouping: true,
    type: "success",
  });
  getData ();
};
const Confirm = ref ();
const onConfirm = () => {
  Confirm.value.submitForm (Confirm.value.ruleFormRef);
};

const lcbh = ref ("");
const onEditor = (row) => {
  lcbh.value = row.bh;
  showSuccess.value = true;
};
const delSuccess = async (row) => {
  ElMessageBox.confirm ("是否确认删除?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then (async () => {
        const data = await deleteBuilding (row.bh);
        if (data.code === 200) {
          ElMessage ({
            message: "删除成功",
            grouping: true,
            type: "success",
          });
          getData ();
        }
      })
      .catch (() => {
        ElMessage ({
          type: "info",
          message: "已取消",
        });
      });
};

// 检查
const Examine = ref ();
const showExamine = ref (false);
const onExamineclose = () => {
  showExamine.value = false;
  getData ();
};
const onExamine = () => {
  Examine.value.submitForm (Examine.value.ruleFormRef);
};
const jxinfo = ref ({});
const addVisit = (row) => {
  jxinfo.value = row;
  showExamine.value = true;
};

// 查看
const showView = ref (false);
const viewbh = ref ();
const OnView = (row) => {
  viewbh.value = row.bh;
  showView.value = true;
};
</script>

<template>
  <div class="table-title">
    建筑物管理
  </div>
  <el-form :model="params" class="demo-form-inline">
    <el-row :gutter="20" justify="space-between">
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
          <el-input v-model="params.where.szdz" clearable placeholder="地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="params.where.lh" clearable placeholder="楼号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="params.where.lxr" clearable placeholder="登记人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="tab-header">
    <el-row justify="space-between">
      <el-col :span="16">
        <div style="display: flex">
          <el-button :icon="Plus" type="primary" @click="addmasg">新增建筑物</el-button>
          <!--          <el-button :icon="Download" style="margin-left: 10px;" type="success">-->
          <!--            <a href=""-->
          <!--               style="color: #fff;text-decoration: none">导出</a>-->
          <!--          </el-button>-->
        </div>
      </el-col>
      <!--    <el-button :icon="Upload" type="success">导出</el-button>-->
      <el-col :span="8" align="right">
        <el-button :icon="Search" type="primary" @click="getData">查询</el-button>
        <el-button :icon="Refresh" @click="onRefresh">清除查询</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table v-loading="loading" :data="tableData"
            :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }" element-loading-text="加载中..."
            height="calc(100vh - 310px)"
            stripe
  >
    <el-table-column label="序号" type="index" width="80"/>
    <el-table-column label="社区" prop="departName" width="150"/>
    <el-table-column label="小区(楼)名称" prop="xqName" width="150"/>
    <el-table-column label="楼号" prop="lh" width="150"/>
    <el-table-column label="地址" show-overflow-tooltip width="250">
      <template #default="{row}">
        <div style="text-align: left">{{ row.szdz }}</div>
      </template>
    </el-table-column>
    <el-table-column label="建筑性质" prop="jzxz"/>
    <el-table-column label="登记人" prop="lxr"/>
    <el-table-column label="登记时间">
      <template #default="{row}">
        {{ dayjs (row.posttime).format ("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column label="检查条数" prop="jcts" width="130"/>
    <el-table-column fixed="right" label="操作" width="320">
      <template #default="{row}">
        <el-button type="primary" @click="OnView(row)">查看</el-button>
        <el-button type="warning" @click="onEditor(row)">编辑</el-button>
        <el-button type="success" @click="addVisit(row)">检查</el-button>
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
  <el-dialog v-model="showSuccess" center draggable title="新增建筑物" width="65%">
    <NewInformation v-if="showSuccess" ref="Confirm" :bh="lcbh" @colsemasg="onClose"></NewInformation>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSuccess = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showExamine" center draggable title="新增检查" width="65%">
    <NewInforexamine v-if="showExamine" ref="Examine" :isjc="true" :jxinfo="jxinfo"
                     @colsemasg="onExamineclose"></NewInforexamine>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showExamine = false">取消</el-button>
        <el-button type="primary" @click="onExamine">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showView" center draggable title="建筑物查看" width="65%">
    <ViewInfomation v-if="showView" :bh="viewbh"></ViewInfomation>
  </el-dialog>

</template>

<style lang="less" scoped>

.demo-form-inline {
  border-bottom: 1px solid #ebeef5;
  //display: flex;
  //flex-wrap: wrap;
}

.tab-header {
  margin: 15px 0;
}

:deep(.el-select) {
  width: 100%;
}

.el-form-item {
  width: 100%;
  --el-form-inline-content-width: 100%;
}

.el-table {
  margin-top: 5px;
  height: calc(100vh - 320px);
}

:deep(.el-table__cell) {
  text-align: center;
}

.pagination {
  margin-top: 15px;
  float: right;
}

</style>