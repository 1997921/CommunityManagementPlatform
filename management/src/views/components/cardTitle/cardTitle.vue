<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  titile: String,
  showStatus_box: Boolean,
  showStatus_Img: Boolean,
  showStatus_more: Boolean,
  tipsMsg: {
    type: String,
    default: "",
  },
  tipsBgMsg: {
    type: String,
    default: "danger",
  }
})
</script>

<template>
  <div class="card-titlebox el-card__header">
    <el-row class="pl-row">
      <p class="card-title" style="display: flex;align-items: center;">
        <span style="display: inline-block;font-size: 14px;">{{ titile }}</span>
        <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
          <img class="tips margin-left-10" src="../../../assets/mainIcon/wenti.svg" v-if="showStatus_Img"
            style="vertical-align: middle;width: 16px;height: auto;cursor: pointer;display: inline-block;" />
        </el-tooltip>
        <el-tag class="tips box-tips" :type="tipsBgMsg" v-if="showStatus_box">{{ tipsMsg }}</el-tag>
      </p>

      <div style="margin-left: 18%;">
        <slot name="footer"></slot>
      </div>
    </el-row>
    <div>
      <span class="card-title" style="color: blue;font-size: 12px;" v-if="showStatus_more"><a>查看更多>></a></span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-titlebox {
  height: 30px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tips {
  margin-left: 4px;
}

.box-tips {
  margin-left: 10px;
}

.pl-row {
  width: 74%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}

.card-title {
  width: 60%;
}
</style>
