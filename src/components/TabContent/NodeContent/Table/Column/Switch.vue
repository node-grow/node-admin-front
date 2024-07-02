<template>
  <Spin :spinning="loading">
    <ASwitch
        v-model:checked="value"
        @change="operate"
        :checked-value="values[1]"
        :unchecked-value="values[0]"
    ></ASwitch>
  </Spin>
</template>

<script lang="ts">
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import {Spin, Switch as ASwitch} from 'ant-design-vue'
import {getCurrentInstance, inject, ref} from "vue";
import Operation from "@/components/TabContent/NodeContent/Operation";
import {cloneDeep} from "lodash-es";

export default {
  name: "Switch",
  components: {
    ASwitch,
    Spin,
  },
  mixins: [
    ColumnMixin
  ],
  inject: ['ncSetOption'],
  setup(props: any) {
    const value = ref(props.record[props.column.dataIndex])
    const instance = getCurrentInstance()
    const reloadData = <Function>inject('reloadData')
    const loading = ref(false)
    let values: Boolean[] = props.option.values
    if (!values) {
      values = [false, true]
      value.value = !!value.value
    }

    return {
      value,
      values,
      loading,
      async operate(val: any) {
        if (!props?.option?.operation) {
          return
        }
        const fn = await Operation[props.option.operation.type]

        const replace = {...props.record}
        replace[props.column.dataIndex] = val
        loading.value = true
        try {
          await fn({
            ...cloneDeep(props.option.operation.operation_option),
            instance,
            replace,
            onClose() {
              if (reloadData) {
                reloadData()
              }
            },
            onSuccess() {
              if (reloadData) {
                reloadData()
              }
            }
          })
        }catch (e){
          if (reloadData) {
            reloadData()
          }
        }
        loading.value = false

      }

    }
  }
}
</script>

<style scoped>

</style>
