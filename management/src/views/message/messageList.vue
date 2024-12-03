<template>
    <div class="con">
        <navMenu></navMenu>
        <cardTitle :showStatus_box="false" :titile="'消息通知列表'" :showStatus_Img="true" :showStatus_more="false">
        </cardTitle>
        <tablePane :list="tablePaneList" @clickComponentName ="ComponentNameClick"></tablePane>
        <!-- <Allgroups v-if="activeName==='1'"></Allgroups> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus";
import cardTitle from "../components/cardTitle/cardTitle.vue"
import tablePane from "../components/table-pane/pane-index.vue"
import navMenu from "../components/navMenu/navMenu.vue"
const activeName = ref("1")
const ComponentNameClick = (pane:TabsPaneContext) => {
    debugger
    // console.log("pane---", pane.props.name);
    activeName.value = pane.props.label.toString();
};
//tablePaneList
const tablePaneList = [
    {
    id:1,
    name:"全部消息", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"99",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:2,
    name:"我发起的提醒消息", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:3,
    name:"提醒我消息", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:4,
    name:"系统自动提醒我的消息", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"success",
    showStatus_Img:true,
    showStatus_more:false
    },
]
</script>

<style lang="scss" scoped>
.con {
    padding: 10px 20px;
}

.con ::v-deep .el-tabs__nav-wrap {
    margin: 0;
    width: 100%;
}

.con ::v-deep .el-tabs__header {
    border-bottom: none;
}
</style>