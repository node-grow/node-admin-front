<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <!--  <a-button @click="addCount">点击{{count}}</a-button>-->
  <!--  <a-button @click="testNoAuth">测试未登录授权</a-button>-->
  <!--  <span>-->
  <!--    <icon-font type="icon-font-jilu20190917"></icon-font>-->
  <!--  </span>-->
  <!--  <a-button @click="testAddTab">增加tab</a-button>-->
  <!--  <a-button @click="testOpenModal">打开模态框</a-button>-->
  <ConfigProvider :locale="zhCN">
    <Spin :spinning="loading" :delay="500">
      <router-view/>
    </Spin>
  </ConfigProvider>
</template>

<script setup lang="ts">
import {computed, onMounted,} from "vue"
import {getSystemConfig} from "@/utils/api/common"
import {ConfigProvider, Spin} from "ant-design-vue"

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import useStore from "@/store";
import initStorePersistence from "@/store/store.persistence";

const store = useStore()
initStorePersistence(store)

dayjs.locale('zh-cn');

let count = computed(() => store.count)
onMounted(async () => {
  try {
    const res = await getSystemConfig()

    store.setSystemConfig(res.data)
    if (!store.admin_tabs.length) {
      store.setAdminTabs(res.data.default_tabs)
    }
  } catch (e) {

  }
})

if (store.document_title) {
  document.title = store.document_title
}

const loading = computed(() => store.global_loading)
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.tab-content-modal {
  .ant-modal-confirm-btns {
    display: none;
  }
}
</style>
