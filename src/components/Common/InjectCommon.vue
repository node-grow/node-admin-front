<script setup lang="ts">
import {App} from "ant-design-vue";
import container from "@/container";

const {notification, modal, message} = App.useApp()

container.registerCommonObject('notification', notification)
container.registerCommonObject('modal', modal)
container.registerCommonObject('message', message)

</script>

<template>

</template>

<style scoped>

</style>