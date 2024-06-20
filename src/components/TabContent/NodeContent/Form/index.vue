<template>
  <div style="margin-top: 20px;text-align: left;">
    <Form
        ref="form"
        :model="formState"
        name="basic"
        autocomplete="off"
        :rules="rules"
        :validate-on-rule-change="true">
      <template v-for="(item,key) in option.items">
        <FormItem
            v-if="handleCondition(item.condition)"
            :key="key"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: item.label?16:20, offset: item.label?0:2 }"
            :label="item.label"
            :name="item.name"
            :extra="item.tips">
          <Item :option="item" :formData="formState" v-model:value="formState[item.name]"></Item>
        </FormItem>
      </template>

      <FormItem :wrapper-col="{offset: 4,span: 16}" style="text-align:left;">
        <div style="display:flex;">
          <Action v-for="action in option.actions" :option="action" :formData="formState"></Action>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import ContentMixin from "@/components/TabContent/NodeContent/ContentMixin";
import {getCurrentInstance, inject, nextTick, provide, Ref, ref, watch} from "vue";
import Item from "@/components/TabContent/NodeContent/Form/Item/index.vue"
import {AxiosError} from "axios";
import Operation, {RequestOption} from "@/components/TabContent/NodeContent/Operation";
import Action from "@/components/TabContent/NodeContent/Form/Action/index.vue"
import {FormInstance} from "ant-design-vue/lib/form";
import {Button, Form, FormItem, notification} from "ant-design-vue";
import scrollIntoView from 'scroll-into-view-if-needed';
import {ConditionOption, handleCondition} from "@/components/TabContent/NodeContent/Condition";
import useStore from "@/store";
import _ from "lodash";

export default {
  name: "ContentForm",
  components: {
    Form,
    FormItem,
    Button,
    Item,
    Action,
  },
  mixins: [
    ContentMixin
  ],
  inject: ['ncSetOption'],
  setup(props: any) {

    const formState = ref<any>(props.option.data || {})

    watch(() => props.option.data, () => {
      formState.value = props.option.data
    })
    const rules = ref<any>({})


    const getModal = <Function>inject('getModal')
    const reloadData = <Function>inject('reloadData')
    const form = <Ref<FormInstance>>ref()

    const instance = getCurrentInstance()

    const submit = async (operation: any) => {
      let form_data;
      try {
        form_data = await form.value.validate()
      } catch (e) {
        notification.warn({
          message: "表单数据有误，请检查表单数据"
        })
        return
      }

      const fn = <Function>Operation[operation.type]
      await fn(<RequestOption | any>{
        instance,
        ...operation.operation_option,
        body: {
          ...form_data,
          ...operation.operation_option.body
        },
        replace: form_data,
        onClose() {
          rules.value = {}

          if (getModal) {
            getModal().destroy()
            return
          }
          if (reloadData) {
            reloadData()
            return
          }
        },
        onSuccess(res: any) {
          rules.value = {}

          if (reloadData) {
            reloadData()
          }
          if (operation.reload_layout) {
            useStore().reloadLayout()
          }
          if (getModal) {
            getModal().destroy()
          }
        },
        onError(e: AxiosError<any>) {
          if (!e.response?.data.errors) {
            return
          }
          const r: any = {}
          const data = JSON.parse(JSON.stringify(formState.value))
          for (const name in e.response?.data.errors) {
            const errors = e.response?.data.errors[name]
            if (!errors?.length) {
              continue
            }

            let ruleName = ''
            name.split('.').forEach((n: string) => {
              if (/^\d+$/.test(n)) {
                ruleName += `[${n}]`
              } else {
                ruleName += `.${n}`
              }
            })
            ruleName = ruleName.replace(/^\./, '')

            r[ruleName] = {
              async validator(rule: any, value: any) {
                await nextTick()
                if (_.get(data, ruleName) === _.get(formState.value, ruleName)) {
                  throw new Error(errors.join())
                } else {
                  return true
                }
              }
            }
          }
          rules.value = r
        }
      })

      if (getScrollContainer) {
        scrollEl = getScrollContainer()
      }

      nextTick(() => {
        setTimeout(() => {
          if (!scrollEl) {
            return
          }
          const node = <Element>scrollEl.querySelector('.ant-form-item-explain-error')
          if (!node) {
            return
          }
          scrollIntoView(node, {
            behavior: 'smooth',
            block: 'center',
            boundary: scrollEl,
          })
        }, 100)
      })

    }

    provide('submit', submit)
    provide('getForm', () => form)

    const getScrollContainer = <Function | null>inject('getScrollContainer')
    let scrollEl: any = null

    return {
      form,
      formState,
      rules,

      handleCondition(option?: ConditionOption) {
        return handleCondition(formState.value, option)
      },
    };
  },

}
</script>

<style scoped>

</style>
