<template>
  <div class="home-conversation">
    <div class="title-header" v-if="titleStatus">
      <b class="card-title">{{ title }}
        <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
          <img src="../../../../assets/mainIcon/wenti.svg" style="vertical-align: middle;" />
        </el-tooltip>
        <!-- <i class="el-icon-refresh" style="margin-right: 10px;cursor: pointer;font-size: 18px;"></i> -->
      </b>
    </div>
    <!--   搜索   -->
    <div class="tui-search tui-search-main-global" v-if="searchStatus">
      <div class="tui-search-global">
        <div class="tui-search-global-header">
          <div class="tui-search-input">
            <el-input placeholder="请输入要搜索的群组名称" v-model="keyword" size="small" clearable @clear="clearSearch"
              @input="keywordChange($event)">
              <template v-slot:prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
          <i class="el-icon-refresh" style="margin-right: 10px;cursor: pointer;font-size: 18px;"></i>
        </div>
      </div>
    </div>
    <!--   下拉框   -->
    <div class="tui-search tui-search-main-global" v-if="updownStatus">
      <div class="tui-search-global-header" style="background: transparent;">
        <div class="updown-select">
          <el-cascader :options="options1" clearable placeholder="组织架构" style="width:50%"></el-cascader>
          <el-cascader :options="options2" clearable placeholder="群类别" style="width:50%"></el-cascader>
        </div>
      </div>
    </div>
    <!-- 群里列表-->
    <div class="tui-conversation">
      <div class="tui-conversation-list">
        <div class="TUI-conversation-content" v-for="(item, index) in filterHistoryList" :key="index"
          @click="handleClick(index)">
          <div class="isPC TUI-conversation-item"
            :class="currChatGroupList.id == item.id ? 'TUI-conversation-item-selected' : ''">
            <div class="left">
              <div class="avatar-container" style="width: 36px; height: 36px; border-radius: 5px;">
                <img class="avatar-image" src="../../../../assets/mainIcon/01.jpg">
                <div class="placeholder hidden skeleton-animation"></div>
              </div>
              <span class="num" v-if="item.unreadNumber > 0">{{ item.unreadNumber > 99 ? '99+' :
                item.unreadNumber}}</span>
            </div>
            <div class="content">
              <div class="content-header">
                <label class="content-header-label">
                  <!--群名-->
                  <p class="name">{{ item.requestTitle }}</p>
                  <p class="name" style="font-size: 12px; color: rgb(156 159 161);">{{ item.requestTitle }}</p>
                </label>
                <div class="middle-box">
                  <p class="middle-box-content"
                    v-if="item.lastMsg && item.lastMsg.nickName && (item.lastMsg.messageType == 0 || item.lastMsg.messageType == 1 || item.lastMsg.messageType == 4)">
                    {{ item.lastMsg.nickName }}:
                    <span v-if="item.lastMsg.messageType == 0">{{ item.lastMsg.content }}</span>
                    <span v-if="item.lastMsg.messageType == 1">发送附件</span>
                    <span v-if="item.lastMsg.messageType == 4">发送图片</span>
                  </p>
                  <p class="middle-box-content"
                    v-if="item.lastMsg && (item.lastMsg.messageType == 5 || item.lastMsg.messageType == 6 || item.lastMsg.messageType == 7)">
                    系统消息:
                    <span>{{ item.lastMsg.content }}</span>
                  </p>
                </div>
              </div>
              <!-- <div class="content-footer">
                <span class="time" v-if="item.lastMsg && item.lastMsg.createTime != '2000-01-01 00:00:00'">{{ parseMessageTime(item.lastMsg.createTime) }}</span>
              </div> -->
            </div>
          </div>
        </div>
        <div v-if="filterHistoryList.length == 0" class="lz-text-center lz-margin-top-20">
          暂无群聊记录
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"
const emit = defineEmits(['switchConversation']) // 定义事件
defineProps({
  chatConversationList: {
    type: Array,
    default: () => [],
  },
  currChatGroup: {
    type: Object,
    default: () => { }
  },
  searchStatus: {
    type: Boolean,
    default: false
  },
  titleStatus: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  updownStatus: {
    type: Boolean,
    default: false
  }
})
// const props = {
//         lazy: false,
//         lazyLoad(node: { children?: any; level?: any; }, resolve: (arg0: any) => void) {
//           // const { level } = node;
//           //模拟数据
//           setTimeout(() => {
//             const nodes = node.children.map((item: { label: any; }) => ({
//                 value: item.label,
//                 label: item.label,
//                 level: 2
//               }));
//             // 通过调用resolve将子节点数据返回，通知组件数据加载完成
//             resolve(nodes);
//           }, 1000);
//         }
//       };
const options1 = [
  {
    value: 'zhinan',
    label: '工业路',
  }];
