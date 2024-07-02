<template>
  <Input v-model:value="value" :placeholder="props.option?.placeholder || '请输入关键字'" allow-clear>
    <template #prefix>
      <SearchOutlined/>
    </template>
  </Input>
</template>

<script setup lang="ts">
import {SearchOutlined} from "@ant-design/icons-vue";
import {Input} from "ant-design-vue";
import {ref, watch} from "vue";

const props = defineProps({
  value: String,
  option: Object
})

const emits = defineEmits(['update:value'])

const value = ref(props.value)
watch(() => props.value, () => {
  value.value = props.value
})

watch(value, () => {
  emits('update:value', value.value)
})

</script>

<style scoped>

</style>