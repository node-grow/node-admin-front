<template>
  <Button
      :title="option.title"
      :type="option.btn_type || 'primary'"
      :style="option.style"
      @click="operate">
    {{option.title || "操作"}}
  </Button>
</template>

<script lang="ts">
import FormActionMixin from "@/components/TabContent/NodeContent/Form/Action/FormActionMixin";
import {Button} from "ant-design-vue";

export default {
  name: "Submit",
  components: {
    Button,
  },
  mixins: [FormActionMixin],
  setup(props:any){

  }
}
</script>

<style scoped>

</style>