<template>
  <div class="bg-red">aa</div>
  <Button>test</Button>
</template>

<script setup lang="ts">
import {getCurrentInstance} from "vue";
import {Button} from "ant-design-vue";

console.log(getCurrentInstance())
</script>

<style scoped>
.bg-red{
  background: red;
}
</style>