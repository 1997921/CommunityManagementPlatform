<template>
    <el-container class="containner" style="height: 88vh;">
        <el-main class="el-gutter-top">
            <navMenu></navMenu>
            <div class="pl-main">
                <div class="card">
                    <tablePane :list="tablePaneList" @clickComponentName ="ComponentNameClick"></tablePane>
                    <groupManagement v-if="activeName==='1'"></groupManagement>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import{ref} from "vue"
import type { TabsPaneContext } from "element-plus";
import navMenu from "../components/navMenu/navMenu.vue"
import groupManagement from "./group-managent/managent-index.vue"
// import pepoleManage from "./pepole-manage.vue"
// import Fellow from "./fellow.vue"

import tablePane from "../components/table-pane/pane-index.vue"
const activeName = ref("1");
const ComponentNameClick = (pane: TabsPaneContext) => {
    // console.log("pane---", pane.props.name);
    activeName.value = pane.props.label.toString();

};
//tablePaneList
const tablePaneList = [
    {
    id:1,
    name:"群管理", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"99",
    tipsBgMsg:"",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:2,
    name:"群成员管理", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"",
    showStatus_Img:true,
    showStatus_more:false
    }
]
</script>

<style lang="scss" scoped>
.card {
    height: 100%;
}

::v-deep .el-tabs__nav-wrap {
    margin: 0 auto;
    width: 340px;
}

::v-deep .el-tabs__header {
    border-bottom: 1px solid #dfe4ed;
    margin-bottom: 0px;
}
</style>