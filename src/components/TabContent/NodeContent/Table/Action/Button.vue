<template>
    <AButton :type="option.btn_type || 'primary' "
             :style="option.style"
             :disabled="for_selected && !selected_rows.length"
             @click="operate">
      {{option.title}}
    </AButton>
</template>

<script lang="ts">
import ActionMixin from "@/components/TabContent/NodeContent/Table/Action/ActionMixin";
import {Badge, Button} from "ant-design-vue";

export default {
  name: "Button",
  components: {
    AButton:Button,
  },
  mixins: [
      ActionMixin
  ],
  setup(props:any){
    return {
      for_selected: props.option.for_selected
    }
  }
}
</script>

<style scoped>

</style>