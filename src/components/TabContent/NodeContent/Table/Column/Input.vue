<template>
  <div class="cell" ref="cell">
    <Spin :spinning="loading">
      <div class="editable-cell">
        <div v-if="editing" class="editable-cell-input-wrapper editing-cell">
          <div class="fl">
            <AInput v-model:value="text" @pressEnter="operate" @keydown="press" />
          </div>
          <div class="editable-cell-icon-container">
            <CheckOutlined class="editable-cell-icon-check" @click="operate"/>
            <CloseOutlined class="editable-cell-icon-close" @click="noEdit"/>
          </div>
        </div>
        <div v-else class="editable-cell-text-wrapper">
          <div class="fl">
            {{ record[column.dataIndex]}}
          </div>
          <div class="editable-cell-icon-container">
            <edit-outlined class="editable-cell-icon" @click="edit"/>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>

<script lang="ts">
import {getCurrentInstance, inject, onMounted, ref} from 'vue'
import ColumnMixin from "@/components/TabContent/NodeContent/Table/Column/ColumnMixin";
import {CheckOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons-vue'
import {Input as AInput, notification, Spin} from 'ant-design-vue'
import Operation from "@/components/TabContent/NodeContent/Operation";
import scrollIntoView from 'scroll-into-view-if-needed';
import {cloneDeep} from "lodash-es";

export default {
  name: "Input",
  mixins: [ColumnMixin],
  components: {
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    AInput,
    Spin,
  },
  inject: ['ncSetOption'],
  setup(props: any) {
    const editing = ref(false)
    const instance = getCurrentInstance()
    const reloadData = <Function>inject('reloadData')
    const text = ref(props.record[props.column.dataIndex])

    const loading= ref(false)
    const ins= getCurrentInstance()
    let cell:any
    onMounted(()=>{
      cell=ins?.proxy?.$refs?.cell
    })

    function noEdit() {
      cell.style.width=null
      cell.style.marginRight=null
      editing.value=false
    }

    return {
      press(e:KeyboardEvent){
        if (e.key==='Escape'){
          noEdit()
        }
      },
      editing,
      text,
      loading,
      noEdit,
      edit(){
        const editing_cell=document.querySelector('.editing-cell')
        if (editing_cell){
          notification.info({
            message: '请先提交或取消未保存的数据',
          })
          scrollIntoView(editing_cell, {
            behavior: 'smooth',
            block: 'center',
          })
          return
        }
        const ow=cell.offsetWidth
        cell.style.width=ow+'px'
        editing.value=true
        cell.style.marginRight=(ow-cell.offsetParent.offsetWidth)+'px'
      },
      async operate() {
        if (!props?.option?.operation) {
          return
        }
        const fn = Operation[props.option.operation.type]

        const replace = {...props.record}
        replace[props.column.dataIndex] = text.value
        loading.value=true
        await fn({
          ...cloneDeep(props.option.operation.operation_option),
          instance,
          replace: replace,
          onClose() {
            if (reloadData) {
              reloadData()
            }
            loading.value=false
          },
          onSuccess() {
            if (reloadData) {
              reloadData()
            }
            loading.value=false
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

.editable-cell {
  position: relative;
  .fl{
    float: left;
  }
  .editable-cell-icon-container {
    float: right;
  }
  .editable-cell-input-wrapper{
    padding-right: 50px;
    .editable-cell-icon-container{
      position: absolute;
      right: 0;
      top: 0;
      float: none;
      overflow: hidden;
      &::after{
        content: "";
        clear: both;
      }
    }
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    overflow: hidden;
    &::after{
      content: "";
      clear: both;
    }
  }

  .editable-cell-icon,
  .editable-cell-icon-check,
  .editable-cell-icon-close{
    width: 20px;
    cursor: pointer;
    float: left;
    line-height: 28px;
  }

  .editable-cell-icon-close{
    margin-left: 3px;
  }

  .editable-cell-icon {
    opacity: 0;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover,
  .editable-cell-icon-close:hover{
    color: #108ee9;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: block;
  opacity: 1;
}
</style>
