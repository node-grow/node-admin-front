<template>
  <AntInput :value="value"
           @input="$emit('update:value', $event.target.value)"
           :placeholder="option.placeholder"
  ></AntInput>
</template>

<script lang="ts">
import FilterMixin from "@/components/TabContent/NodeContent/Table/Filter/FilterMixin";
import {Input as AntInput} from "ant-design-vue";

export default {
  name: "Input",
  components: {
    AntInput
  },
  mixins: [FilterMixin],
}
</script>

<style scoped>


</style>