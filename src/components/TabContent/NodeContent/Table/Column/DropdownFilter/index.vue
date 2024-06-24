<template>
  <div class="dropdown-filter-box">
    <component :is="componentIs" v-model:value="value" :option="props.filter.option"></component>
    <div class="footer">
      <div class="button-box">
        <Button class="btn" size="small" @click="onClearFilters">清空</Button>
        <Button class="btn"
                type="primary"
                @click="onConfirm"
                size="small">{{ props.filter?.confirm_text || '确定' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Button} from 'ant-design-vue'
import {ref} from "vue";
import _ from "lodash";
import container from "@/utils/container";

const props = defineProps<{
  filter: any,
}>()

const emit = defineEmits(['confirm', 'clearFilters'])

const value = ref()

const onConfirm = () => {
  emit('confirm', value.value)
}

const onClearFilters = () => {
  value.value = undefined
  emit('clearFilters')
}

const c = _.upperFirst(_.camelCase(props.filter.type));
const componentIs = container.get('TabContent/NodeContent/Table/Column/DropdownFilter/' + c)

</script>

<style scoped lang="less">
.dropdown-filter-box {
  max-width: 200px;
  padding: 5px 10px;

  .footer {
    margin-top: 10px;

    .button-box {
      display: flex;
      justify-content: flex-end;

      .btn + .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>