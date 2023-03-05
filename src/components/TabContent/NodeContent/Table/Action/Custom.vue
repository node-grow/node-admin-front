<template>
  <div :id="uuid"></div>

</template>

<script lang="ts">
import CustomMixin from "@/components/TabContent/CustomMixin";
import ActionMixin from "@/components/TabContent/NodeContent/Table/Action/ActionMixin";
import lodash from "lodash";

export default {
  name: "Custom",
  mixins: [ActionMixin],
  setup(props:any){
    const uuid = lodash.uniqueId('custom-com-');
    return CustomMixin.setup({...props,uuid})
  }
}
</script>

<style scoped>

</style>