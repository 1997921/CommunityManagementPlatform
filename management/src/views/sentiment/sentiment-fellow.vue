<template>
    <el-container class="containner" style="height: 88vh;">
        <el-main class="el-gutter-top">
            <div class="pl-main">
                <div class="card">
                    <!-- <Chat style="height: 80vh;padding: 10px;"  :searchStatus="true":chatleftStatus="true"></Chat> -->
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