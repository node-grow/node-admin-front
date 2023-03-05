<template>
  <span style="margin-right: 10px;" v-if="handleCondition(option.condition)">
      <Spin :spinning="loading">
        <component :is="componentIs"
                     :option="option.action_option"
                     :operate="operate"
                     :operation="option.operation"
                     >
        </component>
      </Spin>
  </span>
</template>

<script lang="ts">
import _ from "lodash";
import {defineAsyncComponent, getCurrentInstance, inject, provide, ref, toRaw} from "vue";
import {FormInstance} from "ant-design-vue/lib/form";
import Operation, {RequestOption} from "@/components/TabContent/NodeContent/Operation";
import {ConditionOption, handleCondition} from "@/components/TabContent/NodeContent/Condition";
import {Spin} from "ant-design-vue";

export default {
  name: "Action",
  components: {
    Spin
  },
  props: {
    option: Object,
    formData: Object,
  },
  setup(props: any) {
    const loading=ref(false)
    provide('setLoading',(val:boolean)=>{
      loading.value=val
    })

    const getForm = <Function | null>inject('getForm')

    const c = _.upperFirst(_.camelCase(props.option.type));
    const component = defineAsyncComponent(() =>
        import('@/components/TabContent/NodeContent/Form/Action/' + c + '.vue')
    )
    const form: FormInstance = getForm ? getForm() : {}

    const appContext = getCurrentInstance()?.appContext
    const reloadData = <Function|null>inject('reloadData');
    return {
      loading,
      componentIs: component,
      handleCondition(option?:ConditionOption){
        return handleCondition(props.formData,option)
      },
      async operate() {
        const operation = props.option.operation
        const fn = <Function>Operation[operation.type]

        loading.value=true
        try {
          await fn(<RequestOption | any>{
            appContext,
            ...operation.operation_option,
            body: {
              ...form.model,
              ...operation.operation_option.body
            },
            onSuccess(){
              if (!reloadData){
                return
              }
              reloadData()
            },
            onClose(){
              if (!reloadData){
                return
              }
              reloadData()
            }
          })
        }catch (e) {
          console.error(e)
        }
        loading.value=false
      }
    }
  }
}
</script>

<style scoped>

</style>
