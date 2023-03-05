<template>
  <div v-if="disabled" class="ArticleDetail" v-html="value"></div>
  <div v-else class="ArticleDetail" style="border: 1px solid #ccc">
    <div style="z-index: 100;">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="htmlRef"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css'

import ItemMixin from "@/components/TabContent/NodeContent/Form/Item/ItemMixin";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {getCurrentInstance, onBeforeUnmount, ref, shallowRef, watch} from "vue";
import {getConfig} from "@/utils/api/upload";
import $http from "@/utils/http"
import {replaceBody} from "@/components/TabContent/NodeContent/Operation";
import {notification} from "ant-design-vue";

export default {
  name: "WangEditor",
  mixins: [ItemMixin],
  components: {
    Editor,
    Toolbar,
  },
  setup(props:any){
    const editorRef = shallowRef()
    const htmlRef = ref(props.value)

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const ins=getCurrentInstance()

    watch(htmlRef,(val:any)=>{
      if (val==='<p><br></p>'){
        val = undefined
      }
      ins?.emit('update:value',val)
    })

    const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      htmlRef,
      editorRef,
      toolbarConfig: {
        excludeKeys: [
            'uploadVideo'
        ]
      },
      mode: 'default',
      editorConfig: {
        MENU_CONF: {
          'uploadImage': {
            server: '/api/upload',
            fieldName: 'file',
            async customUpload(file: File, insertFn: Function) {
              if (!props?.option?.upload_image_config_url){
                notification.warn({
                  message: '缺少获取上传图片配置url'
                })
                return
              }
              try {
                const file_var = {
                  filename: file.name,
                  size: file.size,
                  type: file.type
                }
                const res = await getConfig(props.option.upload_image_config_url, file_var)

                const formData= new FormData();
                const data = Object.assign({}, replaceBody(res.data.body, file_var), {
                  file: file
                })
                for (const dataKey in data) {
                  formData.append(dataKey,data[dataKey])
                }

                const upRes = await $http({
                  url: res.data.url,
                  method: res.data.method || 'post',
                  data: formData,
                  headers: replaceBody(res.data.headers, file_var),
                })
                insertFn(upRes.data.url,file.name)
              }catch (e:any){
                console.error(e)
                return false
              }
            },
          }
        }
      },
      handleCreated,
    }
  }
}
</script>

<style scoped>

</style>
