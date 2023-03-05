<template>
  <div style="padding: 10px;">
    <Descriptions
        v-if="infos"
        :column="2"
        title="平台概况"
        bordered>
      <DescriptionsItem
          v-for="info in infos"
          :label="info.label">
        {{info.value}}
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
import {Descriptions} from "ant-design-vue";
import {ref} from "vue";
import {getSystemInfo} from "@/utils/api/common";
const DescriptionsItem= Descriptions.Item

const infos = ref(null)

getSystemInfo().then(res=>{
  infos.value=res.data.infos
})
</script>

<style scoped>

</style>