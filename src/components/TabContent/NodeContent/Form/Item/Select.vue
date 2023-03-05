<template>
  <ASelect
      ref="select"
      :value="value"
      :allow-clear="true"
      :options="options"
      :get-popup-container="getScrollContainer"
      @change="val=>$emit('update:value', val)"
      :placeholder="option.placeholder"
      :disabled="disabled"
      :filter-option="filterOption"
      :mode="option.mode || 'combobox'"
      :showSearch="option.search_url?true:option.searchable"
      @search="search"
      :not-found-content="fetching ? undefined : null"
  >
    <template v-if="fetching" #notFoundContent>
      <Spin size="small" />
    </template>
  </ASelect>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Select,Spin} from "ant-design-vue";
import {inject, ref} from "vue";
import http from "@/utils/http";
import {addQuery} from "@/utils/helpers";
import {debounce} from "lodash-es";

export default {
  name: "Select",
  components: {
    ASelect: Select,
    Spin,
  },
  mixins: [ItemMixin],
  setup(props:any){
    const options=ref(props.option.options)
    const getScrollContainer=inject('getScrollContainer')

    const fetching=ref(false)
    let lastSearch=''
    const search= debounce(async (val:any)=>{

      if (!props.option.search_url){
        return
      }
      fetching.value=true
      lastSearch=val
      const searchVal=val
      const res= await http.get(addQuery(props.option.search_url,{keyword:val}))
      if (searchVal!==lastSearch){
        return
      }

      options.value=res.data
      fetching.value=false

    },300)

    const filterOption=(inputValue:string, option:any)=>{
      if (option.label.toString().indexOf(inputValue)!==-1){
        return true
      }
      return false
    }

    return {
      fetching,
      options,
      getScrollContainer: getScrollContainer || (()=>document.body),
      search,
      filterOption,
    }
  }
}
</script>

<style scoped>

</style>
