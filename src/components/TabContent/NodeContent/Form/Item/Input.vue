<template>
  <AInput :value="value"
           @input="$emit('update:value', $event.target.value)"
         :disabled="disabled"
         :placeholder="option.placeholder"
  ></AInput>
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Input} from "ant-design-vue";

export default {
  name: "Input",
  components:{
    AInput:Input,
  },
  mixins: [ItemMixin]
}
</script>

<style scoped>

</style>