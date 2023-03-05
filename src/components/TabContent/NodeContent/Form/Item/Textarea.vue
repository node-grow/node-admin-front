<template>
  <ATextarea :value="value"
           @input="$emit('update:value', $event.target.value)"
              :placeholder="option.placeholder"
             :disabled="disabled"
             :rows="10"
  ></ATextarea>
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Input} from "ant-design-vue";

export default {
  name: "Textarea",
  components: {
    ATextarea: Input.TextArea
  },
  mixins: [ItemMixin]
}
</script>

<style scoped>

</style>