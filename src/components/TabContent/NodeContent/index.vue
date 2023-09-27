<template>
  <div v-if="childOption" style="padding: 20px">
    <Spin :spinning="loading">
      <component :is="componentIs" :option="childOption.option"></component>
    </Spin>
  </div>
</template>

<script setup lang="ts">

import Operation from "@/components/TabContent/NodeContent/Operation";
import {computed, defineAsyncComponent, inject, provide, ref} from "vue"
import {Spin} from "ant-design-vue";
import {importDynamicComponent} from "@/utils/helpers";
import _ from "lodash";

const props = defineProps<{
  option: any,
}>()

const childOption = <any>ref(null)
const loading = ref(false)
const close = <Function | null>inject('close')
if (!props.option?.node_data) {
  loading.value = true
  Operation.request({
    ...props.option,
    onSuccess() {
    },
  }).then((res: any) => {
    childOption.value = res.data
  }).catch((e: any) => {
    if (close) {
      close()
    }
  }).finally(() => {
    loading.value = false
  })
} else {
  childOption.value = props.option.node_data
}
provide('reloadData', () => {
  if (!props.option.url) {
    return
  }
  Operation.request({
    ...props.option,
    onSuccess() {
    },
  }).then((res: any) => {
    childOption.value = res.data
  })
})

const componentIs = computed(() => {
  const componentName = _.upperFirst(_.camelCase(childOption.value?.type))
  return defineAsyncComponent(() => importDynamicComponent(`@/components/TabContent/NodeContent/${componentName}/index.vue`))
})

</script>

<style lang="less" scoped>

</style>
