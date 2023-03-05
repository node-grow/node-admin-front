<template>
  <Cascader :disabled="disabled"
            :value="value"
            :options="options"
            :load-data="loadData"
            :get-popup-container="getScrollContainer"
            :open="open"
            @change="val=>{$emit('update:value',val);open=false;}"
            @click="open=true"
            @blur="open=false"
            :placeholder="option.placeholder" />
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Cascader, CascaderProps} from "ant-design-vue";
import {inject, ref, SetupContext, toRaw} from "vue";
import http from "@/utils/http";
import {replaceUrl} from "@/components/TabContent/NodeContent/Operation";
import {DefaultOptionType} from "ant-design-vue/es/vc-cascader";

export default {
  name: "Division",
  components: {
    Cascader
  },
  mixins: [ItemMixin],
  setup(props:any,context:SetupContext){
    const options = ref([])
    const open = ref(false)

    function handleRes(res:any){
      return res.data.children.map((item:any)=>{
        return {
          label: item.name,
          value: item.id,
          isLeaf: item.level > props.option.level,
        }
      })
    }

    http.get(replaceUrl(props.option.url,{'id':''})).then((res:any)=>{
      options.value=handleRes(res)

      if (!props.value?.length){
        return
      }
      async function getNextOptions(options:DefaultOptionType[],index=0){
        const value=props.value[index] || null
        if (!value){
          return []
        }
        let res=await http.get(replaceUrl(props.option.url,{'id':value}))
        return options.map(option=>{
          if (option.value===value){
            option.children=handleRes(res)
            getNextOptions(<DefaultOptionType[]>option.children,index+1).then(ops=>{
              option.children=ops
            })
          }
          return option
        })

      }

      getNextOptions(options.value).then(ops=>{
        options.value=<any>ops
      })
    })


    const loadData: CascaderProps['loadData'] = async selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      if (targetOption.children){
        return
      }

      const res=await http.get(replaceUrl(props.option.url,{'id':targetOption.value}))
      targetOption.loading = false;

      if (res.data.children.length){
        targetOption.children = handleRes(res)
      }else{
        targetOption.isLeaf=true
        context.emit('update:value',[...selectedOptions.map(option=>{
          return option.value
        })])
        open.value=false
      }

      options.value = [...options.value];
    };
    const getScrollContainer=inject('getScrollContainer')

    return {
      getScrollContainer: getScrollContainer || (()=>document.body),
      open,
      loadData,
      options,
    }
  }
}
</script>

<style scoped>

</style>