<template>
  <RowAction class="row-action-item" v-for="action in option?.actions" :option="action" :record="record"></RowAction>
</template>

<script lang="ts">
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import RowAction from "@/components/TabContent/NodeContent/Table/Column/RowAction/index.vue"

export default {
  name: "Actions",
  components: {
    RowAction
  },
  mixins: [ColumnMixin],
  setup(props:any){
    return {

    }
  }
}
</script>

<style scoped lang="less">
.row-action-item + .row-action-item {
  margin-left: 15px;
}
</style>