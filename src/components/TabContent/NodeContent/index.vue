<template>
  <div v-if="option" style="padding: 20px">
    <Spin :spinning="loading">
      <component :is="componentIs" :option="option.option"></component>
    </Spin>
  </div>
</template>

<script lang="ts">

import Operation from "@/components/TabContent/NodeContent/Operation";
import {computed, inject, provide, ref} from "vue"
import ContentForm from "@/components/TabContent/NodeContent/Form/index.vue"
import ContentTable from "@/components/TabContent/NodeContent/Table/index.vue"
import ContentCustom from "@/components/TabContent/NodeContent/Custom.vue"
import {Spin} from "ant-design-vue";

export default {
  name: "NodeContent",
  components: {
    ContentForm,
    ContentTable,
    ContentCustom,
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
            return ContentTable
          case 'form':
            return ContentForm
          case 'custom':
            return ContentCustom
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>

</style>
