<template>
  <el-dialog title="详情" :visible.sync="open"  width="900px" append-to-body custom-class="pub_dialog"
             :close-on-click-modal="false"
  >
    <div style="min-height: 600px" v-loading="loading">
      <el-divider content-position="left">群组人员</el-divider>
      <div class="avatar-list lz-flex lz-flex-wrap">
        <div class="avatar-item text-center lz-padding-10 lz-relative" v-for="item in selectUserList" :key="item.id">
          <!-- <el-avatar :src="item.avatar ? item.avatar : require('@/assets/images/profile.jpg')"> -->
          <!-- </el-avatar> -->
          <div class="nickName">{{item.nickName}}</div>
          <div class="online-status" v-if="item.onlineStatus == 1" :style="{'background':item.watchStatus==0?'#589dff':'green'}" ></div>
          <div class="approve-status" v-if="item.approveState == 0">待审核</div>
        </div>
        <div class="avatar-item text-center lz-padding-10" style="cursor: pointer" @click="callback(1)" v-if="authority == 1">
          <i class="el-icon-circle-plus-outline lz-font-42"></i>
          <div>加人</div>
        </div>
        <div class="avatar-item text-center lz-padding-10" style="cursor: pointer" @click="callback(2)" v-if="authority == 1">
          <i class="el-icon-remove-outline lz-font-42"></i>
          <div>踢人</div>
        </div>
      </div>
      <el-divider content-position="left">提请详情</el-divider>
      <request-form ref="requestForm" :form.sync="form" :disabled="true"></request-form>
    </div>
    <div slot="footer" class="dialog-footer lz-flex lz-justify-right width100">
      <el-button @click="cancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import RequestForm from '@/views/base/flow/components/RequestForm'
export default {
  name: 'ChatDetail',
  components: {  },//RequestForm
  data() {
    return {
      open: false,
      form: {},
      selectUserList:[],
      // 删除和拉人权限
      authority:0,
      loading:false
    }
  },
  methods: {
    // 判断权限
    judgmentAuthority(){
      console.log("获取当前人角色权限" + this.$store.state.user.name)
      for (let i = 0; i < this.selectUserList.length; i++) {
        if(this.$store.state.user.name == this.selectUserList[i].userName){
          console.log("获取当前人角色权限" + this.selectUserList[i].memberRole)
          if(this.selectUserList[i].memberRole == 0 || this.selectUserList[i].memberRole == 1){
              this.authority = 1;
          }
        }
      }
    },
    openDialog() {
      this.open = true
      this.judgmentAuthority();
    },
    cancel() {
      this.open = false
    },
    callback(type){
      // 踢人 拉人
      if(type == 2 || type == 1){
        this.$emit("callback",type)
      }
    }
  }
}
</script>

<style scoped>
::v-deep .el-avatar {
  background-color: #3662EC;
}
.online-status{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #00DF6C;
  top: 10px;
  left: calc(50% - 20px - 10px);
}
.approve-status{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: calc(50% - 20px - 0px);
  background-color: rgba(0,0,0,0.3);
  border-radius: 40px;
  font-size: 12px;
  line-height: 40px;
  color: #ffff;
}
.avatar-item{
  width: 90px;
}
.avatar-item .nickName{
  overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
}
</style>
