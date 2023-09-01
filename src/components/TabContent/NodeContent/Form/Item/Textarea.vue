<template>
  <AutoComplete v-if="option.auto_complete"
                :options="computedOptions"
                @search="handleSearch"
                @select="handleSelect"
                :value="value"
                :defaultActiveFirstOption="false"
  >
    <Textarea :value="value"
              @input="$emit('update:value', $event.target.value)"
              :placeholder="option.placeholder"
              :disabled="disabled"
              :rows="10"
    ></Textarea>
  </AutoComplete>
  <Textarea v-else
            :value="value"
            @input="$emit('update:value', $event.target.value)"
            :placeholder="option.placeholder"
            :disabled="disabled"
            :rows="10"
  ></Textarea>
</template>

<script setup lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {AutoComplete, Textarea} from "ant-design-vue";
import {useAutoComplete} from "@/components/TabContent/NodeContent/Form/Item/AutoComplete";
import {computed, ref} from "vue";

defineOptions({
  mixins: [ItemMixin]
})

const emits = defineEmits(['update:value'])

const props = withDefaults(defineProps<{
      value?: any,
      option?: any,
      disabled?: boolean
    }>(),
    {
      value: null,
      option: {},
      disabled: false,
    }
)

const {autoOptions} = useAutoComplete(props)
const s = ref('')
const computedOptions = computed(() => {
  return autoOptions.value.filter(o => {
    if (props.value?.split("\n")?.includes(o.value)) {
      return false
    }
    return o.value.includes(s.value)
  })
})

const handleSearch = (v: string) => {
  s.value = v.split("\n").pop() || ''
}

const handleSelect = (v: any) => {
  let ss = props.value?.split("\n") || []
  ss = ss.slice(0, ss.length - 1)
  ss.push(v)
  emits('update:value', ss.join("\n"))
  // nextTick(()=>{
  // })
}

</script>

<style scoped>

</style>