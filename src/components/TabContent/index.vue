<template>
  <div>
    <component v-if="com" :is="componentIs" :option="option"></component>
  </div>
</template>

<script lang="ts">
import {AdminTabOption} from "@/store"
import {computed, nextTick, provide, ref} from "vue";

export default {
  name: 'TabContent',
  props: {
    option: <AdminTabOption><any>Object,
    remove: Function,
  },
  setup(props:any) {
    const com = ref(true)

    if (props.remove) {
      provide('close', () => {
        props.remove()
      })
    }

    const reload = () => {
      com.value = false
      nextTick(() => {
        com.value = true
      })
    }

    return {
      componentIs: computed(() => {
        switch (props.option.type) {
          case 'inner_path':
            return window.$container.get('TabContent/InnerPath')
          case 'node_content':
            return window.$container.get('TabContent/NodeContent')
        }
      }),
      reload,
      com,
    }
  },
}
</script>

<style lang="less">

</style>