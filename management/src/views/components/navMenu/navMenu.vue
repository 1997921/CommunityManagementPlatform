<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const activeIndex = ref("1")
const clickPath = (keyPath: string) => {
  // console.log("----点击跳转路径", keyPath);
  router.push('/' + keyPath)
}

</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo nav" mode="horizontal">
    <el-menu-item index="1" @click="clickPath('index')">工单提醒</el-menu-item>
    <el-menu-item index="2" @click="clickPath('sentiment')">舆情管理</el-menu-item>
    <el-menu-item index="3" @click="clickPath('groupDynamics')">群组动态</el-menu-item>
    <el-menu-item index="4" @click="clickPath('groupAdmin')">群组管理</el-menu-item>
  </el-menu>
</template>


<style lang="scss" scoped></style>
