<template>
  <div v-if="option" style="padding: 20px">
    <Spin :spinning="loading">
      <component :is="componentIs" :option="option.option"></component>
    </Spin>
  </div>
</template>

<script lang="ts">

import Operation from "@/components/TabContent/NodeContent/Operation";
import {computed, defineAsyncComponent, inject, provide, ref} from "vue"
import {Spin} from "ant-design-vue";
import {importDynamicComponent} from "@/utils/helpers";

export default {
  name: "NodeContent",
  components: {
    Spin,
  },
  props: {
    option: Object,
    nodePreload: Object,
  },
  setup(props:any){
    const childOption = <any>ref(null)
    const loading= ref(false)
    const close=<Function|null>inject('close')
    try{
      childOption.value=props.nodePreload
      if (!childOption.value) {
        loading.value=true
        Operation.request({
          ...props.option,
          onSuccess(){},
        }).then((res:any) => {
          childOption.value = res.data
        }).catch((e:any) => {
          if (close) {
            close()
          }
        }).finally(() => {
          loading.value = false
        })
      }else{

      }
    }catch (e){

    }
    provide('reloadData',()=>{
      Operation.request({
        ...props.option,
        onSuccess(){},
      }).then((res:any)=>{
        childOption.value=res.data
      })
    })

    return {
      loading,
      option: childOption,
      componentIs: computed(()=>{
        switch (childOption.value?.type){
          case 'table':
            return defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/NodeContent/Table/index.vue'))
          case 'form':
            return defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/NodeContent/Form/index.vue'))
          case 'tab':
            return defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/NodeContent/Tab/index.vue'))
          case 'custom':
            return defineAsyncComponent(() => importDynamicComponent('@/components/TabContent/NodeContent/Custom.vue'))
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>

</style>
