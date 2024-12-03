<template>
    <div class="con">
        <cardTitle :showStatus_box="false" :titile="'消息内容'" :showStatus_Img="true" :showStatus_more="false">
            <template v-slot:footer>
                <div
                    style="display: flex;flex-direction: row;align-items: center;flex: 1; margin-left: 100%;width: 30%;">
                    <el-cascader :options="options1" clearable placeholder="按群名称/群备注"></el-cascader>
                    <el-input class="pl-left" suffix-icon="el-icon-search" v-model="cheackInput"
                        placeholder="请输入群名称或者群备注进行搜索"></el-input>
                    <img class="pl-left" src="../../../assets/mainIcon/存档@1x.png">
                    <img class="pl-left" src="../../../assets/mainIcon/存档@1x.png">
                </div>
            </template>
        </cardTitle>
        <tablePane :list="tablePaneList" @clickComponentName ="ComponentNameClick"></tablePane>
        <Allgroups v-if="activeName==='1'"></Allgroups>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus";
import cardTitle from "../../components/cardTitle/cardTitle.vue"
import Allgroups from "./managent-Allgroups.vue"
import tablePane from "../../components/table-pane/pane-index.vue"
const activeName = ref("1")
const cheackInput = ref("")
const options1 = [
    {
        value: 'zhinan',
        label: '工业路',
    }];
const ComponentNameClick = (pane:TabsPaneContext) => {
    // console.log("pane---", pane.props.name);
    activeName.value = pane.props.label.toString();
};
//tablePaneList
const tablePaneList = [
{
    id:1,
    name:"全部群", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"99",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:2,
    name:"纳入管理群", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:3,
    name:"未分类群", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"danger",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:4,
    name:"已挂起群", 
    showStatus_box:true,
    PageAffiliation:"",
    tipsMsg:"12",
    tipsBgMsg:"success",
    showStatus_Img:true,
    showStatus_more:false
    },
    {
    id:5,
    name:"异动群", 
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