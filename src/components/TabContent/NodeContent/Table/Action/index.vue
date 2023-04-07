<template>
  <div style="margin-right: 25px;margin-bottom: 5px;">
    <Spin :spinning="loading">
      <Badge :count="option.badge">
        <component :is="componentIs" :option="option.action_option" :operate="operate"></component>
      </Badge>
    </Spin>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import {defineAsyncComponent, getCurrentInstance, inject, ref} from "vue";
import {TableActionOption} from "@/components/TabContent/NodeContent/Table";
import {OperationType} from "@/components/TabContent/NodeContent/Operation";
import {Badge, Spin} from "ant-design-vue";
import {importAsyncModule} from "@/utils/helpers";

export default {
  name: "Action",
  components: {
    Badge,
    Spin,
  },
  props: {
    option: <TableActionOption><any>Object,
  },
  setup(props: any) {
    const loading = ref(false)

    const c = _.upperFirst(_.camelCase(props.option.type));
    const component = defineAsyncComponent(() =>
        importAsyncModule('@/components/TabContent/NodeContent/Table/Action/' + c + '.vue')
    )
    const operation = <OperationType>inject('operation')
    const reloadData = <Function>inject('reloadData')
    const getModal = <Function>inject('getModal')

    const appContext = getCurrentInstance()?.appContext
    const getSelectedRows = <null | Function>inject('getSelectedRows')
    const getDataKey = <null | Function>inject('getDataKey')
    return {
      componentIs: component,
      loading,
      async operate() {
        if (!props?.option?.operation) {
          return
        }
        loading.value = true
        const fn = operation[props.option.operation.type]

        try {
          await fn({
            ...props.option.operation.operation_option,
            appContext,
            replace: {
              selected_rows: getSelectedRows ? getSelectedRows() : [],
              selected_keys: getSelectedRows ? getSelectedRows().map((row: any) => {
                return row[getDataKey ? getDataKey() : 'id']
              }).join(',') : '',
            },
            onSuccess(res: any) {
              if (getModal) {
                getModal().destroy()
              }
              if (reloadData) {
                reloadData()
              }
            },
            onClose() {
              if (!reloadData) {
                return
              }
              reloadData()
            }
          })
        }catch (e) {
          console.error(e)
        }
        loading.value = false
      }
    }
  }
}
</script>

<style scoped>

</style>