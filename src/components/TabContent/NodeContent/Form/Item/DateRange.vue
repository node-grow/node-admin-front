<template>
  <RangePicker :value="value"
                 :picker="option.picker || 'date'"
                 :valueFormat="option.value_format"
                 @change="v=>$emit('update:value', v)"
                 :placeholder="option.placeholder"
                 :show-time="option.show_time || false"
               :disabled="disabled"
  />
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {DatePicker} from "ant-design-vue";

export default {
  name: "Text",
  components: {
    RangePicker: DatePicker.RangePicker
  },
  mixins: [ItemMixin]
}
</script>

<style scoped>

</style>