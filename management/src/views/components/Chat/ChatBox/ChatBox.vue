<template>
  <div class="home-chat">
    <div class="chat">
      <div class="TUI-chat">
        <div class="TUI-chat">
          <!--    头部-->
          <div class="chat-header TUI-chat-header">
            <div class="chat-header-content">{{ currChatGroup.requestTitle }}</div>
            <div class="lz-flex lz-align-center">
              <div class="chat-header-more lz-margin-right-15">
                <i class="el-icon-finished"></i>
              </div>
            </div>
          </div>
          <!--聊天内容-->
          <chat-message-list ref="chatMessageList" :chatMessageList="chatMessageList"
            @loadMore="emit('loadMore')"></chat-message-list>
          <!-- 聊天工具-->
          <div class="message-input-toolbar TUI-chat-message-input-toolbar"
            v-if="Object.keys(currChatGroup).length > 0">
            <div class="message-input-toolbar-list">
              <div class="toolbar-item-container">
                <div class="toolbar-item-container-icon" @click="showEmoji">
                  <div class="common-icon-container icon">
                    <img class="common-icon" src="../../../../assets/chat/emoji.svg"
                      style="width: 20px; height: 20px;display: block">
                  </div>
                </div>
                <div class="toolbar-item-container-dialog" ref="emojiDialog" v-if="emojiVisible">
                  <div class="emoji-picker">
                    <ul class="emoji-picker-list">
                      <li class="emoji-picker-list-item" v-for="item in emojiList" :key="item">
                        <img class="emoji" :src="'/emoji/' + item">
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="toolbar-item-container">
                <div class="toolbar-item-container-icon">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </div>
              <input type="file" ref="imageInput" accept="image/*" style="display: none" />
              <div class="toolbar-item-container">
                <div class="toolbar-item-container-icon">
                  <i class="el-icon-folder-opened"></i>
                </div>
              </div>
              <input type="file" ref="fileInput" style="display: none" />
            </div>
            <div class="message-input-toolbar-list-end"></div>
          </div>
          <!-- 输入框 -->
          <div class="message-input-wrapper TUI-chat-message-input" v-if="Object.keys(currChatGroup).length > 0">
            <div class="message-input-container">
              <div class="message-input-editor-container">
                <wang-editor v-model="sendMessage" class="editor" ref="editor" v-if="showFlag"
                  :isDisabled="currChatGroup.mySelfFlag == '0'"></wang-editor>
              </div>
              <div class="message-input-button">
                <el-button type="primary" v-if="currChatGroup.mySelfFlag == '0'" @click="joinGroup()">
                  加入群聊
                </el-button>
                <el-button type="primary" v-else @click="sendMsg(0, sendMessage)">发送</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ChatMessageList from '../ChatMessageList/ChatMessageList.vue'
