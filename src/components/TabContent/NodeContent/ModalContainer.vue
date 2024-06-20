<template>
  <div style="max-height: 80vh;overflow:auto;position: relative;" ref="scroll_container">
    <component :is="TabContent" :option="option"></component>
  </div>
</template>

<script lang="ts">
import {defineAsyncComponent, provide, ref} from "vue";
import {importDynamicComponent} from "@/utils/helpers";

export default {
  name: "ModalContainer",
  props: {
    option: Object,
    getModal: Function,
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

    console.log(props.option)

    return {
      TabContent: defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/index.vue')),
      scroll_container,
    }
  }
}
</script>

<style scoped>

</style>