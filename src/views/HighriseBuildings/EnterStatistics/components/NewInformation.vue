<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const ruleFormRef = ref();
const rules = reactive({
                         District: [
                           {
                             required: true,
                             message: "请输入区镇",
                             trigger: "blur"
                           },
                         ]
                       });
const Information = reactive({});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (!valid) {
      return false;
    } else {
      console.log("error submit!", fields);
    }
  });
};
defineExpose({
               submitForm,
               ruleFormRef,
             });

const activeName = ref("first");
const handleClick = (tab, event) => {
  console.log(tab, event);
};
const activeNames = ref(["1"]);
const handleChange = (val) => {
  console.log(val);
};

const fireSafety = ref([
                         {
                           label: "易燃易爆品",
                           rules: [],
                           option: [
                             {
                               label: "",
                               value: ""
                             }
                           ],
                           files: [],
                         },
                       ]);
const buildingFireProtection = ref([
                                     {
                                       label: "竖向管井和电缆桥架防火封堵",
                                       rules: [],
                                       option: [
                                         {
                                           label: "",
                                           value: ""
                                         }
                                       ],
                                       files: [],
                                     },
                                   ]);
const FireFightingFacilities = ref([
                                     {
                                       label: "建筑灭火器",
                                       rules: [],
                                       option: [
                                         {
                                           label: "",
                                           value: ""
                                         }
                                       ],
                                       files: [],
                                     },
                                   ]);
const getDict = () => {
  axios.post("http://kfq.kejin.net.cn:8001/api20220708/api/dict/bindTree/635", {}, {
    headers: {
      "Authorization": "15449AF42BD3D76BD9624F70ED63F8854BD89625EAB98A1E3371B97D7804C8A31D881E94D8C405DF29CBDD7B006ECC0F2F4F948BE6CE5EB700A8C2AD44BAB80205ED7ACF09D0EC7CEA966EC6686F82F3B98890E15E829028E550B1148B4501B9B2589C0547C9D760"
    }
  }).then(res => {
    if (res.data.code === 200) {
      fireSafety.value = res.data.data.map(item => {
        return {
          label: item.dictName,
          rules: [
            {
              required: true,
              message: "请输入" + item.dictName,
              trigger: "blur"
            }
          ],
          option: item.children.map(item => {
            return {
              label: item.dictName,
              value: item.id,
            };
          }),
          files: [],
        };
      });
    }
  });
  axios.post("http://kfq.kejin.net.cn:8001/api20220708/api/dict/bindTree/636", {}, {
    headers: {
      "Authorization": "15449AF42BD3D76BD9624F70ED63F8854BD89625EAB98A1E3371B97D7804C8A31D881E94D8C405DF29CBDD7B006ECC0F2F4F948BE6CE5EB700A8C2AD44BAB80205ED7ACF09D0EC7CEA966EC6686F82F3B98890E15E829028E550B1148B4501B9B2589C0547C9D760"
    }
  }).then(res => {
    if (res.data.code === 200) {
      buildingFireProtection.value = res.data.data.map(item => {
        return {
          label: item.dictName,
          rules: [
            {
              required: true,
              message: "请输入公司名称",
              trigger: "blur"
            }
          ],
          option: item.children.map(item => {
            return {
              label: item.dictName,
              value: item.id,
            };
          }),
          files: [],
        };
      });
    }
  });
  axios.post("http://kfq.kejin.net.cn:8001/api20220708/api/dict/bindTree/637", {}, {
    headers: {
      "Authorization": "15449AF42BD3D76BD9624F70ED63F8854BD89625EAB98A1E3371B97D7804C8A31D881E94D8C405DF29CBDD7B006ECC0F2F4F948BE6CE5EB700A8C2AD44BAB80205ED7ACF09D0EC7CEA966EC6686F82F3B98890E15E829028E550B1148B4501B9B2589C0547C9D760"
    }
  }).then(res => {
    if (res.data.code === 200) {
      FireFightingFacilities.value = res.data.data.map(item => {
        return {
          label: item.dictName,
          rules: [
            {
              required: true,
              message: "请输入公司名称",
              trigger: "blur"
            }
          ],
          option: item.children.map(item => {
            return {
              label: item.dictName,
              value: item.id,
            };
          }),
          files: [],
        };
      });
    }
  });
};
getDict();
const tableData = [];

