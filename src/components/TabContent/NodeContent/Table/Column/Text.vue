<template>
  {{text}}
</template>

<script lang="ts">
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";

export default {
  name: "Text",
  mixins: [
      ColumnMixin
  ],
  setup(props:any){
    return {
      text: props.record[props.column.dataIndex]
    }
  }
}
</script>

<style scoped>

</style>
