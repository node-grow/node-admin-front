<template>
  <component
      :is="componentIs"
      :option="option.item_option"
      :disabled="option.disabled"
      :value="value"
      @update:value="v=>$emit('update:value',v)"></component>
</template>

<script lang="ts" setup>
import _ from "lodash";
import {defineAsyncComponent, provide} from "vue";
import {importDynamicComponent} from "@/utils/helpers";

const props = defineProps<{
  option: any,
  value: any,
  formData: any,
}>()

const c = _.upperFirst(_.camelCase(props.option.type));
const componentIs = defineAsyncComponent(() =>
    importDynamicComponent('@/components/TabContent/NodeContent/Form/Item/' + c + '.vue')
)

provide('getFormItemName', () => {
  return props.option.name
})
</script>

<style scoped>

</style>