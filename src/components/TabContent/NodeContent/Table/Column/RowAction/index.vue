<template>
  <Badge :count="option.badge_key?record[option.badge_key]:0">
    <Spin :spinning="loading">
      <component
          :is="componentIs"
          v-if="handleCondition(option.condition)"
          :option="option.action_option"
          :operate="operate"
          :record="record"></component>
    </Spin>
  </Badge>
</template>

<script lang="ts">
import _ from "lodash";
import {defineAsyncComponent, getCurrentInstance, inject, ref} from "vue";
import Operation from "@/components/TabContent/NodeContent/Operation";
import {ConditionOption, handleCondition} from "@/components/TabContent/NodeContent/Condition";
import {Badge, Spin} from "ant-design-vue";
import {cloneDeep} from "lodash-es";
import {importAsyncModule} from "@/utils/helpers";

export default {
  name: "RowAction",
  components: {
    Badge,
    Spin,
  },
  props: {
    option: Object,
    record: Object,
  },
  setup(props:any){
    const c =_.upperFirst(_.camelCase(props.option.type));
    const component=defineAsyncComponent(()=>
        importAsyncModule('@/components/TabContent/NodeContent/Table/Column/RowAction/' + c + '.vue')
    )
    const appContext = getCurrentInstance()?.appContext

    const reloadData=<Function>inject('reloadData')

    const loading =ref(false)

    return {
      loading,
      componentIs: component,
      handleCondition(option?:ConditionOption){
        return handleCondition(props.record,option)
      },
      async operate(){
        if (!props?.option?.operation) {
          return
        }
        loading.value=true
        const fn = Operation[props.option.operation.type]
        try {
          await fn({
            ...cloneDeep(props.option.operation.operation_option),
            appContext,
            replace: {
              ...cloneDeep(props.record),
            },
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
        }catch (e) {

        }
        loading.value=false
      }
    }
  }
}
</script>

<style scoped>

</style>