import { defineProps, ref, defineEmits } from "vue"
const emit = defineEmits(['joinGroup', 'sendMessage', 'loadMore'])
const props = defineProps({
  currChatGroup: {
    type: Object, default: () => { },
  },
  chatMessageList: {
    type: Array, default: () => [],
  }
})
const showFlag = true;
const sendMessage = '';
// const formData = null;
// const authority = 0;
const emojiList = ['1f600.png', '1f62c.png', '1f601.png', '1f602.png', '1f923.png', '1f973.png',
  '1f603.png', '1f604.png', '1f605.png', '1f606.png', '1f607.png', '1f609.png',
  '1f60a.png', '1f642.png', '1f643.png', '263a.png', '1f60b.png', '1f60c.png',
  '1f60d.png', '1f970.png', '1f618.png', '1f617.png', '1f619.png', '1f61a.png',
  '1f61c.png', '1f92a.png', '1f928.png', '1f9d0.png', '1f61d.png', '1f61b.png',
  '1f911.png', '1f913.png', '1f60e.png', '1f929.png', '1f921.png', '1f920.png',
  '1f917.png', '1f60f.png', '1f636.png', '1f610.png', '1f611.png', '1f612.png',
  '1f644.png', '1f914.png', '1f925.png', '1f92d.png', '1f92b.png', '1f92c.png',
  '1f92f.png', '1f633.png', '1f61e.png', '1f61f.png', '1f620.png', '1f621.png'
];
const emojiVisible = ref(false);
// const emojPrefixAddress="";
const showEmoji = () => {
  if (props.currChatGroup.mySelfFlag == '0') {
    return
  }
  document.addEventListener('click', hidePanel, false)
};
// const hide = () => {
//   document.removeEventListener('click', hidePanel, false)
// },
const hidePanel = () => {
  if (!emojiVisible.value) {
    emojiVisible.value = !emojiVisible.value
    return
  }
  // if (!emojiDialog.contains(e.target)) {
  //   this.emojiVisible = false
  //   hide()
  // }
};
// 领导加入群聊
const joinGroup = () => {
  emit('joinGroup', props.currChatGroup)
};
//
const sendMsg = (type: number, contentText: string) => {
  if (!contentText || contentText.length == 0 || !formatContent(contentText)) {
    return
  }
  // 如果表情窗口显示则隐藏
  if (emojiVisible.value) {
    emojiVisible.value = false
  }
  const data = {
    type: type,
    contentText: contentText,
    // fileName: fileName,
    // fileSize: fileSize
  }
  emit('sendMessage', data)
  // this.$nextTick(() => {
  //   if (type === 0) {
  //     this.sendMessage = ''
  //     this.showFlag = false
  //     setTimeout(() => {
  //       this.showFlag = true
  //     }, 30)
  //   }
  //   this.bottomScrollClick()
  // })
}
const formatContent = (str: string) => {
  //检查是否有文本
  const value = str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig, '').replace(/ /ig, '')
  //检查有图片？
  const imgHave = (new RegExp('img', 'ig')).test(str)
  if (value.length > 0 || imgHave) {
    return true
  }
  return false
  // return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig, '')
};


</script>

<style scoped>
.home-chat {
  box-sizing: border-box;
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.chat {
  height: 100%;
  overflow: hidden;
}

.TUI-chat {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.TUI-chat-header {
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
}

.chat-header-content {
  flex: 1;
  font-size: 16px;
  line-height: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #000;
  letter-spacing: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chat-header-setting {
  width: 27px;
  height: 27px;
  font-size: 27px;
  cursor: pointer;
}

.chat-header-more {
  font-size: 22px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}

/*工具*/
.message-input-toolbar {
  border-top: 1px solid #f4f5f9;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.message-input-toolbar-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.toolbar-item-container {
  position: relative;
}

.toolbar-item-container-icon {
  padding: 8px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  font-size: 21px;
}

/*输入内容*/
.TUI-chat-message-input {
  height: 160px;
  display: flex;
}

.message-input-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.message-input-container {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: none;
  overflow: hidden;
}

.message-input-editor-container {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3px 10px 10px;
}

.message-input-editor-container ::v-deep .el-textarea {
  height: 100%;
}

.message-input-editor-container ::v-deep .el-textarea__inner {
  padding: 0;
  border: 0;
  resize: none;
  height: 100%;
}

.message-input-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.toolbar-item-container-dialog {
  z-index: 5;
  position: absolute;
  background: #ffffff;
  box-shadow: 0 2px 12px #0000001a;
  width: fit-content;
  height: fit-content;
  bottom: 35px;
}

.toolbar-item-container-dialog:after {
  content: "";
  position: absolute;
}

.emoji-picker {
  width: 425px;
  height: 214px;
  display: flex;
  flex-direction: column;
}

ol,
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  font-style: normal;
}

.emoji-picker-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  margin: 2px;
}

.emoji-picker-list-item {
  cursor: pointer;
  padding: 5px;
}

.emoji-picker-list-item .emoji {
  width: 25px;
  height: 25px;
}

img {
  pointer-events: none;
  border: 0;
  vertical-align: middle;
}

.editor ::v-deep .w-e-image-dragger {
  display: none;
}
</style>
