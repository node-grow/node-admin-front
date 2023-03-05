<template>
  <div :id="uuid"></div>
</template>

<script lang="ts">
import CustomMixin from "@/components/TabContent/CustomMixin";
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import lodash from "lodash";

export default {
  name: "Custom",
  props: {
    option: Object
  },
  setup(props:any){
    const uuid = lodash.uniqueId('custom-com-');
    return CustomMixin.setup({...props,uuid})
  }
}
</script>

<style scoped>

</style>