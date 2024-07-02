<template>
  <div v-if="childOption" style="padding: 20px">
    <Spin :spinning="loading">
      <component :is="componentIs" :option="childOption.option"></component>
    </Spin>
  </div>
</template>

<script setup lang="ts">

import Operation from "@/components/TabContent/NodeContent/Operation";
import {computed, inject, onMounted, provide, ref} from "vue"
import {Spin} from "ant-design-vue";
import _ from "lodash";
import container from "@/utils/container";

const props = defineProps<{
  option: any,
}>()

const childOption = <any>ref(null)
const loading = ref(true)
const close = <Function | null>inject('close')

const loadData = () => {
  loading.value = true
  if (!props.option?.node_data) {
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
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

provide('ncSetOption', (option: any) => {
  childOption.value = option
})

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
  return container.get(`TabContent/NodeContent/${componentName}`)
})

</script>

<style lang="less" scoped>

</style>
