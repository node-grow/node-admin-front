<template>
  <div style="margin-right: 5px;">
    <component :is="componentIs"
               :option="option.filter_option"
               :value="value"
               :title="option.title"
               @update:value="onChange">
    </component>
  </div>
</template>

<script lang="ts">
import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import _ from "lodash";
import {ComponentInternalInstance, inject} from "vue";
import container from "@/utils/container";

export default {
  name: "Filter",
  mixins: [FilterMixin],
  props: ['value', 'filter_on_change'],
  emits: ['update:value'],
  inject: ['filter'],
  setup(props: any, ins: ComponentInternalInstance) {
    const c = _.upperFirst(_.camelCase(props.option.type));
    const component = container.get('TabContent/NodeContent/Table/Filter/' + c)

    const filter = <Function>inject('filter')
    return {
      componentIs: component,
      onChange(v: any) {
        ins.emit('update:value', v)
        if (props.option.filter_on_change && filter) {
          filter()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>