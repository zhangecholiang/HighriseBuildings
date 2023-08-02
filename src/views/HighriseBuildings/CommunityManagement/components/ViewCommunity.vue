<script setup>
import {onMounted, reactive, ref} from "vue";
import {useDict} from "@/stores/dict.js";
import {ElMessage} from "element-plus";
import {addCommunity, getCommunity} from "@/apis/community.js";

const dict = useDict()
const emits = defineEmits(["close"])
const props = defineProps({
  bh: {
    type: String,
    default: ""
  }
})
const loading = ref(false)
const Information = reactive({
  "csqLoginid": "",
  "xqName": "",
})
const rules = reactive({
  csqLoginid: [
    {required: true, message: '请选择社区', trigger: 'blur'}
  ],
  xqName: [
    {required: true, message: '请输入小区', trigger: 'blur'}
  ],
})
onMounted(async () => {
  if (props.bh !== "") {
    const {data} = await getCommunity(props.bh)
    Object.assign(Information, data)
  }
})
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      if (props.bh !== "") {
        const data = await addCommunity(Information);
        if (data.code === 200) {
          ElMessage({
            message: "修改成功",
            grouping: true,
            type: "success",
          });
          setTimeout(() => {
            emits("close");
            loading.value = false;
          }, 1000);
        } else {
          ElMessage({
            message: "修改失败",
            grouping: true,
            type: "warning",
          });
          setTimeout(() => {
            emits("close");
          }, 1000);
        }
      } else {
        const data = await addCommunity(Information);
        if (data.code === 200) {
          ElMessage({
            message: "提交成功",
            grouping: true,
            type: "success",
          });
          setTimeout(() => {
            emits("close");
            loading.value = false;
          }, 1000);
        } else {
          ElMessage({
            message: data.msg,
            grouping: true,
            type: "error",
          });
          setTimeout(() => {
            emits("close");
          }, 1000);
        }
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
defineExpose({
  submitForm,
  ruleFormRef,
});
</script>

<template>
  <el-form ref="ruleFormRef" v-loading="loading" :model="Information" :rules="rules" element-loading-text="提交中..."
           inline label-position="right" label-width="140px" status-icon>
    <div class="label-title">
      <span>基本信息</span>
    </div>
    <el-row :gutter="0" justify="start">
      <el-col :span="12">
        <el-form-item label="社区" prop="csqLoginid">
          <el-select v-model="Information.csqLoginid" clearable>
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
        <el-form-item label="小区（楼）名称" prop="xqName">
          <el-input v-model="Information.xqName" clearable placeholder="请输入小区（楼）名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="less" scoped>
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