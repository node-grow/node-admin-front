<template>
  <div>
    <component v-if="com" :is="componentIs" :nodePreload="nodePreloadRef" :option="option"></component>
  </div>
</template>

<script lang="ts">
import {AdminTabOption} from "@/store"
import InnerPath from "@/components/TabContent/InnerPath.vue"
import NodeContent from "@/components/TabContent/NodeContent/index.vue"
import {computed, nextTick, provide, ref} from "vue";

export default {
  name: 'TabContent',
  components: {
    InnerPath,
    NodeContent,
  },
  props: {
    option: <AdminTabOption><any>Object,
    remove: Function,
    nodePreload: Object,
  },
  setup(props:any) {
    const com = ref(true)
    const nodePreloadRef = ref(props.nodePreload)

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
            return InnerPath
          case 'node_content':
            return NodeContent
        }
      }),
      reload,
      com,
      nodePreloadRef,
    }
  },
}
</script>

<style lang="less">

</style>