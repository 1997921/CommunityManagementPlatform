<template>
  <div>
    <el-form label-position="top" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="被提醒人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="提醒内容" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
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
</style>