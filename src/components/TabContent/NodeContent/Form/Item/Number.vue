<template>
  <InputNumber :value="value"
           @input="$emit('update:value', $event.target.value)"
           :plzceholder="option.placeholder"
               :disabled="disabled"
               :max="option.max"
                  :min="option.min"
  ></InputNumber>
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {InputNumber} from "ant-design-vue";

export default {
  name: "Number",
  components: {
    InputNumber
  },
  mixins: [ItemMixin]
}
</script>

<style scoped>

</style>