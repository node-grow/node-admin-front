<template>
  <div class="clearfix">
    <Upload
        :accept="option.accept || 'image/*'"
        v-model:file-list="file_list"
        :action="uploadAction"
        list-type="picture-card"
        :max-count="max_count"
        @preview="handlePreview"
        :before-upload="beforeUpload"
        :headers="upload_option.headers"
        @change="onChange"
        :method="upload_option.method || 'post'"
        :data="upload_option.body || {}"
        :disabled="disabled"
    >
      <div>
        <plus-outlined/>
        <div style="margin-top: 8px">选择图片</div>
      </div>
    </Upload>
  </div>
</template>

<script lang="ts">
import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {PlusOutlined} from '@ant-design/icons-vue';
import {getBase64} from "@/utils/helpers";
import {Modal, Upload} from "ant-design-vue";
import {UploadFile} from "ant-design-vue/lib/upload/interface";
import UploadMixin from "@/components/TabContent/NodeContent/Form/Item/UploadMixin";
import {getCurrentInstance} from "vue";

export default {
  name: "ImageUpload",
  components: {
    Upload,
    Modal,
    PlusOutlined,
  },
  mixins: [ItemMixin, UploadMixin],
  methods: {},
  setup(props: any) {
    const max_count = props.option.max_count || 1

    const ins = getCurrentInstance()
    return {
      max_count,
      async handlePreview(this: { $viewerApi: Function, items: any[] }, file: UploadFile) {
        if (!file.url && !file.preview && file.originFileObj) {
          this.items[this.items.indexOf(file)].preview = (await getBase64(file.originFileObj)) as string
        }
        const images = this.items.map((f: any) => {
          return <string | object>(f.url || f.preview)
        })
        ins?.proxy?.$viewerApi({
          images: images,
          options: {
            initialViewIndex: this.items.indexOf(file)
          }
        })
      }
    };
  },
}
</script>

<style scoped>

</style>