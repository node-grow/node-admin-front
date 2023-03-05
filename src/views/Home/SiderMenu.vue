<template>
  <SubMenu v-if="children?.length" :key="ikey">
    <template #title>
      <span>
        <IconFont :type="icon" v-if="icon" />
        {{title}}
      </span>
    </template>
    <SiderMenu
        v-for="(menu,index) in children"
        :ikey="ikey+'-'+index"
        :icon="menu.icon"
        :title="menu.title"
        :children="menu.children"
        :url="menu.url"
        :operation="menu.operation"
    />
  </SubMenu>
  <Item v-else :key="ikey" @click="operate">
    <span>
      <IconFont :type="icon" v-if="icon" />
      {{title}}
    </span>
  </Item>

</template>

<script setup lang="ts">
import IconFont from "@/components/IconFont"
import Operation from "@/components/TabContent/NodeContent/Operation"
import {Menu} from "ant-design-vue"
import {getCurrentInstance} from "vue"
const {Item,SubMenu} = Menu

import SiderMenu from "@/views/Home/SiderMenu.vue"

const props=defineProps({
  ikey: [String,Number],
  title: String,
  operation: Object,
  type: String,
  children: Array,
  icon: String,
})

const context= getCurrentInstance()?.appContext

function operate(){
  if (!props?.operation) {
    return
  }
  const fn = Operation[props.operation.type]
  fn(props.operation.option,context)
}

</script>

<style scoped>

</style>