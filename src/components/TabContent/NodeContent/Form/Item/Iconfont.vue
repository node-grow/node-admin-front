<template>
  <ASelect
      :disabled="disabled"
      ref="select"
      :allow-clear="true"
      :value="value"
      @change="val=>$emit('update:value', val)"
      :placeholder="option.placeholder"
      :showSearch="option.searchable"
      :get-popup-container="getScrollContainer"
      :mode="option.mode || 'combobox'">
    <AOption v-for="icon in option.options"
             :value="icon.value">
      <IconFont :type="icon.value" />
      {{icon.label}}
    </AOption>
  </ASelect>
</template>

<script lang="ts">
import {Select} from "ant-design-vue";
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import IconFont from "@/components/IconFont";
import {inject} from "vue";

export default {
  name: "Iconfont",
  components: {
    ASelect: Select,
    AOption: Select.Option,

    IconFont,
  },
  mixins: [ItemMixin],
  setup(props:any){
    const getScrollContainer=inject('getScrollContainer')

    return {
      getScrollContainer: getScrollContainer || (()=>document.body)
    }
  }
}
</script>

<style scoped>

</style>