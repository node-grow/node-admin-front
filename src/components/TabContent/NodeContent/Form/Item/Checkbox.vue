<template>
  <CheckboxGroup
      ref="checkbox"
      :value="value"
      :options="option.options"
      @change="val=>$emit('update:value', val)"
      :disabled="disabled"
  ></CheckboxGroup>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Checkbox} from "ant-design-vue";

export default {
  name: "Checkbox",
  components: {
    CheckboxGroup:Checkbox.Group
  },
  mixins: [ItemMixin],
  setup(props:any){
    return{
    }
  }
}
</script>

<style scoped>

</style>