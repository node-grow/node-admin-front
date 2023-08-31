<template>
  <AutoComplete v-if="option.auto_complete"
                :options="autoOptions"
  >
    <Textarea :value="value"
              @input="$emit('update:value', $event.target.value)"
              :placeholder="option.placeholder"
              :disabled="disabled"
              :rows="10"
    ></Textarea>
  </AutoComplete>
  <Textarea v-else
            :value="value"
            @input="$emit('update:value', $event.target.value)"
            :placeholder="option.placeholder"
            :disabled="disabled"
            :rows="10"
  ></Textarea>
</template>

<script setup lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {AutoComplete, Textarea} from "ant-design-vue";
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