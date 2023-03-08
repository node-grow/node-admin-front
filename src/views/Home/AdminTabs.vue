<template>
  <ATabs v-model:activeKey="tab_index"
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
             :tab="tab.title"
             :closable="tab.closable && admin_tabs.length>1"
             style="height: 100%;background: #fff;overflow:hidden;">
      <div style="height: 100%;overflow-y:auto;position:relative;" ref="scroll_container" :id="'tab_'+tab.key">
        <component :is="TabContent" :ref="'tab_contents_'+tab.key" :option="tab"
                   :remove="()=>remove(tab.key)"></component>
      </div>
    </TabPane>
  </ATabs>
</template>

<script lang="ts">
import {computed, defineAsyncComponent, getCurrentInstance, provide, ref, Ref, watch} from "vue"
import store from "@/store"
import ATabs, {TabPane} from "ant-design-vue/es/tabs"
import {Button} from "ant-design-vue";
import {ReloadOutlined} from "@ant-design/icons-vue"

export default {
  name: "AdminTabs",
  components: {
    ATabs,
    TabPane,
    ReloadOutlined,
    Button,
  },
  setup: function () {
    const tab_key = <Ref<string>>ref(store.state.admin_tab_index)
    const scroll_container = <Ref<any>>ref(null)

    const admin_tabs = computed(() => store.state.admin_tabs)

    const getTabIndex = () => {
      for (let i = 0; i < scroll_container.value.length; i++) {
        const con=<HTMLElement>scroll_container.value[i]
        if (con.id === 'tab_'+tab_key.value) {
          return i
        }
      }
      return 99999
    }
    const sc = computed(()=>{
      return scroll_container.value[getTabIndex()] || document.body
    })
    watch(tab_key, val => {
      store.commit('setAdminTabIndex', val)
    })

    watch(() => store.state.admin_tab_index, val => {
      tab_key.value = val
    })

    provide('getScrollContainer', () => {
      return sc.value
    })

    function remove(targetKey: String) {
      let admin_tabs = store.state.admin_tabs
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
      store.commit('setAdminTabs', admin_tabs)
    }

    function onEditTab(targetKey: string | MouseEvent, action: string) {
      if (action === 'remove') {
        remove(targetKey as string);
      }
    }

    const TabContent = defineAsyncComponent(() => import('@/components/TabContent/index.vue'))

    const ins = getCurrentInstance()

    return {
      tab_index: tab_key,
      admin_tabs,
      scroll_container,
      TabContent,
      remove,
      onEditTab,
      reload() {
        const arr = <any[]>ins?.refs['tab_contents_' + tab_key.value]
        const tab = arr[0]
        if (tab?.reload instanceof Function) {
          tab.reload()
        }
      }
    }
  }
}
</script>

<style lang="less">
.admin-tabs {
  .ant-tabs-nav{
    margin-bottom: 0!important;
  }
  .ant-tabs-content {
    height: 100%;
  }
}
</style>
