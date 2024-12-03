<script setup lang="ts">
import { ref, defineEmits,defineProps,type PropType } from "vue"
// import { useRouter } from 'vue-router'
import type { TabsPaneContext } from "element-plus";
import cardTitle from "../cardTitle/cardTitle.vue"
const emit = defineEmits(['clickComponentName']) // 定义事件
interface paneListItem{
    id:number,
    name:string, 
    showStatus_box:boolean
    PageAffiliation:string,
    tipsMsg:string,
    tipsBgMsg:string,
    showStatus_Img:boolean,
    showStatus_more:boolean
}

defineProps({
  //   text: String,
  list: Array as PropType<paneListItem[]>,
})

const activeName = ref("0")
const handleClick = (pane: TabsPaneContext) => {
    emit('clickComponentName', pane)
};

// const componentName = ref(markRaw(groupManagement));

</script>

<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :name="item.name" :label=item.id v-for="item in list" :key="item.name">
                <template v-slot:label >
                    <span>
                        <cardTitle :tipsMsg="item.tipsMsg" :tipsBgMsg="item.tipsBgMsg" :showStatus_box="item.showStatus_box" :titile="item.name"
                            :showStatus_Img="item.showStatus_Img" :showStatus_more="item.showStatus_more"></cardTitle>
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
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
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.card-title {
    width: 60%;
}
</style>