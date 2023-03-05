<template>
  <div v-viewer class="img-container">
    <img  v-for="(item,index) in images" :key="index" :src="item.url" />
  </div>
</template>

<script lang="ts">
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import {ref} from "vue";
import {Modal} from "ant-design-vue";
import {isString} from "lodash-es";

export default {
  name: "Image",
  components: {
    Modal,
  },
  mixins: [
    ColumnMixin
  ],
  setup(props:any){
    const preview_visible= ref(false)

    let images = props.record[props.column.dataIndex]
    if (isString(images)){
      images=[{'url':images}]
    }

    return {
      images,
      handleCancel(){
        preview_visible.value = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img-container{
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img{
    max-width: 100%;
    height: 50px;
    &+img{
      margin-left: 10px;
    }
  }
}
</style>