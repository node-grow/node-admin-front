import {notification, UploadChangeParam} from "ant-design-vue";
import {getConfig} from "@/utils/api/upload";
import $http from "@/utils/http";
import {UploadFile} from "ant-design-vue/lib/upload/interface";
import {Vue} from "vue-class-component";
import {replaceBody} from "@/components/TabContent/NodeContent/Operation";
import lodash, {isArray} from 'lodash'
import {isObject} from "lodash-es";

declare interface This {
    max_count: Number,
    file_list: UploadFile[],
    value: UploadFile[],
    option: {
        config_url: string,
    },
    upload_option: {
        headers: Object,
        body: Object,
        method: String,
    },
    handleFileList: Function,
}

export default {
    data(){
        return {
            file_list: [],
            upload_option: {},
        }
    },
    watch: {
        file_list(this: Vue,val:any){
            this.$emit('update:value',val.map((file:any)=>{
                const item={
                    id: file.id || file?.response?.data?.id,
                    url: file.url || file?.response?.data?.url,
                    name: '',
                }
                item.name=file.name || lodash.last(item?.url?.split('/'))
                return item
            }).filter((file:any)=>{
                return file.id || file?.response?.data?.id
            }))
        }
    },
    mounted(this:This){
        this.file_list = this.handleFileList(this.value)
    },
    methods: {
        handleFileList(value: any){
            if (!value){
                return []
            }

            if (isObject(value) && !isArray(value)){
                value = [value]
            }

            if (isArray(value)){
                return value?.map(file=>{
                    file.status="done"
                    return file
                })
            }
        },

        async beforeUpload(this: This ,file:File){
            if (this.max_count>1 && this.file_list.length>=this.max_count){
                notification.warn({
                    message: "超过最大上传数量 "+this.max_count+ "，请删除不需要的文件后重试"
                })
                return false
            }
            return file
        },
        async uploadAction(this:This,file:File){
            const file_var={
                filename: file.name,
                size: file.size,
                type: file.type
            }
            const res = await getConfig(this.option.config_url,file_var)
            this.upload_option.headers=replaceBody(res.data.headers,file_var)
            this.upload_option.body=replaceBody(res.data.body, file_var)
            return res.data.url.indexOf('://')!==-1 ? res.data.url : $http.defaults.baseURL+res.data.url
        },
        onChange(this:This,e:UploadChangeParam){
            if (e.file.status==="error"){
                notification.warn({
                    message: e.file.response.message
                })
                setTimeout(()=>{
                    this.file_list=this.file_list.filter((file:UploadFile)=>{
                        return file.status !== "error"
                    })
                },1500)
            }
        }
    }
}