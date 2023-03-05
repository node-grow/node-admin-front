<template>
  <DatePicker :value="value"
                 :picker="option.picker || 'date'"
                 :valueFormat="option.value_format"
                 @change="v=>$emit('update:value', v)"
                 :placeholder="option.placeholder || title"
                 :show-time="option.show_time || false"
                 />
</template>

<script>
import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import {DatePicker} from "ant-design-vue";

export default {
  name: "Text",
  components: {
    DatePicker
  },
  mixins: [FilterMixin]
}
</script>

<style scoped>

</style>