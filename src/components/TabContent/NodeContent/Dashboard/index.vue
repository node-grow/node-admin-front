<template>
  <div style="padding: 20px;">
    <Descriptions
        v-if="option.infos"
        :column="option.column || 2"
        bordered>
      <template #title>
        <div class="center">
          <TypographyTitle :level="4">{{ option.title }}</TypographyTitle>
        </div>
      </template>
      <DescriptionsItem
          v-for="info in option.infos"
          :label="info.label">
        {{ info.value }}
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
import {Descriptions, DescriptionsItem, TypographyTitle} from "ant-design-vue";

const {option} = defineProps<{
  option: {
    infos: any[],
    title: string,
    column?: number,
  }
}>()

</script>

<style scoped lang="less">
.center {
  text-align: center;
}
</style>