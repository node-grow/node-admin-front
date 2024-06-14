<template>
  <div class="cell" ref="cell">
    <div class="editable-cell">
      <AInput v-model:value="value" :placeholder="props.option.placeholder"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Input as AInput} from 'ant-design-vue'
import {ref, watch} from "vue";

const props = defineProps<{
  column: any,
  value: any,
  option: any,
}>()

const value = ref(props.value)
const emits = defineEmits(['update:value'])

watch(value, () => {
  emits('update:value', value.value)
})

</script>

<style scoped lang="less">

</style>
