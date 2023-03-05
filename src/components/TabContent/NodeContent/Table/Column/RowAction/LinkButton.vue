<template>
  <Button
      class="action-link-button"
      type="link"
      @click="operate"
      :danger="option.danger || false"
      :style="option.style">
    {{option.title}}
  </Button>
</template>

<script lang="ts">

import RowActionMixin from "@/components/TabContent/NodeContent/Table/Column/RowAction/RowActionMixin";
import {Button} from "ant-design-vue";

export default {
  name: "LinkButton",
  components: {
    Button
  },
  mixins: [RowActionMixin],
  setup(props:any){
    return {
    }
  }
}
</script>

<style scoped lang="less">
.action-link-button {
  padding: 4px 0;
}
</style>