<script setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import NewInformation from "@/views/HighriseBuildings/CheckBuilding/components/NewInforexamine.vue";
import {Plus, Refresh, Search} from "@element-plus/icons-vue";
import {useDict} from "@/stores/dict.js";
import {getCommunity} from "@/apis/dict.js";
import {checkstatus, delcheck, getcheckList} from "@/apis/examine.js";
import ViewInfoexamine from "@/views/HighriseBuildings/CheckBuilding/components/ViewInfoexamine.vue";

const dict = useDict();
const params = reactive({
  "pageIndex": 1,
  "pageSize": 20,
  "where": {
    "csqLoginid": "",
    "xqbh": "",
    "jzxz": "",
    "shzt": "",
    "lh": "",
    "jcr": "",
  }
});
const xqlist = ref([]);
const getxqList = async (loginid) => {
  params.where.xqbh = "";
  if (loginid !== "") {
    const {data} = await getCommunity(loginid);
    xqlist.value = data;
  } else {
    loginid = null;
    xqlist.value = [];
  }
};
const tableData = ref([]);
const loading = ref(false);
const getData = () => {
  loading.value = true;
  setTimeout(async () => {
    const {data} = await getcheckList(params);
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

const addmasg = () => {
  jzwbh.value = "";
  showSuccess.value = true;
};
const onRefresh = () => {
  params.where.csqLoginid = "";
  params.where.xqbh = "";
  params.where.jzxz = "";
  params.where.shzt = "";
  params.where.lh = "";
  params.where.jcr = "";
  ElMessage({
    message: "清除成功",
    grouping: true,
    type: "success",
  });
  getData();
};
const jzwbh = ref("");
const onEditor = (row) => {
  jzwbh.value = row.bh;
  showSuccess.value = true;
};
const delSuccess = (row) => {
  ElMessageBox.confirm("是否确认删除?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(async () => {
        const data = await delcheck(row.bh);
        if (data.code === 200) {
          ElMessage({
            type: "success",
            message: "已删除",
          });
          await getData();
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消",
        });
      });
};

const showSuccess = ref(false);
const onClose = () => {
  showSuccess.value = false;
  getData();
};
const Confirm = ref();
const onConfirm = () => {
  Confirm.value.submitForm(Confirm.value.ruleFormRef);
};

// 查看
const isShowck = ref(false);
const bh = ref();
const jcbh = ref();
const view = ref(false);
const onView = (row) => {
  if (row.shzt === 2) {
    isShowck.value = true;
  } else {
    isShowck.value = false;
  }
  bh.value = row.bh;
  jcbh.value = row.jzwbh;
  view.value = true;
};

const onApproved = async () => {
  ElMessageBox.confirm("是否确认审核通过?", "审核通过", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "success",
  })
      .then(async () => {
        const data = await checkstatus(bh.value, 1, "");
        if (data.code === 200) {
          ElMessage({
            type: "success",
            message: "已审核",
          });
          setTimeout(() => {
            view.value = false;
          }, 1000);
          await getData();
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消",
        });
      });
};
const onisApproved = async () => {
  ElMessageBox.confirm("是否确认审核不通过?", "审核不通过", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(async () => {
        const data = await checkstatus(bh.value, 0, "");
        if (data.code === 200) {
          ElMessage({
            type: "success",
            message: "审核不通过",
          });
          setTimeout(() => {
            view.value = false;
          }, 1000);
          await getData();
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消",
        });
      });
};
</script>

