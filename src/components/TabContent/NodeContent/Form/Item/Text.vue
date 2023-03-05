<template>
  <div v-if="option.text" v-text="option.text"></div>
  <div v-else-if="option.html" v-html="option.html"></div>
  <div v-else v-text="value"></div>
</template>

<script>
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";

export default {
  name: "Text",
  mixins: [ItemMixin],
}
</script>

<style scoped>

</style>