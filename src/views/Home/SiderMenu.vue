<template>
  <SubMenu v-if="children?.length" :key="ikey">
    <template #title>
      <Badge :dot="collapseDot" :offset="[10,0]">
        <IconFont :type="icon" v-if="icon"/>
        {{ title }}
      </Badge>
    </template>
    <SiderMenu
        v-for="(menu,index) in children"
        :ikey="ikey+'-'+index"
        :icon="menu.icon"
        :title="menu.title"
        :children="menu.children"
        :badge="menu.badge"
        :url="menu.url"
        :operation="menu.operation"
    />
  </SubMenu>
  <Item v-else :key="ikey" @click="operate">
    <Badge :count="badge" :offset="[20,0]">
      <IconFont :type="icon" v-if="icon"/>
      {{ title }}
    </Badge>
  </Item>

</template>

<script setup lang="ts">
import IconFont from "@/components/IconFont"
import Operation from "@/components/TabContent/NodeContent/Operation"
import {Badge, Menu} from "ant-design-vue"
import {computed, getCurrentInstance} from "vue"
import SiderMenu from "@/views/Home/SiderMenu.vue"

const {Item, SubMenu} = Menu

const props = defineProps({
  ikey: [String, Number],
  title: String,
  operation: Object,
  type: String,
  children: Array,
  icon: String,
  badge: [String, Number],
})

const instance = getCurrentInstance()

const collapseDot = computed(() => {
  if (!props.children?.length) {
    return false
  }
  return deepDotFind(props.children)
})

const deepDotFind = (menus) => {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].badge) {
      return true
    }
    if (menus[i].children?.length && deepDotFind(menus[i].children)) {
      return true
    }
  }
  return false
}

function operate() {
  if (!props?.operation) {
    return
  }
  const fn = Operation[props.operation.type]
  fn({
    ...props.operation.option,
    instance,
  })
}

</script>

<style scoped>

</style>