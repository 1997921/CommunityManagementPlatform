<script setup lang="ts">
import { ref } from 'vue'
import { getAssetsFile } from "../util/getAssetsFile/getAssetsFile"
import Chat from "../views/components/Chat/Chat-main.vue"
import cardTitle from "./components/cardTitle/cardTitle.vue"
import navMenu from "./components/navMenu/navMenu.vue"
import { useRouter } from 'vue-router'

const router = useRouter()


const mainCardList = ref([
  {
    icon: getAssetsFile("gongdan.png"),
    name: "最新待办（4H以内）",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "未及时回复问题",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "已逾期问题",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "问题跟踪",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "处理提醒",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "未分类群",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "未知晓异动群",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "今日舆情",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "常态化宣传发布提醒",
    num: 0
  },
  {
    icon: getAssetsFile("gongdan.png"),
    name: "待办工单",
    num: 0
  }
])
const tipsMsg = "微信未处理消息 9";
// const chatheaderTitle = "会议室";
const tableData = [{
  name: '五一路',
  status: 1,
}, {
  name: '五一路',
  status: 1,
}, {
  name: '五一路',
  status: 2,
}, {
  name: '五一路',
  status: 0,
}];
const officalDelStatus = ref(true)
const changepage = () => {
  router.push('/index/message')
}
</script>
<template>
  <el-container class="containner">
    <navMenu></navMenu>
    <el-header class="pl-header pl-gutter-top" v-if="officalDelStatus" style="height: 100%;">
      <el-card class="card">
        <cardTitle :showStatus_box="true" :titile="'消息处理'" :showStatus_Img="false" :showStatus_more="false"
          :tipsMsg="tipsMsg"></cardTitle>
        <el-row :gutter="20">
          <el-col :span="25" class="sq-row" v-for="item in mainCardList" :key="item.name" style="padding: 0;">
            <div class="sq-col sq-col-left">
              <img v-bind:src="item.icon" class="sq-icon" />
            </div>
            <div class="sq-col sq-col-right" style="align-items:top;">
              <p class="sq-title">{{ item.name }}
                <img class="tips" src="../assets/mainIcon/wenti.svg"
                  style="vertical-align: middle;width: 16px;height: auto;" />
              </p>
              <p class="card-text"><b>{{ item.num }}</b></p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-main class="el-gutter-top">
      <div class="pl-main">
        <el-card class="card" style="width: 74%;min-height: 100vh;">
          <Chat :searchStatus="false" :chatleftStatus="true" :updownStatus="false" :title="'会议室'" :titleStatus="true">
          </Chat>
        </el-card>
        <div class="offical-RightCard">
          <el-card style="height:40%">
            <cardTitle :showStatus_box="false" :titile="'今日平台登录状态'" :showStatus_Img="true" :showStatus_more="true">
            </cardTitle>
            <el-table :data="tableData" style="width: 100%;text-align: center;">
              <el-table-column prop="name" label="单位">
              </el-table-column>
              <el-table-column prop="status" label="登录状态">
                <template v-slot="scope">
                  <span class="status-circular"
                    :class="scope.row.status == 1 ? 'status-sucess' : scope.row.status == 0 ? 'status-nosucess' : 'status-undefind'"></span>
                  <span>{{ scope.row.status === 1 ? '已登录' : scope.row.status === 0 ? '未登录' : '账号异常' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="offical-RightCard-list" style="height:60%">
            <cardTitle :showStatus_box="false" :titile="'消息列表'" :showStatus_Img="true" :showStatus_more="true"
              @click="changepage()">
            </cardTitle>
            <div class="messagebox">
              <p style="font-size: 14px;color: #a0a5a9;;text-align: center;">暂无数据</p>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
    <el-footer style="height: 0px;"></el-footer>
  </el-container>
</template>
<style scoped lang="scss">
.pl-header {
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
}

.pl-main {
  min-height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pl-card-main {
  flex: 1;
  background-color: rgb(0, 255, 76);
}

.pl-gutter-top {
  margin-top: 10px;
}

.sq-row {
  height: 48px;
  max-height: 48px;
  margin: 10px;
  width: 18%;
  display: flex;
  flex-direction: row;
  border-right: 1px solid #d6d7d9;

}

.sq-col {
  align-items: center;
}

.card-text {
  font-size: 1.4rem;
  margin-top: 10px;
}

.sq-col-left {
  display: flex;
  width: 46px;
}

.sq-icon {
  width: 100%;
}

.sq-col-right {
  margin-left: 10px;
}

.offical-containner {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
  height: 420px;
  max-height: 72vh;
}

.offical-room {
  width: 75%;
}

.offical-room-left {
  width: 25%;
}

.offical-room-leftExtends {
  width: 50%;
  background: #f3f3f4
}

.offical-RightCard {
  margin-left: 10px;
  width: 25%;
  display: flex;
  flex-direction: column;
}

.status-circular {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.status-sucess {
  background: green;
}

.status-nosucess {
  background: rgb(166, 166, 166);
}

.status-undefind {
  background: rgb(241, 151, 15);
}

.offical-RightCard-list {
  margin-top: 10px;
  position: relative;
}

.el-col {
  border-radius: 4px;
}

.containner {
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 4px;

    b {
      font-weight: 700;
    }
  }
}

::v-deep .el-card__body {
  height: 100%;
}

.messagebox {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 60px);
}
</style>
