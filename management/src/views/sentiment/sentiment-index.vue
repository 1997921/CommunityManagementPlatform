<script setup lang="ts">
// import Chat from "../components/Chat/Chat.vue"
import Custom from "./sentiment-custom.vue"
import Fellow from "./sentiment-fellow.vue"
import navMenu from "../components/navMenu/navMenu.vue"

const activeName = 'custom'
const handleClick = () => {
    // console.log(tab.props.name, event); // 获取最新的Tab名称
};
</script>

<template>
    <navMenu></navMenu>
    <el-container class="containner" style="height: 88vh;">
        <el-main class="el-gutter-top">
            <div class="pl-main">
                <div class="card">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="自定义舆情" name="custom">
                            <Custom></Custom>
                        </el-tab-pane>
                        <el-tab-pane label="关注群动态" name="chat">
                            <!-- <Chat style="height: 80vh;padding: 10px;" :searchStatus="true" :chatleftStatus="true">
                            </Chat> -->
                        </el-tab-pane>
                        <el-tab-pane label="关注人动态" name="Fellow">
                            <Fellow></Fellow>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.card {
    height: 100%;
}

::v-deep .el-tabs__nav-wrap {
    margin: 0 auto;
    width: 340px;
}

::v-deep .el-tabs__header {
    border-bottom: 1px solid #dfe4ed;
    margin-bottom: 0px;
}
</style>