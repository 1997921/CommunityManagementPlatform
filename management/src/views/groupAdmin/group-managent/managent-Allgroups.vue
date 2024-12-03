<template>
  <el-table class="pl-top" :data="tableData" borde style="width: 100%">
    <el-table-column fixed prop="name" label="群名称" width="500"></el-table-column>
    <el-table-column prop="user" label="成员/未存档/实名" width="500"></el-table-column>
    <el-table-column prop="mangerUser" label="群主" width="500"></el-table-column>
    <el-table-column prop="mCity" label="管群单位" width="500"></el-table-column>
    <el-table-column prop="mUser" label="管理人员" width="500"></el-table-column>
    <el-table-column prop="type" label="群类别" width="500"></el-table-column>
    <el-table-column prop="type" label="是否实名" width="500"></el-table-column>
    <el-table-column prop="address" label="进群单位" width="500"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template v-slot="scope">
        <el-popover placement="right" width="200" trigger="click">
          <div style="display: flex;flex-direction: column;align-items:flex-start;">
            <div v-for="(item, index) in targetList" :key="index" class="pl-top">
              <img :src=item.bgurl alt="" style="vertical-align: middle;">
              <a class="pl-left">{{ item.name }}</a>
            </div>
          </div>
          <template v-slot:reference>
            <el-button type="text" size="small" @click="handleClick(scope.row)">标记</el-button>
          </template>
        </el-popover>
        <el-button type="text" size="small">群详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getAssetsFile } from "../../../util/getAssetsFile/getAssetsFile"
const tableData = [{
  name: '建东党员社群交流群|群名称：建东社区党员交流群',
  user: '王小虎',
  mangerUser: 'xxx',
  mCity: '普陀区',
  mUser: "xxx",
  type: "",
  address: '上海市普陀区金沙江路 1518 弄',
}];
const targetList = ref([
  { id: 1, name: "示范群", bgurl: getAssetsFile("02.png") },
  { id: 1, name: "重点关注群", bgurl: getAssetsFile("02.png") },
  { id: 1, name: "高度关注群", bgurl: getAssetsFile("02.png") },
  { id: 1, name: "禁止挂起", bgurl: getAssetsFile("02.png") },
  { id: 1, name: "疑似广告群", bgurl: getAssetsFile("02.png") }
])
const handleClick = (e: object) => {
  console.log(e)
}
</script>