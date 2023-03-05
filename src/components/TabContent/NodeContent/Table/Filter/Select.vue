<template>
  <ASelect
      style="width: 180px"
      ref="select"
      :get-popup-container="getScrollContainer"
      :value="value"
      :allow-clear="true"
      :options="options"
      @change="val=>$emit('update:value', val)"
      :placeholder="option.placeholder || title"
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

import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import {Select,Spin} from "ant-design-vue";
import {inject, ref} from "vue";
import {debounce} from "lodash-es";
import http from "@/utils/http";
import {addQuery} from "@/utils/helpers";

export default {
  name: "Select",
  components: {
    ASelect: Select,
    Spin,
  },
  mixins: [FilterMixin],
  setup(props:any){
    const getScrollContainer=<Function|null>inject('getScrollContainer')
    const options=ref(props.option.options)

    const fetching=ref(false)
    const search= debounce(async (val:any)=>{

      if (!props.option.search_url){
        return
      }

      fetching.value=true
      const res= await http.get(addQuery(props.option.search_url,{keyword:val}))
      fetching.value=false
      options.value=res.data

    },300)

    return {
      search,
      fetching,
      options,
      getScrollContainer: getScrollContainer || (()=>document.body)
    }
  }
}
</script>

<style scoped>

</style>
