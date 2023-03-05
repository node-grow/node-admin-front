<template>
  <RangePicker :value="value"
                 :picker="option.picker || 'date'"
                 :valueFormat="option.value_format"
                 @change="v=>$emit('update:value', v)"
                 :placeholder="option.placeholder"
                 :show-time="option.show_time || false"
                 />
</template>

<script>
import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import {DatePicker} from "ant-design-vue";

export default {
  name: "Text",
  components: {
    RangePicker:DatePicker.RangePicker
  },
  mixins: [FilterMixin]
}
</script>

<style scoped>

</style>