<template>
  <Button
      :title="option.title"
      :type="option.btn_type || 'primary'"
      :style="option.style"
      @click="action">
    {{option.title || "提交"}}
  </Button>
</template>

<script lang="ts">
import FormActionMixin from "@/components/TabContent/NodeContent/Form/Action/FormActionMixin";
import {inject, toRaw} from "vue";
import {Button} from "ant-design-vue";

export default {
  name: "Submit",
  components: {
    Button
  },
  mixins: [FormActionMixin],
  setup(props:any){
    const setLoading=<Function>inject('setLoading')

    const submit = <Function|null>inject('submit')

    return {
      async action(){
        if (!submit){
          return
        }
        setLoading(true)
        try {
          await submit({
            ...toRaw(props.operation)
          })
        }catch (e){

        }
        setLoading(false)
      }
  }
  }
}
</script>

<style scoped>

</style>
