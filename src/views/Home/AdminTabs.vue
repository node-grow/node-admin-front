<template>
  <Tabs v-model:activeKey="tab_key"
        type="editable-card"
        @edit="onEditTab"
        :hideAdd="true"
        class="admin-tabs"
        style="height: 100%;">
    <template #rightExtra>
      <Button type="primary" @click="reload">
        刷新
      </Button>
    </template>
    <TabPane v-for="tab in admin_tabs"
             :key="tab.key"
             :closable="tab.closable && admin_tabs.length>1"
             style="height: 100%;background: #fff;overflow:hidden;">
      <template #tab>
        <Dropdown trigger="contextmenu">
          <span>
            {{ tab.title }}
          </span>
          <template #overlay>
            <Menu>
              <MenuItem>
                <a @click.prevent="closeOtherTabs(tab)">关闭其它标签</a>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
      <div style="height: 100%;overflow-y:auto;position:relative;" ref="scroll_container" :id="'tab_'+tab.key">
        <component :is="TabContent" :ref="'tab_contents_'+tab.key" :option="tab"
                   :remove="()=>remove(tab.key)"></component>
      </div>
    </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent, getCurrentInstance, provide, ref, watch} from "vue"
import useStore from "@/store"
import {Button, Dropdown, Menu, MenuItem, TabPane, Tabs} from "ant-design-vue";
import {importDynamicComponent} from "@/utils/helpers";

const store = useStore()
const tab_key = ref<string>(store.admin_tab_index)
const scroll_container = ref<any>(null)

const admin_tabs = computed(() => store.admin_tabs)

const getTabIndex = () => {
  for (let i = 0; i < scroll_container.value.length; i++) {
    const con = <HTMLElement>scroll_container.value[i]
    if (con.id === 'tab_' + tab_key.value) {
      return i
    }
  }
  return 99999
}
const sc = computed(() => {
  return scroll_container.value[getTabIndex()] || document.body
})
watch(tab_key, val => {
  store.setAdminTabIndex(val)
})

watch(() => store.admin_tab_index, val => {
  tab_key.value = val
})

provide('getScrollContainer', () => {
  return sc.value
})

function remove(targetKey: String) {
  let admin_tabs = store.admin_tabs
  if (tab_key.value + '' === targetKey + '') {
    for (let i in admin_tabs) {
      if (admin_tabs[i].key === targetKey && admin_tabs[parseInt(i) + 1]) {
        tab_key.value = <string>admin_tabs[parseInt(i) + 1].key
      } else if (admin_tabs[i].key === targetKey) {
        tab_key.value = <string>admin_tabs[parseInt(i) - 1].key
      }
    }
  }
  admin_tabs = admin_tabs.filter(tab => tab.key !== targetKey + '')
  store.setAdminTabs(admin_tabs)
}

function onEditTab(targetKey: string | MouseEvent, action: string) {
  if (action === 'remove') {
    remove(targetKey as string);
  }
}

const TabContent = defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/index.vue'))

const ins = getCurrentInstance()

const reload = () => {
  const arr = <any[]>ins?.refs['tab_contents_' + tab_key.value]
  const tab = arr[0]
  if (tab?.reload instanceof Function) {
    tab.reload()
  }
}

const closeOtherTabs = (tab: any) => {
  store.admin_tabs.filter(t => {
    return t.key !== tab.key
  }).forEach(t => {
    if (!t.closable) {
      return
    }
    remove(t.key as string)
  })
}

</script>

<style lang="less">
.admin-tabs {
  .ant-tabs-nav {
    margin-bottom: 0 !important;
  }

  .ant-tabs-content {
    height: 100%;
  }
}
</style>
