<template>
  <component
      :option="option" :operate="operate" :record="record"></component>
</template>

<script lang="ts">
import CustomMixin from "@/components/TabContent/CustomMixin";
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import RowActionMixin from "@/components/TabContent/NodeContent/Table/Column/RowAction/RowActionMixin";

export default {
  name: "Custom",
  mixins: [RowActionMixin],
  setup(props:any){
    return CustomMixin.setup(props)
  }
}
</script>

<style scoped>

</style>