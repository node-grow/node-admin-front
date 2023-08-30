<template>
  <div style="text-align: left;">
    <Tabs v-model:activeKey="activeKey">
      <TabPane v-for="tab in tabs"
               :key="tab.name"
               :tab="tab.title">
        <NodeContent :option="{url: tab.url,method: tab.method}"></NodeContent>
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {TabPane, Tabs} from "ant-design-vue";
import NodeContent from "@/components/TabContent/NodeContent/index.vue"
import {TabOptions} from "@/components/TabContent/NodeContent/Tab/index";


const props = defineProps<{
  option: TabOptions,
}>()

const activeKey = ref(props.option.default_tab || props.option.tabs[0].name)

const tabs = props.option.tabs.map(tab => {
  tab.method = tab.method || 'get'
  return tab
})

</script>

<style scoped>

</style>