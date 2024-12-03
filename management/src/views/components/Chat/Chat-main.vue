<template>
  <div style="height: 100%;">
    <chat-main ref="chat-main" 
    :searchStatus="searchStatus"
    :updownStatus="updownStatus" 
    :titleStatus ="titleStatus"
    :title="title"
    :chatleftStatus="chatleftStatus"   
    @close="dialogClose" 
    @finish="handleFinish" 
    @detail="handleDetail" 
    @switchConversation="switchConversation"
    ></chat-main>
  </div>
</template>
<script setup lang="ts">
import { defineProps} from 'vue'
import ChatMain from '../../components/Chat/ChatMain/ChatMain.vue'
defineProps({
  searchStatus:Boolean,
    chatleftStatus:Boolean,
    titleStatus:Boolean,
    title:String,
    updownStatus:Boolean,

})
// 关闭聊天窗口
const dialogClose =()=>{
    
};
const handleFinish =()=>{
    
};
const handleDetail =()=>{
    
};
const switchConversation =()=>{
    
};
</script>

<style scoped>
.position{
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 9999;
}
.num{
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: 1;
}
</style>
