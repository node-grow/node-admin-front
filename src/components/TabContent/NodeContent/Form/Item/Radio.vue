<template>
  <RadioGroup
      ref="radio"
      :value="value"
      :options="option.options"
      :disabled="disabled"
      :option-type="option.option_type || 'default'"
      @change="$emit('update:value', $event.target.value)"
  ></RadioGroup>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Radio} from "ant-design-vue";

export default {
  name: "Radio",
  components: {
    RadioGroup: Radio.Group
  },
  mixins: [ItemMixin],
  setup(props:any){
    return{

    }
  }
}
</script>

<style scoped>

</style>