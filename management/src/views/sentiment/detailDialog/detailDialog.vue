<template>
    <el-dialog v-model="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :title="title"
        @close="cancel()">
        <Add @detailDialogClose="detailDialogClose" v-if="title == '添加检测方案'"></Add>
        <distribute @detailDialogClose="detailDialogClose" v-if="title == '派单'"></distribute>
        <Report @detailDialogClose="detailDialogClose" v-if="title == '上报'"></Report>
        <Reminders @detailDialogClose="detailDialogClose" v-if="title == '处置提醒'"></Reminders>
    </el-dialog>
</template>

<script setup lang="ts">
import Add from "./detailDialog-add.vue"
import Reminders from "./detailDialog-Reminders.vue"
import distribute from "./detailDialog-distribute.vue"
import Report from "./detailDialog-report.vue"

import { defineEmits, watch, ref } from "vue"
const emit = defineEmits(['detailDialogClose']) // 定义事件
const dialogVisible = ref(false)
const props = defineProps({
    detailDialogStatus: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "xxx",
    }
})
watch(() => props.detailDialogStatus, (newValue, oldValue) => {
    dialogVisible.value = newValue
    console.log(`Message changed from "${oldValue}" to "${newValue}"，`)
    console.log('dialogVisible', dialogVisible.value)
})
const cancel = () => {
    emit('detailDialogClose', true);
};
const detailDialogClose = () => {
    emit('detailDialogClose', true);
}
</script>
<style lang="scss" scoped>
// ::v-deep .el-dialog__header {
//     background: #007af7;
//     padding: 14px;
// }

// ::v-deep .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
//     color: #fff;
// }

// ::v-deep .el-dialog__title {
//     color: #fff;
// }

// ::v-deep .el-dialog__body {
//     padding: 20px;
// }

// ::v-deep .el-form-item {
//     margin-bottom: 0;
// }</style>