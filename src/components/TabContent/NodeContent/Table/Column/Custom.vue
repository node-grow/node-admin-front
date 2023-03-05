<template>
  <div :id="uuid"></div>

</template>

<script lang="ts">
import CustomMixin from "@/components/TabContent/CustomMixin";
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import lodash from "lodash";

export default {
  name: "Custom",
  mixins: [ColumnMixin],
  setup(props:any){
    const uuid = lodash.uniqueId('custom-com-');
    return CustomMixin.setup({...props,uuid})
  }
}
</script>

<style scoped>

</style>