<template>
  <component :is="RouteComponent"></component>
</template>

<script lang="ts">
import {AdminTabOption} from "@/store"
import router from "@/router"
import {AsyncComponentLoader, defineAsyncComponent} from "vue";

export default {
  name: "InnerPath",
  props: {
    option: <AdminTabOption><any>Object
  },
  setup(props:any){
    let RouteComponent
    router.getRoutes().map(route=>{
      if (route.path===props.option.url){
        RouteComponent=route.components.default
      }
    })
    return {
      RouteComponent:defineAsyncComponent(<AsyncComponentLoader><unknown>RouteComponent)
    }
  },
}
</script>

<style scoped>

</style>