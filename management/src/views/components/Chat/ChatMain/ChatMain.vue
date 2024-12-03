<template>
  <div style="height: 100%;">
    <!-- 主弹窗-->
    <div custom-class="chat-main" v-if="dialogTableVisible" style="height: 100%;">
      <div class="chat" v-loading="loading">
        <!--  左侧群组列表-->
        <chat-conversation v-if="chatleftStatus" :titleStatus="titleStatus" :title="title" :searchStatus="searchStatus"
          :updownStatus="updownStatus" :currChatGroup="currChatGroup" @switchConversation="switchConversation"
          @moreChatConversationList="moreChatConversationList" ref="chatConversation"
          :chatConversationList="chatConversationList"></chat-conversation>
        <!--  右侧内容-->
        <chat-box v-if="true" :chatMessageList="chatMessageList" :currChatGroup="currChatGroup" @sendMessage="sendMsg"
          ref="chat-box"></chat-box>
        <!--无消息展示弹框-->
        <div class="pl-empty" v-if="false">
          <div class="pl-empty-con">
            <img src="../../../../assets/chat/empty.png" alt="">
            <p style="color: #eeeef2;">请在左边群列表中点击需要查看的群~</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatConversation from '../ChatConversation/ChatConversation.vue'
// import ChatBox from '../ChatBox/ChatBox.vue'
import { reactive, ref, defineProps, type PropType } from 'vue';
// const emit = defineEmits(['close']) // 定义事件

defineProps({
  chatleftStatus: Boolean,
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
interface mesageType {
  createTime: number,
  messageType: number,
  content: string,
  groupId: number,
  name: string,
  createBy: string,
  fileName: string,
  fileSize: string,
}
const dialogTableVisible = ref(true)
const loading = ref(false)
const chatConversationList: object[] = [];
const chatMessageList = ref(Array as PropType<mesageType[]>);
const currChatGroup = {
  id: 1,
  unreadNumber: 5,
  requestTitle: "xx社群交流群|群名称：xx社区党员交流群",
  lastMsg: {
    createTime: "2020",
    messageType: "",
    content: "111"
  }
}
//切换群组
const switchConversation = (conversation: object) => {
  console.log("conversation", conversation)
}
// 加载更多
const moreChatConversationList = () => {

};
//用户发送消息
const sendMsg = () => {
  // 发送初始化消息
  // const initMessage = {
  //   messageType: e.type,
  //   content: e.contentText,
  //   groupId: currChatGroup.id,
  //   fileName: e.type === 1 ? e.fileName : '',
  //   fileSize: e.type === 1 ? e.fileSize : '',
  // };
  // sendMessage(JSON.stringify(initMessage));
  // 手动插入聊天记录表里
  // chatMessageList.value.push({
  //   createTime: new Date().getTime(),
  //   messageType: e.type,
  //   content: e.contentText,
  //   groupId: currChatGroup.id,
  //   name: "",
  //   createBy: "",
  //   fileName: e.type === 1 ? e.fileName : '',
  //   fileSize: e.type === 1 ? e.fileSize : '',
  // })
};
// const sendMessage = () => {
// if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
//   this.websocket.send(message); // 发送消息到WebSocket服务器
// }
// };
reactive({
  websocket: null, // WebSocket对象
  reconnectInterval: 3000, // 重连间隔时间（毫秒）
  heartbeatInterval: null, // 心跳定时器
  timer: null,
  websocketUrl: "",
  chatMessageList: [],
  messageTotal: 0,
  messagePageNum: 1,
  messageLoadingFlag: false,

  chatName: "",
  // 当前群组
  // currChatGroup:{},
  currChatGroup: {
    id: 1,
    unreadNumber: 5,
    requestTitle: "建东党员社群交流群|群名称：建东社区党员交流群",
    lastMsg: {
      createTime: "2020",
      messageType: "",
      content: "111"
    }
  },
  currChatGroupIndex: "",
  conversationPageNum: 1,
  conversationLoadingFlag: false,
  selectUserList: [],// 群组人员列表
})
// // 关闭窗口
// const dialogClose = ()=>{
//   dialogTableVisible.value = false;
//   emit('close');
// };
// // 更改加载状态
// const changeLoadingStatus = (val: boolean) =>{
//   loading.value = val;
// };
</script>

<style scoped>
.pl-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.pl-empty-con {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep .chat-main {
  padding: 0;
  border-radius: 12px;
  background-color: transparent;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  height: calc(100% - 100px);
  /*width: calc(100% - 30px);*/
}

::v-deep .chat-main .el-dialog__header {
  display: none;
}

.chat {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  border: 0 solid black;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #fff;
}

::v-deep .chat-main .el-dialog__body {
  padding: 0;
  height: 100%;
}
</style>
