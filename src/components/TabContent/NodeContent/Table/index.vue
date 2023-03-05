<template>
  <div style="display:flex;flex-direction: column;">
    <div class="top-container"
         style="display:flex;flex-direction: column; justify-content: space-between;margin-bottom: 10px;">
      <Row tyep="flex" justify="space-between">
        <Col flex="0 1 20%" :wrap="true">
          <div class="actions" v-if="option?.actions?.length" style="display:flex;flex-wrap: wrap;margin-bottom: 10px;">
            <Action v-for="a_option in option.actions" :option="a_option"></Action>
          </div>
        </Col>
        <Col flex="1 1">
          <Row justify="end">
            <Col>
              <Form
                v-if="option?.filters?.length"
                layout="inline"
                autocomplete="off"
                style="width: 100%;"
                :labelWrap="true"
            >
              <Row type="flex">
                <Col flex="1">
                  <Row wrap justify="end">
                    <Tooltip v-for="(f_option,key) in option.filters">
                      <template #title>{{ f_option.title }}</template>
                      <FormItem
                          :key="key"
                          style="margin-bottom: 10px;">
                        <Filter :option="f_option" v-model:value="filter_query[f_option.name]"></Filter>
                      </FormItem>
                    </Tooltip>
                  </Row>
                </Col>
                <FormItem :wrapper-col="{ flex: 'auto' }">
                  <Button type="primary" @click="filter">
                    <SearchOutlined></SearchOutlined>
                  </Button>
                </FormItem>
                <Col>
                </Col>
              </Row>

            </Form>
            </Col>
          </Row>

        </Col>
      </Row>
    </div>
    <div class="table-container" ref="tableContainer">
      <Table size="middle"
             bordered
             :loading="loading"
             :pagination="pagination"
             :row-selection="row_selection"
             :data-source="data_list"
             v-model:expanded-row-keys="expanded_keys"
             :scroll="{y: scrollY}"
             class="list-table"
             :columns="columns">
        <template #bodyCell="{ column, text, record }">
          <Column :column="column" :record="record"></Column>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import ContentMixin from "@/components/TabContent/NodeContent/ContentMixin";
import type {Ref} from 'vue';
import {getCurrentInstance, inject, nextTick, onMounted, provide, ref, toRaw, watch} from 'vue';
import {CheckOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons-vue';
import Action from '@/components/TabContent/NodeContent/Table/Action/index.vue'
import {ColumnType} from "@/components/TabContent/NodeContent/Table/index";
import {getDataList} from "@/utils/api/node";
import {TableRowSelection} from "ant-design-vue/es/table/interface";
import {Button, Col, Form, PaginationProps, Row, Table, Tooltip} from "ant-design-vue";
import {addQuery, guid} from "@/utils/helpers";
import Column from "@/components/TabContent/NodeContent/Table/Column/index.vue"
import Filter from "@/components/TabContent/NodeContent/Table/Filter/index.vue";
import $http from "@/utils/http"


export default {
  name: "ContentTable",
  components: {
    Table,
    Form,
    FormItem: Form.Item,
    Button,
    Row,
    Col,
    Tooltip,

    Filter,
    CheckOutlined,
    EditOutlined,
    SearchOutlined,
    Action,
    Column,
  },
  props: {
    option: Object
  },
  mixins: [
    ContentMixin,
  ],
  setup: function (props: any) {
    const expanded_keys = ref()
    let tableContainer = <Ref<Element>>ref()

    const scrollY = <Ref<number | null>>ref(null)

    const scroll = (e: any) => {
      console.log(e)
    }

    const filter_query = <Ref<object>>ref(props.option.filters_data || {})

    const selected_rows = <Ref<any[]>>ref([])

    const row_selection = <Ref>ref(null)
    provide('getSelectedRows', () => selected_rows.value)
    provide('getDataKey', () => props.option.data_key)

    const columns = <ColumnType[]>props.option?.columns.map((column: ColumnType) => {
      if (column.type === 'selection') {
        row_selection.value = <TableRowSelection>{
          checkStrictly: true,
          columnTitle: column.title,
          fixed: "left",
          onChange(selectedRowKeys, selectedRows) {
            selected_rows.value = [...selectedRows]
          },
        }
        return null
      }
      return {
        dataIndex: column.name,
        title: column.title,
        fixed: column.fixed,
        resColumn: column,
      }
    }).filter((item: any) => item)
    const data_list = ref()
    const pagination = <Ref<PaginationProps>>ref(false)
    const filters = ref([])
    const loading = ref(false)
    const page = <Ref<Number | null>>ref(null)


    async function loadData(url: string, refresh_page = false) {
      if (refresh_page) {
        page.value = null
      }
      loading.value = true
      $http.loading = false
      try {
        const res = await getDataList(addQuery(url, {
          page: page.value
        }))

        expanded_keys.value = []
        const handleDataList = (data_list: any[]) => {
          data_list = data_list.map(item => {
            item.key = guid()
            if (item?.children?.length) {
              expanded_keys.value.push(item.key)
              item.children = handleDataList(item.children)
            }
            return item
          })
          return data_list
        }
        data_list.value = handleDataList(toRaw(res.data.data_list))
        if (res.data.pagination) {
          pagination.value = <PaginationProps>{
            pageSize: res.data.pagination.page_size,
            current: res.data.pagination.current,
            total: res.data.pagination.total,
            showSizeChanger: false,
            onChange(current: number) {
              pagination.value.current = current
              page.value = current
              loadData(url)
            },
          }
        }
      } catch (e) {
        console.error(e)
      }
      loading.value = false

      nextTick(() => {
        if (!tableContainer.value) {
          return
        }
        if (tableContainer.value.clientHeight >= 548) {
          scrollY.value = 548
        } else {
          scrollY.value = null
        }
      })
    }

    loadData(addQuery(props.option.data_url, filter_query.value))

    const getModal = <any>inject('getModal')

    const getScrollContainer = <Function>inject('getScrollContainer')
    provide('reloadData', async () => {
      const con = <HTMLElement>getScrollContainer()
      const st = con.scrollTop
      await loadData(addQuery(props.option.data_url, filter_query.value))
      con.style.marginTop = '-' + st + 'px'
      setTimeout(() => {
        con.style.marginTop = ''
        con.scrollTop = st
      })
    })

    const filter = ()=>{
      loadData(addQuery(props.option.data_url, filter_query.value), true)
    }

    provide('filter', filter)

    return {
      columns,
      data_list,
      pagination,
      filters,
      row_selection,
      loading,
      tableContainer,
      filter_query,
      expanded_keys,
      scrollY,
      scroll,
      filter,
      closeModal() {
        if (getModal) {
          getModal().destroy()
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
.table-container{
  box-shadow: 0 0 1px #ccc;
}
</style>
