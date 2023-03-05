<template>
  <div>
    <component :is="componentIs" :nodePreload="nodePreload" :option="option"></component>
  </div>
</template>

<script lang="ts">
import {AdminTabOption} from "@/store"
import InnerPath from "@/components/TabContent/InnerPath.vue"
import NodeContent from "@/components/TabContent/NodeContent/index.vue"
import {computed, provide} from "vue";

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
  setup(props:any){

    if (props.remove) {
      provide('close', () => {
        props.remove()
      })
    }

    return {
      componentIs: computed(()=>{
        switch (props.option.type){
          case 'inner_path':
            return InnerPath
          case 'node_content':
            return NodeContent
        }
      })
    }
  },
}
</script>

<style lang="less">

</style>