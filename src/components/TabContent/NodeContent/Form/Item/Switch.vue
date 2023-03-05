<template>
  <ASwitch
      ref="radio"
      :disabled="disabled"
      :checked="value"
      @change="val=>$emit('update:value', val)"
  ></ASwitch>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Switch} from "ant-design-vue";

export default {
  name: "Switch",
  components: {
    ASwitch:Switch,
  },
  mixins: [ItemMixin],
  setup(props:any){
    return {
    }
  }
}
</script>

<style scoped>

</style>