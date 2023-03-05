<template>
  <div style="max-height: 80vh;overflow:auto;position: relative;" ref="scroll_container">
    <component :is="TabContent" :nodePreload="nodePreload" :option="option"></component>
  </div>
</template>

<script lang="ts">
import {defineAsyncComponent, provide, ref} from "vue";

export default {
  name: "ModalContainer",
  props: {
    option: Object,
    getModal: Function,
    nodePreload: Object,
  },
  setup(props:any){
    const scroll_container = ref(null)

    provide('getModal',()=>{
      return props.getModal()
    })

    provide('getScrollContainer',()=>{
      return scroll_container.value
    })

    provide('close',()=>{
      props?.getModal()?.destroy()
    })

    return {
      TabContent: defineAsyncComponent(()=>import('@/components/TabContent/index.vue')),
      scroll_container,
    }
  }
}
</script>

<style scoped>

</style>