<template>
  <div class="table-title">
    建筑物检查
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
          <el-select v-model="params.where.shzt" clearable placeholder="状态">
            <el-option :value="2" label="已上报">已上报</el-option>
            <el-option :value="1" label="已审核通过">已审核通过</el-option>
            <el-option :value="0" label="审核不通过">审核不通过</el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="params.where.lh" placeholder="楼号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="params.where.jcr" placeholder="登记人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="tab-header">
    <el-row>
      <el-col :span="12">
        <div style="display: flex">
          <el-button :icon="Plus" type="primary" @click="addmasg">新增检查</el-button>
          <!--          <el-button :icon="Download" style="margin-left: 10px;" type="success">-->
          <!--            <a href=""-->
          <!--               style="color: #fff;text-decoration: none">导出</a>-->
          <!--          </el-button>-->
        </div>
      </el-col>
      <el-col :span="12" align="right">
        <el-button :icon="Search" type="primary" @click="getData">查询</el-button>
        <el-button :icon="Refresh" @click="onRefresh">清除查询</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table v-loading="loading" :data="tableData"
            :header-cell-style="{ 'fontSize':'16px',color: '#606266',height:'50px' }"
            element-loading-text="加载中..." height="calc(100vh - 310px)"
            stripe>
    <el-table-column label="序号" type="index" width="80"/>
    <el-table-column label="社区" prop="departName" width="130"/>
    <el-table-column label="小区(楼)名称" prop="xqName" width="130"/>
    <el-table-column label="楼号" prop="lh" width="120"/>
    <el-table-column label="地址" prop="szdz" show-overflow-tooltip width="250">
      <template #default="{row}">
        <div style="text-align: left">{{ row.szdz }}</div>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="140">
      <template #default="{row}">
        <el-tag v-if="row.shzt === 2" class="ml-2" effect="light" size="large" type="info">已上报</el-tag>
        <el-tag v-else-if="row.shzt === 0 " class="ml-2" effect="light" size="large" type="danger">审核不通过</el-tag>
        <el-tag v-else-if="row.shzt" class="ml-2" effect="light" size="large" type="success">已审核通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="建筑性质" prop="jzxz"/>
    <el-table-column label="登记人" prop="jcr"/>
    <el-table-column label="登记时间" prop="jcsj" width="160"/>
    <el-table-column label="检查条数" prop="jcts" width="120"/>
    <el-table-column fixed="right" label="操作" width="240">
      <template #default="{row}">
        <el-button v-if="row.shzt === 2" type="primary" @click="onView(row)">审核</el-button>
        <el-button v-if="row.shzt === 1 || row.shzt === 0" type="primary" @click="onView(row)">查看</el-button>
        <el-button v-if="row.shzt === 2" type="warning" @click="onEditor(row)">编辑</el-button>
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
  <el-dialog v-model="showSuccess" center draggable title="新增检查" width="65%">
    <NewInformation v-if="showSuccess" ref="Confirm" :bh="jzwbh" @colsemasg="onClose"></NewInformation>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSuccess = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="view" center draggable title="建筑物检查信息查看" width="70%">
    <ViewInfoexamine v-if="view" :bh="bh" :jcbh="jcbh"></ViewInfoexamine>
    <template v-if="isShowck" #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="onApproved">审核通过</el-button>
        <el-button type="danger" @click="onisApproved">
          审核不通过
        </el-button>
        <el-button @click="view = false">关闭</el-button>
      </span>
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
  height: calc(100vh - 320px);
}

:deep(.el-table__cell) {
  text-align: center;
}

.pagination {
  margin-top: 15px;
  float: right;
}

.dia-title {
  height: 54px;
  border-bottom: 1px solid #dbdbdb;

  span {
    display: inline-block;
    padding-left: 43px;
    height: 24px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #5E5D5D;
    line-height: 40px;
  }

  .el-icon {
    cursor: pointer;
    float: right;
    color: #000;
    font-size: 30px;
  }
}

table {
  tr {
    margin-top: 10px;
    height: 50px;
    text-align: right;

    .tit {
      width: 200px;
      font-size: 16px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #5E5D5D;
      line-height: 24px;
      letter-spacing: 1px;
    }

    .val {
      text-align: left;
      width: 300px;
      font-size: 16px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #2EA9C9;
      line-height: 24px;
      letter-spacing: 1px;
    }
  }
}
</style>