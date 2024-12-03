<template>
    <el-container class="containner">
        <el-aside class="pl-aside">
            <div class="pl-top">
                <el-button icon="el-icon-circle-plus-outline" class="pl-button"
                    @click="dialogVisible()">添加检测方案</el-button>
            </div>
            <div class="pl-top">
                <el-button class="el-icon-setting pl-button" style="text-align: left;" v-for="item in superviseList"
                    :key="item.name" @click="getTestingPlan()">{{ item.name }}</el-button>
            </div>
        </el-aside>
        <div class="custom-con" v-loading="loading">
            <el-main style="background: #fff; height: 100%;" v-if="detailStatus">
                <cardTitle :showStatus_box="false" :titile="'消息内容'" :showStatus_Img="true" :showStatus_more="false">
                    <template v-slot:footer>
                        <div style="display: flex;flex-direction: row;align-items: center;">
                            <el-input v-model="cheackInput" placeholder="请输入内容"></el-input>
                            <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search">搜索</el-button>
                            <el-button style="margin-left: 10px;background-color: transparent;"
                                icon="el-icon-refresh">重置</el-button>
                        </div>
                    </template>
                </cardTitle>
                <div class="main-table" style="height: 66vh;margin-top: 10px;">
                    <!-- <p class="main-table-title">编辑可见列<i class="el-icon-arrow-down el-icon--right"></i></p> -->
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column fixed prop="date" label="发言时间">
                        </el-table-column>
                        <el-table-column prop="message" label="消息内容">
                        </el-table-column>
                        <el-table-column prop="name" label="发言人昵称">
                        </el-table-column>
                        <el-table-column prop="address" label="群名称">
                        </el-table-column>
                        <el-table-column prop="type" label="内容检测名称">
                        </el-table-column>
                        <el-table-column prop="city" label="管群单位">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template v-slot="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                                <!-- <el-button type="text" size="small">编辑</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
            <listDetails v-else @detailClose="detailCloseFn"></listDetails>
        </div>
        <!--添加检测方案弹窗-->
        <detailDialog :detailDialogStatus="cheackDialogStatus" @detailDialogClose="cheackDialogClose"
            :title="detailDialogTitle">
        </detailDialog>
    </el-container>
</template>

<script setup lang="ts">
import cardTitle from "../components/cardTitle/cardTitle.vue"
import listDetails from "./sentiment-details.vue"
import detailDialog from "./detailDialog/detailDialog.vue"
import { ref } from "vue";
const cheackInput = "";
const loading = ref(false);
const tableData = [{
    date: '2016-05-02',
    name: 'xxx',
    message: '咱就是想问问...',
    city: '花园街',
    address: '4号楼二单元民生小区',
    type: "关注事件"
}
];
const superviseList = [
    {
        name: '关注事件',
        type: "关注事件"
    },
    {
        name: '房产',
        type: "关注事件"
    },
    {
        name: '1月重点',
        type: "关注事件"
    },
    {
        name: '意识形态',
        type: "关注事件"
    }
];
const detailStatus = ref(true);
const cheackDialogStatus = ref(false);
const detailDialogTitle = ref("");
//打开详情页
const handleClick = (tab: object) => {
    console.log(tab); // 获取最新的Tab名称
    detailStatus.value = false
};
//关闭详情页面
const detailCloseFn = () => {
    // console.log("detailCloseFn", e)
    detailStatus.value = true
};
//打开弹框
const dialogVisible = () => {
    cheackDialogStatus.value = true;
    detailDialogTitle.value = "添加检测方案"
};
//关闭弹框
const cheackDialogClose = () => {
    // console.log(e)
    cheackDialogStatus.value = false
};
//获取检测方案
const getTestingPlan = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 300)
}

</script>

<style lang="scss" scoped>
.pl-aside {
    display: flex;
    flex-direction: column;
    width: 18%;
    background: none;
}

.pl-top {
    margin-top: 10px;
}

.main-table-title {
    width: 100%;
    border-bottom: 1px solid #e6ebf5;
    color: #c0c0c2;
    padding: 10px;
}

.pl-button {
    // background: #fff;
    width: 100%;
    padding: 16px;
}

::v-deep .el-button+.el-button {
    margin-left: 0;
    margin: 10px auto;
}

::v-deep .el-card__header {
    border-bottom: none;
}

.custom-con {
    width: calc(100% - 300px);
}

// .el-dialog__header {
//     // border-right: 1px solid black;
// background-color: rgb(64, 158, 255) !important;
// }</style>