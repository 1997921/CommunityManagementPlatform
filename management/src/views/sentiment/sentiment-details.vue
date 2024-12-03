<template>
    <el-container class="containner" style="flex-direction: column;background: #fff;height: 77vh">
        <div class="el-gutter-top">
            <div class="header">
                <p class="header-title">详情</p>
                <el-row style="position: absolute;align-items: center;">
                    <el-button @click="backPage()" style="margin-left: 10px;">
                        {{ "<<返回" }} </el-button>
                            <el-button style="margin-left: 10px;">上一条</el-button>
                            <el-button style="margin-left: 10px;">下一条</el-button>
                </el-row>
            </div>
        </div>
        <div class="box-card pl-p pl-flex">
            <el-col style="flex-wrap: wrap;width: 70%;display: flex;">
                <el-col :span="8" v-for="item in datalist" :key="item.name">
                    <div class="pl-text"><span>{{ item.name }}:</span><span>{{ item.data }}</span></div>
                </el-col>
                <el-col :span="18" class="el-gutter-top pl-message">
                    <p>消息内容:</p>
                    <p>就是想问问，咱们的电话保质期...</p>
                </el-col>
                <el-col class="el-gutter-top">
                    <el-button type="primary" @click="distribute()" style="margin-right: 10px;">派单</el-button>
                    <el-button type="primary" @click="report()" style="margin-right: 10px;">上报</el-button>
                    <el-button type="primary" @click="Reminders()" style="margin-right: 10px;">处置提醒</el-button>
                </el-col>
            </el-col>
            <el-col style="width: 27%;">
                <Chat :searchStatus="true" :chatleftStatus="false" style="height:66vh;"></Chat>
            </el-col>
        </div>
        <detailDialog :detailDialogStatus="DialogStatus" @detailDialogClose="detailDialogClose" :title="DialogTitle">
        </detailDialog>
    </el-container>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue"
// import Chat from "../components/Chat/Chat.vue"
import detailDialog from "./detailDialog/detailDialog.vue"


const emit = defineEmits(['detailClose']) // 定义事件

const datalist = [
    {
        name: "发言时间",
        data: ""
    },
    {
        name: "发言人昵称",
        data: ""
    },
    {
        name: "成员标记",
        data: ""
    },
    {
        name: "个人在群里昵称",
        data: ""
    },
    {
        name: "群名称",
        data: ""
    },
    {
        name: "群组标记",
        data: ""
    },
    {
        name: "群组备注",
        data: ""
    },
    {
        name: "管理单位",
        data: ""
    },
    {
        name: "所属单位",
        data: ""
    },
    {
        name: "监管方案",
        data: ""
    },
    {
        name: "命中关键词",
        data: ""
    }

];
const DialogStatus = ref(false);
const DialogTitle = ref("")
const backPage = () => {
    emit('detailClose', true)
};
const distribute = () => {
    DialogStatus.value = true
    DialogTitle.value = "派单"
};
const report = () => {
    DialogStatus.value = true
    DialogTitle.value = "上报"
};
const Reminders = () => {
    DialogStatus.value = true
    DialogTitle.value = "处置提醒"
};
const detailDialogClose = () => {
    DialogStatus.value = false
}
</script>

<style lang="scss" scoped>
.pl-main {
    width: 100%;
    // height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.card {
    height: 100%;

}

.box-card {
    flex-direction: row;
    width: calc(100% - 300px);
}

.header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
}

.header-title {
    display: block;
    margin: 0 auto;
    padding: 6px;
}

.pl-text {
    font-size: 14px;
    padding: 10px;
}

.el-gutter-top {
    margin-top: 10px;
}

.pl-message {
    padding: 20px;
    background: #eef1f6;
    width: 100%;
    margin-top: 20px 0;
}

.pl-con {
    flex: 1;
}
</style>