<template>
  <FormItem :name="formItemName" class="column-form-item">
    <component :is="componentIs" :column="column" v-model:value="record[column.dataIndex]"
               :option="column.resColumn.column_option"></component>
  </FormItem>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {computed, defineAsyncComponent, inject, ref, watch} from "vue";
import {importDynamicComponent} from "@/utils/helpers";
import {FormItem} from "ant-design-vue";

const props = defineProps<{
  column: any,
  record: any,
  index: number,
}>();

const record = ref(props.record)

const getFormItemName = inject<Function>('getFormItemName')

const formItemName = computed(() => {
  if (!getFormItemName) {
    return
  }
  return getFormItemName() + '[' + props.index + '].' + props.column.resColumn.name
})

const emits = defineEmits(['update:record'])

watch(record, () => {
  emits('update:record', record.value)
}, {deep: true})

const c = _.upperFirst(_.camelCase(props.column.resColumn.type));
const componentIs = defineAsyncComponent(() =>
    importDynamicComponent('@/components/TabContent/NodeContent/Form/Item/Table/Column/' + c + '.vue')
)
</script>

<style scoped lang="less">
.column-form-item {
  margin-bottom: 0;
}
</style>