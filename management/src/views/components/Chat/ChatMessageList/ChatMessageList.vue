<template>
  <div class="TUIChat TUI-chat-message-list">
    <div class="TUIChat-main">
      <div class="TUI-message-list" ref="mianscroll">
        <div class="message-li" v-for="(item,index) in chatMessageList" :key="index">
          <div class="message-timestamp" :class="{'lz-padding-bottom-20': item.messageType == 6 || item.messageType == 5}">{{ parseMessageTime(item.createTime) }}</div>
          <!--  离开和进入    -->
          <div class="lz-text-center lz-padding-bottom-20" v-if="item.messageType == 6 || item.messageType == 5 || item.messageType == 7 || item.messageType == 9">
              <span>
                {{ item.content }}
              </span>
          </div>
          <div class="message-item" v-else>
            <div class="message-bubble">
              <div class="message-bubble-main-content" :class="item.createBy == $store.state.user.name ?'reverse':''">
                <div class="avatar-container" style="width: 36px; height: 36px; border-radius: 5px;">
                  <img class="avatar-image" :src="item.avatar? item.avatar : require('../../../../assets/mainIcon/01.jpg')">
                  <div class="placeholder hidden skeleton-animation">
                  </div>
                </div>
                <div class="message-body">
                  <div class="message-body-nickName" v-if="item.createBy != $store.state.user.name ?'reverse':''">
                    {{ item.nickName }}
                  </div>
                  <div class="message-body-main">
                    <!--                      'content-noPadding':item.messageType == 1,-->
                    <div class="blink message-body-content "
                         :class="{'content-in': item.createBy != $store.state.user.name,'content-out':item.createBy == $store.state.user.name}"
                    >
                      <div class="content-main">
                        <!--   文本-->
                        <div class="custom" v-if="item.messageType == 0">
                            <span v-html="item.content"></span>
                        </div>
                        <!-- 图片-->
                        <div class="imageContainer" style="width: 300px; height: 271.8px;" v-if="item.messageType == 4">
                          <img class="messageImage" :src="item.content" @click="onPreview(item.content)" width="1000"
                               height="906"
                          >
                        </div>
                        <!-- 视频-->
                        <div class="imageContainer" style="width: 300px; height: 271.8px;" v-if="item.messageType == 10">
