<template>
  <div :id="uuid"><Spin/></div>
</template>

<script lang="ts">
import CustomMixin from "@/components/TabContent/CustomMixin";
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import lodash from "lodash";
import {Spin} from "ant-design-vue";

export default {
  name: "Custom",
  components: {
    Spin
  },
  mixins: [ItemMixin],
  setup(props:any){
    const uuid = lodash.uniqueId('custom-com-');
    return CustomMixin.setup({...props,uuid})
  }
}
</script>

<style scoped>

</style>
