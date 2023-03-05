<template>
  <component
      :is="componentIs"
      :option="option.item_option"
      :disabled="option.disabled"
      :value="value"
      @update:value="v=>$emit('update:value',v)"></component>
</template>

<script lang="ts">
import _ from "lodash";
import {defineAsyncComponent} from "vue";

export default {
  name: "Item",
  props: {
    option: Object,
    value: [Object,String,Number,Array,Boolean],
    formData: Object,
  },
  setup(props:any){

    const c =_.upperFirst(_.camelCase(props.option.type));
    const component=defineAsyncComponent(()=>
        import('@/components/TabContent/NodeContent/Form/Item/'+c+'.vue')
    )
    return {
      componentIs: component,

    }
  }
}
</script>

<style scoped>

</style>