const custom = ref([
                     {
                       checkTheMatter: "",
                       checkTheResults: "",
                       checkThePicture: []
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
    <el-form ref="ruleFormRef" :model="Information" :rules="rules"
             label-position="right" label-width="140px" status-icon>
      <div class="label-title">
        <span>基本信息</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="社区" prop="">
            <el-input v-model="Information.companyTel" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="小区（楼）名称" prop="">
            <el-input v-model="Information.regAddress" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼号" prop="">
            <el-input v-model="Information.xydm" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地址" prop="">
            <el-input v-model="Information.trueAddress" placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="label-title">
        <span>建筑基本信息</span>
      </div>
      <el-row :gutter="0" justify="start">
        <el-col :span="8">
          <el-form-item label="高层建筑类别" prop="">
            <el-input v-model="Information.legalRepresentative" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼高（米）" prop="">
            <el-input v-model="Information.legalRepresentativeTel" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否挂牌" prop="">
            <el-input v-model="Information.qyfzr" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地上建筑层数(层)" prop="">
            <el-input v-model="Information.qyfzrTel" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地下建筑层数(层)" prop="">
            <el-input v-model="Information.companyNums" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="架空层(层)" prop="">
            <el-input v-model="Information.workshopArea" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="火灾发生情况" prop="">
            <el-input v-model="Information.cfqk" placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基础检查项" name="first">
          <el-collapse v-model="activeNames" accordion @change="handleChange">
            <el-collapse-item name="1" title="消防安全管理">
              <el-row :gutter="15">
                <el-col v-for="i in fireSafety" :span="8">
                  <el-form-item :label=i.label>
                    <el-select v-model="Information.isRecovered" clearable>
                      <el-option v-for="opt in i.option" :label=opt.label :value=opt.value></el-option>
                    </el-select>
                    <el-upload
                        v-model:file-list=i.files
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
            <el-collapse-item name="2" title="建筑防火">
              <el-row :gutter="15">
                <el-col v-for="i in buildingFireProtection" :span="8">
                  <el-form-item :label=i.label :prop=i.prop>
                    <el-select v-model="Information.isRecovered" clearable>
                      <el-option v-for="opt in i.option" :label=opt.label :value=opt.value></el-option>
                    </el-select>
                    <el-upload
                        v-model:file-list=i.files
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
            <el-collapse-item name="3" title="消防设施">
              <el-row :gutter="15">
                <el-col v-for="i in FireFightingFacilities" :span="8">
                  <el-form-item :label=i.label :prop=i.prop>
                    <el-select v-model="Information.isRecovered" clearable>
                      <el-option v-for="opt in i.option" :label=opt.label :value=opt.value></el-option>
                    </el-select>
                    <el-upload
                        v-model:file-list=i.files
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
            <el-collapse-item name="4" title="检查汇总">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="检查类型" prop="date" width="180"/>
                <el-table-column label="检查事项" prop="name" width="180"/>
                <el-table-column label="检查结果" prop="address"/>
                <el-table-column label="检查图片" prop="address"/>
                <el-table-column label="操作" prop="address"/>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="自定义检查项" name="second">
          <el-row v-for="i in custom" :gutter="15">
            <el-col :span="3">
              <el-button type="primary" @click="AddCustom">添加</el-button>
              <el-button type="danger" @click="DeleteCustom">删除</el-button>
            </el-col>
            <el-col :span="7">
              <el-form-item label='检查事项'>
                <el-input v-model="i.checkTheMatter" placeholder=""/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label='检查结果'>
                <el-input v-model="i.checkTheResults" placeholder=""/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label='检查图片'>
                <el-upload
                    v-model:file-list=i.checkThePicture
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    list-type="picture-card"
                >
                  <el-icon>
                    <Plus/>
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="检查类型" prop="date" width="180"/>
            <el-table-column label="检查事项" prop="name" width="180"/>
            <el-table-column label="检查结果" prop="address"/>
            <el-table-column label="检查图片" prop="address"/>
            <el-table-column label="操作" prop="address"/>
          </el-table>
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