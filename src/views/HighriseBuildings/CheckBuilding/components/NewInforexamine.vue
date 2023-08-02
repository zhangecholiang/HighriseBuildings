<script setup>
import {onMounted, reactive, ref} from "vue";
import {Plus} from "@element-plus/icons-vue";
import {getCommunity, getTreeMenu} from "@/apis/dict.js";
import {useDict} from "@/stores/dict.js";
import {ElMessage} from "element-plus";
import {addcheck, getbuild, getbuildinfo, getcheckDetail} from "@/apis/examine.js";
import {useStore} from "@/stores/user.js";
import {afterRead, elFormErrorScrollIntoView} from "@/utils/tools.js";

const props = defineProps({
  bh: {
    type: String,
    default: "",
  },
  jxinfo: {
    type: Object,
    default: () => {
      return {};
    }
  },
  isjc: {
    type: Boolean,
  }
});
console.log(props.isjc);
const emits = defineEmits(["colsemasg"]);
const dict = useDict();
const store = useStore();
const ruleFormRef = ref();
const rules = reactive({
  csqloginid: [
    {
      required: true,
      message: "请输入社区",
      trigger: "blur"
    },
  ],
  xqbh: [
    {
      required: true,
      message: "请输入小区（楼）名称",
      trigger: "blur"
    },
  ],
  lh: [
    {
      required: true,
      message: "请输入楼号",
      trigger: "blur"
    },
  ],
  szdz: [
    {
      required: true,
      message: "请输入所在地址",
      trigger: "blur"
    },
  ],
  jcr: [
    {
      required: true,
      message: "请输入检查人",
      trigger: "blur"
    },
  ],
  jcsj: [
    {
      required: true,
      message: "请输入检查时间",
      trigger: "blur"
    },
  ],
});
const Information = reactive({
  jcxx: []
});
const BasicChecks = ref([]);
const xqlist = ref([]);
const getxqList = async (loginid) => {
  Information.xqbh = "";
  if (!loginid) {
    loginid = null;
  }
  const {data} = await getCommunity(loginid);
  xqlist.value = data;
};
const ldlist = ref([]);
const getldList = async () => {
  const {data} = await getbuild(Information.csqloginid, Information.xqbh);
  ldlist.value = data;
};
const getinfo = async () => {
  const {data} = await getbuildinfo(Information.csqloginid, Information.xqbh, Information.lh);
  Information.szdz = data.szdz;
  Information.jzwb = data.bh;
};
const loading = ref(false);
const loadingText = ref("加载中...");
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      Information.jcxx = [];
      BasicChecks.value.forEach((item) => {
        item.children.forEach((i) => {
          Information.jcxx.push({
            jcxm: i.dictName,
            jcjg: i.jcjg,
            fj: i.files && i.files.map((item) => {
              return item.response.data;
            }),
          });
        });
      });
      custom.value.forEach((item) => {
        Information.jcxx.push({
          jcxm: item.jcxm,
          jcjg: {
            dictName: item.jcjg,
            dictValue2: ""
          },
          fj: item.fj && item.fj.map((item) => {
            return item.response.data;
          }),
          zdy: true
        });
      });
      loadingText.value = "提交中...";
      loading.value = true;
      if (props.bh !== "") {
        Information.bh = props.bh;
        const data = await addcheck(Information);
        if (data.code === 200) {
          ElMessage({
            message: "修改成功",
            grouping: true,
            type: "success",
          });
          setTimeout(() => {
            loading.value = false;
            emits("colsemasg");
          }, 1000);
        } else {
          ElMessage({
            message: "修改失败",
            grouping: true,
            type: "warning",
          });
          setTimeout(() => {
            emits("colsemasg");
          }, 1000);
        }
      } else {
        activeNames.value = ["0"];
        const data = await addcheck(Information);
        if (data.code === 200) {
          ElMessage({
            message: "提交成功",
            grouping: true,
            type: "success",
          });
          setTimeout(() => {
            loading.value = false;
            emits("colsemasg");
          }, 1000);
        } else {
          ElMessage({
            message: data.msg,
            grouping: true,
            type: "error",
          });
          setTimeout(() => {
            emits("colsemasg");
          }, 1000);
        }
      }
    } else {
      isAccordion.value = false;
      activeNames.value =
          [
            "消防安全管理",
            "建筑防火",
            "消防设施"
          ];
      setTimeout(() => {
        elFormErrorScrollIntoView();
      }, 100);
    }
  });
};
defineExpose({
  submitForm,
  ruleFormRef,
});
const isAccordion = ref(true);
const activeName = ref("first");
const handleClick = () => {
  // console.log(tab, event)
};
const activeNames = ref(["消防安全管理"]);

const getDict = async () => {
  const {data} = await getTreeMenu(873);
  BasicChecks.value = data;
  Information.BasicChecks = data;
  EditInfo();
  loading.value = false;
};
onMounted(() => {
  loading.value = true;
  getDict();
});

