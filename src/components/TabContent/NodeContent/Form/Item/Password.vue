<template>
  <InputPassword :value="value"
           @input="$emit('update:value', $event.target.value)"
                 :disabled="disabled"
                 :plzceholder="option.placeholder"
  ></InputPassword>
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Input} from "ant-design-vue";

export default {
  name: "Password",
  components: {
    InputPassword:Input.Password
  },
  mixins: [ItemMixin]
}
</script>

<style scoped>

</style>