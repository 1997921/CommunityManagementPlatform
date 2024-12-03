<template>
  <div>
    <el-form label-position="top" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="排除关键词" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="其他设置" prop="desc">
        <el-col> <el-checkbox>检测方案对下级共享</el-checkbox></el-col>
        <el-col> <el-checkbox>敏感消息自动发送至指定人员微信</el-checkbox></el-col>
        <el-col><el-checkbox>自动识别有害群、人</el-checkbox></el-col>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" style="display: flex;flex-direction: row;align-items: center;">
      <el-button @click="cancel()">取 消</el-button>
      <el-button style="margin-left: 10px;" type="primary" @click="commit()">确 定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { defineEmits } from "vue"
const emit = defineEmits(['detailDialogClose']) // 定义事件

const ruleForm = {
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
};
const cancel = () => {
  emit('detailDialogClose', true);
};
const commit = () => {
  emit('detailDialogClose', true);
};
// const rules = {
//   name: [
//     { required: true, message: '请输入活动名称', trigger: 'blur' },
//     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
//   ],
//   region: [
//     { required: true, message: '请选择活动区域', trigger: 'change' }
//   ],
//   date1: [
//     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//   ],
//   date2: [
//     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
//   ],
//   type: [
//     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
//   ],
//   resource: [
//     { required: true, message: '请选择活动资源', trigger: 'change' }
//   ],
//   desc: [
//     { required: true, message: '请填写活动形式', trigger: 'blur' }
//   ]
// };

</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  background: #007af7;
  padding: 14px;
}

::v-deep .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

::v-deep .el-dialog__title {
  color: #fff;
}

::v-deep .el-dialog__body {
  padding: 20px;
}

::v-deep .el-form-item {
  margin-bottom: 0;
}

::v-deep .el-dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>