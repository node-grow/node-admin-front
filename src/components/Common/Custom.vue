<template>
  <div :id="uuid"></div>
</template>

<script lang="ts">
import CustomMixin from "@/components/Common/CustomMixin";
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