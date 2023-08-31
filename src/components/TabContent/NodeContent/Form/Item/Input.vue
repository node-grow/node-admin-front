<template>
  <AutoComplete v-if="option.auto_complete"
                :options="autoOptions"
  >
    <Input :value="value"
           @input="$emit('update:value', $event.target.value)"
           :disabled="disabled"
           :placeholder="option.placeholder"
    ></Input>
  </AutoComplete>
  <Input v-else :value="value"
         @input="$emit('update:value', $event.target.value)"
         :disabled="disabled"
         :placeholder="option.placeholder"
  ></Input>
</template>

<script setup lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {AutoComplete, Input} from "ant-design-vue";
import {useAutoComplete} from "@/components/TabContent/NodeContent/Form/Item/AutoComplete";

defineOptions({
  mixins: [ItemMixin]
})

const props = withDefaults(defineProps<{
      value?: any,
      option?: any,
      disabled?: boolean
    }>(),
    {
      value: null,
      option: {},
      disabled: false,
    }
)

const {autoOptions} = useAutoComplete(props)

</script>

<style scoped>

</style>