<script setup>
import { editBuilding } from "@/apis/building.js";
import { reactive, ref } from "vue";

const props = defineProps ({
  bh: {
    type: String,
    default: ""
  }
});
const getData = async () => {
  const { data } = await editBuilding (props.bh);
  Object.assign (Infor, data);
};
getData ();

const size = ref ("large");
const Infor = reactive ({});

</script>

<template>
  <div class="label-title">
    基本信息
  </div>
  <div class="info">
    <div class="tab">
      <div class="label">社区：</div>
      <div class="content">
        {{ Infor.departName }}
      </div>
    </div>
    <div class="tab">
      <div class="label">小区（楼）名称：</div>
      <div class="content">
        {{ Infor.xqName }}
      </div>
    </div>
    <div class="tab">
      <div class="label">楼号：</div>
      <div class="content">
        {{ Infor.lh }}
      </div>
    </div>
    <div class="tab">
      <div class="label">所在地址：</div>
      <div class="content">
        {{ Infor.szdz }}
      </div>
    </div>
    <div class="tab">
      <div class="label">建筑性质：</div>
      <div class="content">
        {{ Infor.jzxz }}
      </div>
    </div>
    <div class="tab">
      <div class="label">物业单位：</div>
      <div class="content">
        {{ Infor.wydw }}
      </div>
    </div>
    <div class="tab">
      <div class="label">联系人：</div>
      <div class="content">
        {{ Infor.lxr }}
      </div>
    </div>
    <div class="tab">
      <div class="label">联系电话：</div>
      <div class="content">
        {{ Infor.lxdh }}
      </div>
    </div>
    <div class="tab">
      <div class="label">
        <span>建筑全景照片:</span>
      </div>
      <div v-for="i in Infor.ldqmzp" class="content">
        <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                  :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="contain"
                  style="width: 100px; height: 100px;margin-right: 10px;"/>
      </div>
    </div>
    <div class="tab">
      <div class="label">
        <span>建筑全景照片:</span>
      </div>
      <div v-for="i in Infor.jzgcxfyjszp" class="content">
        <el-image :preview-src-list="['http://kfq.kejin.net.cn:8223'+i.path]"
                  :src="'http://kfq.kejin.net.cn:8223'+i.path" fit="contain"
                  style="width: 100px; height: 100px;margin-right: 10px;"/>
      </div>
    </div>
  </div>
  <div class="label-title">
    建筑基本信息
  </div>
  <div class="info">
    <div class="tab">
      <div class="label">
        高层建筑类别：
      </div>
      <div class="content">
        {{ Infor.gcjzlb }}
      </div>
    </div>
    <div class="tab">
      <div class="label">
        楼高（米）：
      </div>
      <div class="content">
        {{ Infor.lg }}
      </div>
    </div>
    <div class="tab">
      <div class="label">
        是否挂牌：
      </div>
      <div class="content">{{ Infor.sfgp }}</div>
    </div>
    <div class="tab">
      <div class="label">
        地上建筑层数（层）：
      </div>
      <div class="content">{{ Infor.dsjzcs }}</div>
    </div>
    <div class="tab">
      <div class="label">
        地下建筑层数（层）：
      </div>
      <div class="content">{{ Infor.dxjzcs }}</div>
    </div>
    <div class="tab">
      <div class="label">
        架空层（层）：
      </div>
      <div class="content">{{ Infor.jkc }}</div>
    </div>
    <div class="tab">
      <div class="label">
        架空层位置（层）：
      </div>
      <div class="content">{{ Infor.jkcwz }}</div>
    </div>
    <div class="tab">
      <div class="label">
        火灾发生情况：
      </div>
      <div class="content">{{ Infor.hzfsqk }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>