const options2 = [
  {
    value: 'zhinan',
    label: '全部',
    children: [
      {
        value: 'shejiyuanze',
        label: '规模企业',
      },
      {
        value: 'daohang',
        label: '行业场所',
      }]
  }]
const filterHistoryList = [
  {
    id: 1,
    unreadNumber: 5,
    requestTitle: "建东党员社群交流群|群名称：建东社区党员交流群",
    lastMsg: {
      createTime: "2020",
      messageType: 0,
      content: "111",
      nickName: "",
    }
  },
];
const keyword = ref("")
const selected = ref({})
//清空搜索
const clearSearch = () => {
  // filterHistoryList = this.chatConversationList;
};
//本地搜索
const keywordChange = (keywords: string) => {
  keyword.value = keywords;
  // this.filterHistoryList = this.seachArray(this.chatConversationList, keywords)
};
const handleClick = (index: number) => {
  selected.value = index;
  emit("switchConversation", index);
}
const currChatGroupList = {
  id: 1
}
</script>

<style scoped>
.updown-select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

::v-deep .el-input--medium .el-input__inner {
  height: 30px;
  line-height: 30px;
  background: #eeeef2;
}

.home-conversation {
  min-width: 285px;
  box-sizing: border-box;
  flex: 0 0 24%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f4f5f9;
}

.tui-search-main-global {
  width: 100%;
  height: 48px;
}

.tui-search .tui-search-global-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.tui-conversation {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tui-conversation-list {
  font-weight: 400;
  letter-spacing: 0;
  flex: 1;
  overflow: auto;
}

.TUI-conversation-content {
  position: relative;
}

.TUI-conversation-item {
  padding: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.TUI-conversation-item-selected {
  background: rgba(0, 110, 255, .1);
}

.TUI-conversation-item .left {
  position: relative;
  width: 36px;
  height: 36px;
}

.TUI-conversation-item .content {
  display: flex;
  flex: 1;
  padding-left: 8px;
  justify-content: space-between;
}

.TUI-conversation-item .left .num {
  position: absolute;
  display: inline-block;
  right: -5px;
  top: -5px;
  min-width: 15px;
  padding: 0 2.5px;
  height: 15px;
  font-size: 10px;
  text-align: center;
  line-height: 15px;
  border-radius: 7.5px;
}

.TUI-conversation-item .left .num,
.TUI-conversation-item .left .num-notify {
  background: red;
  color: #fff;
}

.avatar-container {
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex: 0 0 auto;
}

.avatar-container .avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-container .placeholder.hidden {
  opacity: 0;
}

.avatar-container .placeholder.skeleton-animation {
  animation: breath-ebee2d22 2s linear .3s infinite;
}

.avatar-container .placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ececec;
  transition: opacity .3s, background-color .1s ease-out;
}

.TUI-conversation-item .content-header {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.TUI-conversation-item .content-header-label {
  flex: 1;
  font-size: 14px;
}

.TUI-conversation-item .content-header .middle-box {
  flex: 1;
  display: flex;
  align-items: center;
}

.TUI-conversation-item .content-header .middle-box-content {
  flex: 1;
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
}

.TUI-conversation-item .middle-box-content {
  font-weight: 400;
  color: #999;
  letter-spacing: 0;
}

.TUI-conversation-item .content-header .name {
  width: 200px;
  letter-spacing: 0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.TUI-conversation-item .content-header .name {
  font-weight: 400;
  letter-spacing: 0;
  color: #000;
}

.TUI-conversation-item .content .content-footer {
  align-items: flex-end;
}

.TUI-conversation-item .content-footer {
  line-height: 16px;
  display: flex;
  flex-direction: column;
}

.TUI-conversation-item .content-footer {
  color: #999;
}

.TUI-conversation-item .content-footer .time {
  font-size: 12px;
  line-height: 16px;
  display: inline-block;
  white-space: nowrap;
}

.TUI-conversation-item .content-footer .time {
  color: #bbb;
}

.tui-search-input {
  display: flex;
  flex-direction: row;
  width: calc(100% - 20px);
  margin: 10px;
  margin-left: 0px;
  background: #ededed;
  justify-content: center;
  align-items: center;
  height: 28px;
  border-radius: 4px;
}

.title-header {
  padding: 10px 0px;
  border-bottom: 1px solid #e6ebf5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>
