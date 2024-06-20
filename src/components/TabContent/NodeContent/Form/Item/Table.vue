<template>
  <div>
    <ATable size="small"
            :columns="columns"
            :dataSource="value"
            :row-key="(record)=>record._rowKey"
            :pagination="false">
      <template #bodyCell="{ column, text, record, index }">
        <div v-if="column.dataIndex === '_action'">
          <Button type="link" danger @click="deleteRecord(index)">
            <CloseOutlined/>
          </Button>
        </div>
        <Column v-else
                :column="column"
                v-model:record="value[index]"
                :index="index"></Column>
      </template>
      <template #footer>
        <Button @click="addRecord" size="small">增加一行</Button>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
import {Button, Table as ATable} from "ant-design-vue";
import {computed, ref, watch} from "vue";
import Column from "@/components/TabContent/NodeContent/Form/Item/Table/Column/index.vue";
import {CloseOutlined} from "@ant-design/icons-vue";
import _ from "lodash";

const props = defineProps<{
  option: any,
  value: any,
  disabled?: boolean,
}>()

const emits = defineEmits(['update:value'])

const value = ref(props.value.map((item: any) => {
  item._rowKey = _.uniqueId('row_')
  return item
}))

watch(value, () => {
  const v = _.cloneDeep(value.value)
  emits('update:value', v.map((item: any) => {
    delete item._rowKey
    return item
  }))
}, {deep: true})

const columns = computed(() => {
  const res = props.option.columns.map((column: any) => {
    return {
      dataIndex: column.name,
      title: column.label,
      fixed: column.fixed,
      resColumn: column,
    }
  })
  res.push({
    title: '操作',
    dataIndex: '_action',
    fixed: 'right',
    resColumn: null,
  })

  return res
})

const deleteRecord = (index: number) => {
  value.value.splice(index, 1)
}

const addRecord = () => {
  value.value.push({
    _rowKey: _.uniqueId('row_')
  })
}

</script>

<style scoped>

</style>