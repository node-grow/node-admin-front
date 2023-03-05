<template>
  <div class="clearfix">
    <Upload
        :accept="option.accept"
        v-model:file-list="file_list"
        :action="uploadAction"
        :max-count="max_count"
        :before-upload="beforeUpload"
        :headers="upload_option.headers"
        @change="onChange"
        :method="upload_option.method || 'post'"
        :data="upload_option.body || {}"
        :disabled="disabled"
    >
      <div style="cursor:pointer;">
        <UploadOutlined/>选择文件
      </div>
    </Upload>
  </div>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {UploadOutlined} from '@ant-design/icons-vue';
import {Modal, Upload} from "ant-design-vue";
import UploadMixin from "@/components/TabContent/NodeContent/Form/Item/UploadMixin";

export default {
  name: "FileUpload",
  components: {
    Upload,
    Modal,
    UploadOutlined
  },
  mixins: [ItemMixin,UploadMixin],
  methods:{
  },
  setup(props:any){
    const max_count=props.option.max_count || 1

    return {
      max_count,
    };
  },
}
</script>

<style scoped>

</style>
