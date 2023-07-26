<script setup>
import { editBuilding } from "@/apis/building.js";
import { reactive, ref } from "vue";

const props = defineProps({
  bh: {
    type: String, default: ''
  }
})
const getData = async () => {
  const {data} = await editBuilding(props.bh)
  Object.assign(Infor, data)
  console.log(data)
}
getData()

const size = ref('large')
const Infor = reactive({})
</script>

<template>
  <el-descriptions :column="4" :size="size" border title="基本信息">
    <el-descriptions-item label="社区：">{{ Infor.departName }}</el-descriptions-item>
    <el-descriptions-item label="小区（楼）名称：">{{ Infor.xqName }}</el-descriptions-item>
    <el-descriptions-item label="楼号：">{{ Infor.lh }}</el-descriptions-item>
    <el-descriptions-item label="所在地址：">{{ Infor.szdz }}</el-descriptions-item>
    <el-descriptions-item label="建筑性质：">{{ Infor.jzxz }}</el-descriptions-item>
    <el-descriptions-item label="物业单位：">{{ Infor.wydw }}</el-descriptions-item>
    <el-descriptions-item label="联系人：">{{ Infor.lxr }}</el-descriptions-item>
    <el-descriptions-item label="联系电话：">{{ Infor.lxdh }}</el-descriptions-item>
    <el-descriptions-item label="楼栋全貌：">
      <div style="display: flex">
        <div v-for="i in Infor.ldqmzp">
          <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                    :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="cover"
                    style="width: 100px; height: 100px;margin-right: 10px;"/>
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="建筑工程消防意见书：">
      <div style="display: flex">
        <div v-for="i in Infor.jzgcxfyjszp">
          <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                    :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="cover"
                    style="width: 100px; height: 100px;margin-right: 10px;"/>
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
  <el-descriptions :column="4" :size="size" border style="margin-top: 20px;" title="建筑基本信息">
    <el-descriptions-item label="高层建筑类别：">{{ Infor.gcjzlb }}</el-descriptions-item>
    <el-descriptions-item label="楼高（米）：">{{ Infor.lg }}</el-descriptions-item>
    <el-descriptions-item label="是否挂牌：">{{ Infor.sfgp }}</el-descriptions-item>
    <el-descriptions-item label="地上建筑层数(层)：">{{ Infor.dsjzcs }}</el-descriptions-item>
    <el-descriptions-item label="地下建筑层数(层)：">{{ Infor.dxjzcs }}</el-descriptions-item>
    <el-descriptions-item label="架空层(层)：">{{ Infor.jkc }}</el-descriptions-item>
    <el-descriptions-item label="架空层位置(层)：">{{ Infor.jkcwz }}</el-descriptions-item>
    <el-descriptions-item label="火灾发生情况：">{{ Infor.hzfsqk }}</el-descriptions-item>
  </el-descriptions>
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