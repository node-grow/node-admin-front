<template>
  <ConfigProvider :locale="zhCN">
    <App>
      <Spin :spinning="loading" :delay="500">
        <router-view/>
      </Spin>
    </App>
  </ConfigProvider>
</template>

<script setup lang="ts">
import {computed, onMounted, watch,} from "vue"
import {App, ConfigProvider, Spin} from "ant-design-vue"

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import useStore from "@/store";
import initStorePersistence from "@/store/store.persistence";

const store = useStore()
initStorePersistence(store)

dayjs.locale('zh-cn');

onMounted(async () => {
  await store.initConfig()
})

if (store.document_title) {
  document.title = store.document_title
}

watch(() => store.document_title, () => {
  document.title = store.document_title
})

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
