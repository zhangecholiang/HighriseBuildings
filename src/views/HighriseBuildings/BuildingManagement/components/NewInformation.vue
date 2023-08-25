<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { addBuilding, editBuilding } from "@/apis/building.js";
import { useDict } from "@/stores/dict.js";
import { getCommunity } from "@/apis/dict.js";
import { useStore } from "@/stores/user.js";
import { ElMessage } from "element-plus";
import { afterRead } from "@/utils/tools.js";

const store = useStore ();
const props = defineProps ({
  bh: {
    type: String,
    default: ""
  }
});
const emits = defineEmits ([ "colsemasg" ]);
const ruleFormRef = ref ();
const rules = reactive (
    {
      csqLoginid: [
        {
          required: true,
          message: "请输入社区",
          trigger: "change"
        },
      ],
      xqbh: [
        {
          required: true,
          message: "请输入小区（楼）名称",
          trigger: "change"
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
      jzxz: [
        {
          required: true,
          message: "请选择建筑性质",
          trigger: "blur"
        },
      ],
      wydw: [
        {
          required: true,
          message: "请选择物业单位",
          trigger: "blur"
        },
      ],
      lxr: [
        {
          required: true,
          message: "请输入联系人",
          trigger: "blur"
        },
      ],
      lxdh: [
        {
          required: true,
          message: "请输入联系电话",
          trigger: "blur"
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "请输入正确的手机号",
          trigger: "blur"
        }
      ],
      el_ldqm: [
        {
          required: true,
          message: "请上传楼栋全貌",
          trigger: "blur"
        },
      ],
      jzgcxfyjs: [
        {
          required: true,
          message: "请上传建筑工程消防意见书",
          trigger: "blur"
        },
      ],
      gcjzlb: [
        {
          required: true,
          message: "请输入高层建筑类别",
          trigger: "blur"
        },
      ],
      lg: [
        {
          required: true,
          message: "请输入楼高",
          trigger: "blur"
        },
      ],
      sfgp: [
        {
          required: true,
          message: "请选择是否高层建筑",
          trigger: "blur"
        },
      ],
      dsjzcs: [
        {
          required: true,
          message: "请输入地上建筑层数",
          trigger: "blur"
        },
      ],
      dxjzcs: [
        {
          required: true,
          message: "请输入地下建筑层数",
          trigger: "blur"
        },
      ],
      jkc: [
        {
          required: true,
          message: "请输入架空层位置(层)",
          trigger: "blur"
        },
      ],
      hzfsqk: [
        {
          required: true,
          message: "请选择火灾发生情况",
          trigger: "blur"
        },
      ],
    });
const Information = reactive ({
  csqLoginid: store.csqLoginid,
  ldqm: [],
  jzgcxfyjs: [],
});
onBeforeMount (() => {
  if (props.bh !== "") {
    const getBuilding = async (bh) => {
      const { data } = await editBuilding (bh);
      Information.el_ldqm = data.ldqmzp.map (item => {
        return {
          url: "http://kfq.kejin.net.cn:8223" + item.path,
          response: {
            data: item
          }
        };
      });
      Information.el_jzgcxfyjs = data.jzgcxfyjszp.map (item => {
        return {
          url: "http://kfq.kejin.net.cn:8223" + item.path,
          response: {
            data: item
          }
        };
      });
      await getxqList (data.csqLoginid);
      Object.assign (Information, data);
    };
    getBuilding (props.bh);
  }
});

const dict = useDict ();
const xqlist = ref ([]);
const getxqList = async (loginid) => {
  Information.xqbh = "";
  if (!loginid) {
    loginid = null;
  }
  const { data } = await getCommunity (loginid);
  xqlist.value = data;
};
store.csqLoginid && getxqList (store.csqLoginid)
const loading = ref (false);
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate (async (valid, fields) => {
    if (valid) {
      loading.value = true;
      Information.ldqm = Information.el_ldqm.map (item => {
        return item.response.data;
      });
      Information.jzgcxfyjs = Information.el_jzgcxfyjs.map (item => {
        return item.response.data;
      });
      if (props.bh !== "") {
        const data = await addBuilding (Information);
        if (data.code === 200) {
          ElMessage ({
            message: "修改成功",
            grouping: true,
            type: "success",
          });
          setTimeout (() => {
            emits ("colsemasg");
            loading.value = false;
          }, 1000);
        } else {
          ElMessage ({
            message: "修改失败",
            grouping: true,
            type: "warning",
          });
          setTimeout (() => {
            emits ("colsemasg");
          }, 1000);
        }
      } else {
        const data = await addBuilding (Information);
        if (data.code === 200) {
          ElMessage ({
            message: "提交成功",
            grouping: true,
            type: "success",
          });
          setTimeout (() => {
            emits ("colsemasg");
            loading.value = false;
          }, 1000);
        } else {
          ElMessage ({
            message: data.msg,
            grouping: true,
            type: "error",
          });
          setTimeout (() => {
            emits ("colsemasg");
          }, 1000);
        }
      }
    } else {
      console.log ("error submit!", fields);
    }
  });
};
defineExpose ({
  submitForm,
  ruleFormRef,
});
</script>

<template>
  <el-scrollbar>
    <el-form ref="ruleFormRef" v-loading="loading" :model="Information" :rules="rules" element-loading-text="提交中..."
             inline label-position="right" label-width="140px" status-icon>
      <div class="label-title">
        <span>基本信息</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="社区" prop="csqLoginid">
            <el-select v-model="Information.csqLoginid" :disabled="store.csqLoginid" clearable placeholder=""
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
            <el-select v-model="Information.xqbh" clearable placeholder="">
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
          <el-form-item label="楼号" prop="">
            <el-input v-model="Information.lh" clearable maxlength="10" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地址" prop="">
            <el-input v-model="Information.szdz" clearable maxlength="100" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑性质" prop="">
            <el-select v-model="Information.jzxz" clearable>
              <el-option
                  v-for="item in dict.jzwxzlist"
                  :key="item.id"
                  :label="item.dictName"
                  :value="item.dictName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业单位" prop="">
            <el-input v-model="Information.wydw" clearable maxlength="20"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人" prop="">
            <el-input v-model="Information.lxr" clearable maxlength="20" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="">
            <el-input v-model="Information.lxdh" clearable placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="楼栋全貌" prop="">
        <el-upload
            v-model:file-list=Information.el_ldqm
            :before-upload="afterRead"
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
      <el-form-item label="建筑工程消防意见书" prop="">
        <el-upload
            v-model:file-list=Information.el_jzgcxfyjs
            :before-upload="afterRead"
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
      <div class="label-title">
        <span>建筑基本信息</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="高层建筑类别" prop="">
            <el-select v-model="Information.gcjzlb" clearable placeholder="">
              <el-option label="一类建筑" value="一类建筑"></el-option>
              <el-option label="二类建筑" value="二类建筑"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼高（米）" prop="">
            <el-input v-model="Information.lg" clearable placeholder="" type="number"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否挂牌" prop="">
            <el-select v-model="Information.sfgp" clearable placeholder="">
              <el-option value="是">是</el-option>
              <el-option value="否">否</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地上建筑层数(层)" prop="">
            <el-input v-model="Information.dsjzcs" clearable placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地下建筑层数(层)" prop="">
            <el-input v-model="Information.dxjzcs" clearable placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="架空层(层)" prop="">
            <el-select v-model="Information.jkc" clearable placeholder="">
              <el-option value="是">是</el-option>
              <el-option value="否">否</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="Information.jkc === '是'" :span="8">
          <el-form-item label="架空层位置(层)" prop="">
            <el-input v-model="Information.jkcwz" clearable placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="火灾发生情况" prop="">
            <el-select v-model="Information.hzfsqk" clearable placeholder="">
              <el-option value="是">是</el-option>
              <el-option value="否">否</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.el-scrollbar {
  height: 600px;
  width: 100%;
  //padding-right: 40px;

  .el-select {
    width: 100%;
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
  }

  .Submit-ico {
    margin-top: 20px;

    .el-form-item__content {
      align-items: center;
    }
  }
}
</style>