<script setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { getRectification, submitRectification } from "@/apis/hiddenTrouble.js";
import { ElMessage } from "element-plus";
import { useStore } from "@/stores/user.js";
import { afterRead } from "@/utils/tools.js";
import dayjs from "dayjs";

const store = useStore()
const props = defineProps({
  params: {
    type: Object, default: () => {
      return {
        bh: '', jcxm: ''
      }
    }
  }
})
const emits = defineEmits(['colsemasg'])
if (props.params.bh !== "") {
  const getData = async () => {
    const {data} = await getRectification(props.params.bh, props.params.jcxm)
    Object.assign(Information, data)
    Information.jzgcxfyjszp = data.jzgcxfyjszp.map(item => {
      return {
        url: 'http://kfq.kejin.net.cn:8223' + item.path,
      }
    })
    Information.ldqmzp = data.ldqmzp.map(item => {
      return {
        url: 'http://kfq.kejin.net.cn:8223' + item.path,
      }
    })
    Information.fjbhzp = data.fjbhzp.map(item => {
      return {
        url: 'http://kfq.kejin.net.cn:8223' + item.path,
      }
    })
  }
  getData()
}
const ruleFormRef = ref()
const rules = reactive({
  zgsm: [{required: true, message: '请输入整改说明', trigger: 'blur'},],
  zgwcsj: [{required: true, message: '请输入整改完成时间', trigger: 'blur'},],
  zgzp: [{required: true, message: '请上传整改图片', trigger: 'blur'},]
})
const Information = reactive({
  qyfzrTel: '', fileList: [], fjbhzp: [],
})

const HazarInfo = reactive({})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      HazarInfo.jcxx_itme = props.params.bh
      HazarInfo.jcxm = props.params.jcxm
      HazarInfo.zgzp = HazarInfo.zgzp.map(item => {
        return item.response.data
      })
      const data = await submitRectification(HazarInfo)
      if (data.code === 200) {
        ElMessage({
          message: '提交成功', grouping: true, type: 'success',
        })
        setTimeout(() => {
          emits('colsemasg')
        }, 1000)
      } else {
        ElMessage({
          message: data.msg, grouping: true, type: 'error',
        })
        setTimeout(() => {
          emits('colsemasg')
        }, 1000)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
defineExpose({
  submitForm, ruleFormRef,
})
</script>

<template>
  <el-scrollbar>
    <el-form ref="ruleFormRef" :model="HazarInfo" :rules="rules" label-position="right"
             label-width="160px" status-icon>
      <div class="label-title">
        <span>基本信息</span>
      </div>
      <el-row :gutter="0" class="View-box" justify="start">
        <el-col :span="8">
          <el-form-item label="社区：" prop="">
            <el-input v-model="Information.departName" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="小区（楼）名称：" prop="">
            <el-input v-model="Information.xqName" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼号：" prop="">
            <el-input v-model="Information.lh" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地址：" prop="">
            <el-input v-model="Information.szdz" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑性质：" prop="">
            <el-input v-model="Information.jzxz" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业单位：" prop="">
            <el-input v-model="Information.wydw" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人：" prop="">
            <el-input v-model="Information.lxr" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话：" prop="">
            <el-input v-model="Information.lxdh" placeholder="" readonly/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="楼栋全貌：" prop="">
            <div v-for="fit in Information.ldqmzp" class="block">
              <el-image :preview-src-list="[fit.url]" :src="fit.url" fit="cover"
                        style="width: 100px; height: 100px;margin-right: 10px;"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑工程消防意见书:" prop="">
            <div v-for="fit in Information.jzgcxfyjszp" class="block">
              <el-image :preview-src-list="[fit.url]" :src="fit.url" fit="cover"
                        style="width: 100px; height: 100px;margin-right: 10px;"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="label-title">
        <span>建筑基本信息</span>
      </div>
      <el-row :gutter="0" class="View-box" justify="start">
        <el-col :span="8">
          <el-form-item label="高层建筑类别：" prop="">
            <el-input v-model="Information.gcjzlb" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼高（米）：" prop="">
            <el-input v-model="Information.lg" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否挂牌：" prop="">
            <el-input v-model="Information.sfgp" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地上建筑层数(层)：" prop="">
            <el-input v-model="Information.dsjzcs" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地下建筑层数(层)：" prop="">
            <el-input v-model="Information.dxjzcs" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="架空层(层)：" prop="">
            <el-input v-model="Information.jkc" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col v-if="Information.jkc === '是'" :span="8">
          <el-form-item label="架空层位置(层):" prop="">
            <el-input v-model="Information.jkcwz" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="火灾发生情况：" prop="">
            <el-input v-model="Information.hzfsqk" placeholder="" readonly/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="label-title">
        <span>整改情况</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="检查事项" prop="">
            <el-input v-model="Information.jcxm" readonly placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="">
            <el-input v-model="HazarInfo.bz" readonly placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="整改期限" prop="">
            <el-input v-if="Information.zgqx" :value="dayjs(Information.zgqx).format('YYYY-MM-DD')" placeholder="" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="整改说明" prop="zgsm">
            <el-input v-model="HazarInfo.zgsm" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="整改完成时间" prop="zgwcsj">
            <el-date-picker
                v-model="HazarInfo.zgwcsj"
                format="YYYY/MM/DD"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检查图片" prop="">
            <div v-for="fit in Information.fjbhzp" class="block">
              <el-image :preview-src-list="[fit.url]" :src="fit.url" fit="cover"
                        style="width: 100px; height: 100px;margin-right: 10px;"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="整改图片" prop="zgzp">
            <div style="display: flex">
              <el-upload
                  v-model:file-list=HazarInfo.zgzp
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
            </div>
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
  padding-right: 40px;

  .View-box {
    .el-form-item__content {
      .el-input {

        :deep(.el-input__wrapper) {
          box-shadow: none !important;

          .el-input__inner {
            cursor: auto;

          }
        }
      }

      .el-select {
        :deep(.el-input__wrapper) {
          box-shadow: none !important;

          .el-input__suffix {
            display: none;
          }
        }
      }
    }
  }


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