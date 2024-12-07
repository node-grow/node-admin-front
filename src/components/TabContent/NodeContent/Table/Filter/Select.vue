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
      @search="onSearch"
      :filter-option="!option.search_url"
      :not-found-content="null"
  >
    <template v-if="fetching" #notFoundContent>
      <Spin size="small"/>
    </template>
  </ASelect>
</template>

<script lang="ts">

import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import {Select, Spin} from "ant-design-vue";
import {inject, ref} from "vue";
import {debounce} from "lodash-es";
import http from "@/utils/http";
import {addQuery} from "@/utils/helpers";
import {uniq} from "lodash";

export default {
  name: "Select",
  components: {
    ASelect: Select,
    Spin,
  },
  mixins: [FilterMixin],
  setup(props: any) {
    const getScrollContainer = <Function | null>inject('getScrollContainer')
    const options = ref(props.option.options)
    let lastSearchId = 0

    const fetching = ref(false)
    const onSearch = debounce(async (val: any) => {

      if (!props.option.search_url) {
        return
      }

      fetching.value = true
      lastSearchId += 1

      const searchId = lastSearchId
      try {
        const res = await http.get(addQuery(props.option.search_url, {keyword: val}))
        if (searchId !== lastSearchId) {
          return
        }
        options.value = res.data
      }finally {
        fetching.value = false
      }

    }, 300)

    return {
      onSearch,
      fetching,
      options,
      getScrollContainer: getScrollContainer || (() => document.body)
    }
  }
}
</script>

<style scoped>

</style>
