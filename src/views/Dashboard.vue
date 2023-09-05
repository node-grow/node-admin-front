<template>
  <div style="padding: 20px;">
    <Descriptions
        v-if="infos"
        :column="2"
        bordered>
      <template #title>
        <div class="center">
          <TypographyTitle :level="4">平台概况</TypographyTitle>
        </div>
      </template>
      <DescriptionsItem
          v-for="info in infos"
          :label="info.label">
        {{ info.value }}
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
import {Descriptions, TypographyTitle} from "ant-design-vue";
import {ref} from "vue";
import {getSystemInfo} from "@/utils/api/common";

const DescriptionsItem = Descriptions.Item

const infos = ref(null)

getSystemInfo().then(res => {
  infos.value = res.data.infos
})
</script>

<style scoped lang="less">
.center {
  text-align: center;
}
</style>