const EditInfo = () => {
  if (props.bh !== "") {
    activeNames.value = ["0"];
    custom.value = [];
    const getinfos = async () => {
      const {data} = await getcheckDetail(props.bh);
      await getxqList(data.csqloginid);
      Object.assign(Information, data);
      BasicChecks.value.forEach((item) => {
        item.children.forEach((i) => {
          data.checkItem.forEach((item) => {
            if (item.jcxm === i.dictName) {
              i.jcjg = item.jcjgObj;
            }
            if (item.jcxm === i.dictName && item.zp) {
              i.files = item.zp.map((item) => {
                return {
                  url: "http://kfq.kejin.net.cn:8223" + item.path,
                  response: {
                    data: item
                  }
                };
              });
            }
          });
        });
      });
      data.checkItem.forEach((item) => {
        if (item.zdy) {
          custom.value.push({
            jcxm: item.jcxm,
            jcjg: item.jcjg,
            fj: item.zp.map((item) => {
              return {
                url: "http://kfq.kejin.net.cn:8223" + item.path,
                response: {
                  data: item
                }
              };
            })
          });
        }
      });
    };
    getinfos();
    activeNames.value = ["消防安全管理"];
    loading.value = false;
  }
};
// 管理检查
if (JSON.stringify(props.jxinfo) !== "{}") {
  Information.csqloginid = props.jxinfo.csqLoginid;
  getxqList(props.jxinfo.csqLoginid);
  Information.jzwb = props.jxinfo.bh;
  Information.xqbh = props.jxinfo.xqbh;
  Information.lh = props.jxinfo.lh;
  Information.szdz = props.jxinfo.szdz;
}

const custom = ref([
  {
    jcxm: "",
    jcjg: "",
    fj: []
  },
]);
const AddCustom = () => {
  custom.value.push({
    checkTheMatter: "",
    checkTheResults: "",
    checkThePicture: []
  });
};
const DeleteCustom = (index) => {
  if (custom.value.length === 1) {
    return;
  }
  custom.value.splice(index, 1);
};
</script>

<template>
  <el-scrollbar>
    <el-form ref="ruleFormRef" v-loading="loading" :element-loading-text="loadingText" :model="Information"
             :rules="rules" label-position="right" label-width="140px" status-icon>
      <div class="label-title">
        <span>基本信息</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="社区" prop="csqloginid">
            <el-select v-model="Information.csqloginid" :disabled="props.isjc" clearable placeholder=""
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
        <el-col :span="8">
          <el-form-item label="小区（楼）名称" prop="xqbh">
            <el-select v-model="Information.xqbh" :disabled="props.isjc" clearable placeholder="" @change="getldList">
              <el-option
                  v-for="item in xqlist"
                  :key="item.xqbh"
                  :label="item.xqName"
                  :value="item.xqbh">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼号" prop="lh">
            <el-select v-model="Information.lh" :disabled="props.isjc" clearable placeholder="" @change="getinfo">
              <el-option
                  v-for="item in ldlist"
                  :key="item.lh"
                  :label="item.lh"
                  :value="item.lh">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地址" prop="szdz">
            <el-input v-model="Information.szdz " :readonly="props.isjc" clearable maxlength="100" placeholder=""/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="检查人" prop="jcr">
            <el-input v-model="Information.jcr " clearable maxlength="20" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检查时间" prop="jcsj">
            <el-date-picker
                v-model="Information.jcsj "
                format="YYYY/MM/DD"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基础检查项" name="first">
          <el-collapse v-model="activeNames" :accordion="isAccordion">
            <el-collapse-item v-for="(item,ind) in Information.BasicChecks" :name="item.dictName"
                              :title="item.dictName">
              <el-row :gutter="15">
                <el-col v-for="(i,index) in item.children" :key="index" :span="8">
                  <el-form-item :label=i.dictName
                                :prop="'BasicChecks.'+ind+'.children.'+index+'.jcjg'"
                                :rules="i.dictValue1 === '1' ? {
                                        required: true,
                                        message: '请选择'+i.dictName,
                                        trigger: 'change',
                                      }: {required:false}">
                    <el-select v-model="i.jcjg" clearable value-key="dictName">
                      <el-option v-for="opt in i.children" :label=opt.dictName :value=opt></el-option>
                    </el-select>
                    <el-upload
                        v-model:file-list=i.files
                        :before-upload="afterRead"
                        :headers="{Authorization: store.token}"
                        :title="'上传' + i.dictName"
                        action="http://kfq.kejin.net.cn:8222/api/FileSet/uploadimage"
                        list-type="picture-card"
                        style="margin-top: 10px;"
                    >
                      <el-icon>
                        <Plus/>
                      </el-icon>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="自定义检查项" name="second">
          <el-row v-for="i in custom" :gutter="15">
            <el-col :span="4">
              <el-button type="primary" @click="AddCustom">添加</el-button>
              <el-button type="danger" @click="DeleteCustom">删除</el-button>
            </el-col>
            <el-col :span="6">
              <el-form-item label='检查事项'>
                <el-input v-model="i.jcxm" placeholder=""/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label='检查结果'>
                <el-input v-model="i.jcjg" placeholder=""/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label='检查图片'>
                <el-upload
                    v-model:file-list=i.fj
                    :headers="{Authorization:store.token}"
                    action="http://kfq.kejin.net.cn:8222/api/FileSet/uploadimage"
                    class="upload-demo"
                    list-type="picture-card"
                >
                  <el-icon>
                    <Plus/>
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.el-scrollbar {
  height: 600px;
  width: 100%;
  padding-right: 40px;

  .el-select {
    width: 100%;
  }

  :deep(.el-collapse-item__header) {
    font-size: 18px;
    font-weight: 550;
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

  .el-form-item {
    margin-bottom: 20px;

    :deep(.el-form-item__label) {
      height: auto;
    }
  }

  :deep(.el-form-item__content) {
    align-content: flex-start;
    align-items: flex-start
  }
}
</style>