<!--                          <img class="messageImage" :src="item.content" @click="onPreview(item.content)" width="1000"-->
<!--                               height="906"-->
<!--                          >-->
                          <video :ref="'videoPlayer' + item.id" :id="item.id" :src="item.content" @play="handlePlay" @pause="handlePause" @ended="handleEnded"   controls style="width: 100%;height: 100%"></video>
                        </div>
                        <!-- 文件-->
                        <div class="fileMessageContainer" v-if="item.messageType == 1" @click="downloadFile(item)">
                          <div class="common-icon-container fileIcon">
                            <!-- <img class="common-icon" src="@/assets/images/chat/file2.png" alt=""
                                 style="width: 20px;height: 20px;"
                            > -->
                          </div>
                          <div>
                            <div>{{ item.fileName }}</div>
                            <div>{{ formatFileSize(item.fileSize) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" style="z-index: 3000"/>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
// import { saveDownloadRecord } from '@/api/base/group'

export default {
  name: 'ChatMessageList',
  components: { ElImageViewer },
  props: {
    chatMessageList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      srcList: [],
      showViewer: false,
      oldv: 0,
      scrollHeight:0,
      playId: false, // 当前是否有视频正在播放
    }
  },
  mounted() {
    this.topScrollClick()
  },
  methods: {
    handlePlay(event){
      if (this.playId != event.target.id && this.playId) {
        // 如果已经有视频在播放，则停止它
        this.$refs['videoPlayer' + this.playId][0].pause()
      }
      this.playId = event.target.id;
      // 播放视频
      this.$refs['videoPlayer' + this.playId][0].play()
    },
    handlePause() {
      // this.playId = false;
    },
    handleEnded() {
      // this.playId = false;
    },
    // 格式化文件大小
    formatFileSize(size) {
      if (size === 0) return '0 B'
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const index = Math.floor(Math.log(size) / Math.log(1024))
      return `${+(size / Math.pow(1024, index)).toFixed(2)} ${units[index]}`
    },
    // 下载文件
    downloadFile(row) {
      // saveDownloadRecord({ messageId: row.id }).then(res => {
      // })
      // let name = row.fileName
      // let url = row.content
      // // let suffix = url.substring(url.lastIndexOf("."), url.length);
      // const a = document.createElement('a')
      // a.setAttribute('download', name)
      // a.setAttribute('target', '_blank')
      // a.setAttribute('href', url)
      // a.click()
      this.$download.resource({ messageId: row.id });
    },
    getScrollTop() {
      this.scrollHeight = this.$refs.mianscroll.scrollHeight;
    },
    setScrollTop() {
      let scrollEl = this.$refs.mianscroll
      console.log(scrollEl.scrollHeight - this.scrollHeight)
      scrollEl.scrollTo({ top: scrollEl.scrollHeight - this.scrollHeight, behavior: 'instant' })
    },
    // 监听组件滚动到顶部
    topScrollClick() {
      this.$nextTick(() => {
        this.$refs.mianscroll.onscroll = () => {
          // 获取距离顶部的距离
          let scrollTop = this.$refs.mianscroll.scrollTop
          if (scrollTop !== 0 && this.oldv == 0) {
            this.oldv = scrollTop
          }
          // 获取可视区的高度
          let windowHeight = this.$refs.mianscroll.clientHeight
          // 获取滚动条的总高度
          let scrollHeight = this.$refs.mianscroll.scrollHeight
          if (scrollTop + windowHeight >= scrollHeight) {
            // console.log('到达底部了')
          }
          if (scrollTop == 0 && this.oldv !== 0) {
            // console.log('到达头部了')
            this.$emit('loadMore')
          }
        }
      })
    },
    // 判断给定时间是否是当天且在相同分钟内
    isSameMinute(createTime) {
      const now = new Date()
      now.setSeconds(0, 0) // 设置为当前时间的同一分钟开始
      const postDate = new Date(createTime)
      postDate.setSeconds(0, 0) // 同样设置为同一分钟开始
      return now.getTime() === postDate.getTime()
    },
    // 格式化消息时间
    parseMessageTime(createTime) {
      if (this.isToday(createTime)) {
        return this.parseTime(createTime, '{h}:{i}')
      } else {
        return this.parseTime(createTime, '{y}-{m}-{d} {h}:{i}')
      }
    },
    // 判断给定时间是否是当天
    isToday(createTime) {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // 设置为当天零点
      const postDate = this.parseTimestamp(createTime)
      postDate.setHours(0, 0, 0, 0) // 同样设置为零点以便只比较日期部分
      return today.getTime() === postDate.getTime()
    },
    // 将时间戳转换为 Date 对象
    parseTimestamp(timestamp) {
      return new Date(timestamp) // 假设 timestamp 是以秒为单位的Unix时间戳
    },
    bottomScrollClick() {
      this.$nextTick(() => {
        let scrollEl = this.$refs.mianscroll
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' })
      })
    },
    onPreview(url) {
      this.srcList = []
      this.srcList.push(url)
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>

<style scoped>

/*聊天记录*/
.TUI-chat-message-list {
  flex: 1;
  overflow: hidden;
  display: flex;
}

.TUIChat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.TUIChat-main {
  height: 100%;
  /* min-height: 150px; */
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.TUIChat-main .TUI-message-list {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /*overflow-anchor: none;*/
}

.TUIChat-main .TUI-message-list .message-li:first-child {
  margin-top: 5px;
}

.TUIChat-main .TUI-message-list .message-li {
  display: flex;
  padding: 0;
  flex-direction: column;
}

.message-timestamp {
  margin: 0 auto;
  color: #999;
  font-size: 12px;
  width: -webkit-fill-available;
  overflow-wrap: anywhere;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px 30px;
}

.message-timestamp {
  margin: 0 auto;
  color: #999;
  font-size: 12px;
  width: -webkit-fill-available;
  overflow-wrap: anywhere;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px 30px;
}

.TUIChat-main .TUI-message-list .message-li .message-item {
  display: flex;
  position: relative;
  flex-direction: column;
}

.message-bubble {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 20px 25px;
}

.message-bubble .message-bubble-main-content {
  display: flex;
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

.message-bubble .message-bubble-main-content .message-body {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 8px;
  max-width: calc(100% - 54px);
}

.message-bubble .message-bubble-main-content .message-body .message-body-nickName {
  margin-bottom: 4px;
  font-size: 12px;
  color: #999;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main {
  display: flex;
  flex-direction: row;
  min-width: 0px;
  box-sizing: border-box;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main .content-in {
  background: #f0f0f0;
  border-radius: 0 10px 10px;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main .content-out {
  background: #dceafd;
  border-radius: 10px 0 10px 10px;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main .message-body-content {
  display: flex;
  flex-direction: column;
  min-width: 0px;
  box-sizing: border-box;
  padding: 12px;
  font-size: 14px;
  color: #000;
  letter-spacing: 0;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  overflow: hidden;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main .message-body-content .content-main {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-content: flex-start;
  border: 0 solid black;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.message-bubble .message-bubble-main-content .message-body .message-body-main .content-noPadding {
  padding: 0;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
}

.imageContainer {
  overflow: hidden;
  background-color: #f4f4f4;
}

.imageContainer .messageImage {
  max-width: min(100vw - 180px, 300px);
  max-height: min(100vw - 180px, 300px);
  width: inherit;
  height: inherit;
  object-fit: cover;
  cursor: pointer;
}

.fileMessageContainer {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.fileMessageContainer .fileIcon {
  margin: auto 8px;
}

.common-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.custom {
  font-size: 14px;
}
.custom ::v-deep img{
  margin: 0 3px;
}
.reverse {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
}
</style>
