<template>
  <component :is="componentIs" :column="column" :record="record" :option="column.resColumn.column_option"></component>
</template>

<script lang="ts">
import _ from 'lodash'
import {defineAsyncComponent} from "vue";

export default {
  name: "Column",
  props: {
    column: Object,
    record: Object,
  },
  setup(props:any){
    const c =_.upperFirst(_.camelCase(props.column.resColumn.type));
    const component=defineAsyncComponent(()=>
      import('@/components/TabContent/NodeContent/Table/Column/'+c+'.vue')
    )
    return {
      componentIs: component
    }
  },
}
</script>

<style scoped>

</style>