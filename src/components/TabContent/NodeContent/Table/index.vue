<template>
  <div class="container-box">
    <div class="top-container">
      <Row tyep="flex" justify="space-between">
        <Col flex="0 1 20%" :wrap="true">
          <div class="actions" v-if="option?.actions?.length">
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
              >
                <Row type="flex">
                  <Col flex="1">
                    <Row wrap justify="end">
                      <Tooltip v-for="(f_option,key) in option.filters" :title="f_option.title">
                        <FormItem
                            :key="key"
                            style="margin-bottom: 10px;">
                          <Filter :option="f_option" v-model:value="filter_query[f_option.name]"></Filter>
                        </FormItem>
                      </Tooltip>
                    </Row>
                  </Col>
                  <FormItem :wrapper-col="{ flex: 'auto' }">
                    <Button type="primary" @click="onFilter">
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
             class="list-table"
             :columns="columns"
             @change="onChange">
        <template #bodyCell="{ column, text, record }">
          <Column :column="column" :record="record"></Column>
        </template>
        <template #customFilterDropdown="{setSelectedKeys, selectedKeys, confirm, clearFilters, column}">
          <DropdownFilter :filter="column.resColumn.filter"
                          @confirm="v=>handleColumnFilterConfirm(v, column, confirm)"
                          @clearFilters="handleColumnClearFilters(column, clearFilters)"></DropdownFilter>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {inject, provide, Ref, ref, toRaw, watch} from 'vue';
import {SearchOutlined} from '@ant-design/icons-vue';
import Action from '@/components/TabContent/NodeContent/Table/Action/index.vue'
import {ColumnType} from "@/components/TabContent/NodeContent/Table/index";
import {getDataList} from "@/utils/api/node";
import {TableRowSelection} from "ant-design-vue/es/table/interface";
import {Button, Col, Form, FormItem, PaginationProps, Row, Table, TableColumnType, Tooltip} from "ant-design-vue";
import {addQuery, guid} from "@/utils/helpers";
import Column from "@/components/TabContent/NodeContent/Table/Column/index.vue"
import Filter from "@/components/TabContent/NodeContent/Table/Filter/index.vue";
import $http from "@/utils/http"
import DropdownFilter from "@/components/TabContent/NodeContent/Table/Column/DropdownFilter/index.vue";

const props = defineProps<{
  option: any
}>()

const expanded_keys = ref()
let tableContainer = <Ref<Element>>ref()

const filter_query = <Ref<{ [key: string]: any }>>ref(props.option.filters_data || {})

const selected_rows = <Ref<any[]>>ref([])

const row_selection = <Ref>ref(null)
provide('getSelectedRows', () => selected_rows.value)
provide('getDataKey', () => props.option.data_key)

const columns = ref()
const data_list = ref()
const pagination = ref<PaginationProps>({})
const loading = ref(false)
const page = <Ref<Number | null>>ref(null)
const columnFilterQuery = ref<{ [key: string]: any }>({})

columns.value = props.option?.columns.map((column: ColumnType) => {
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
    sorter: column.sortable,
    filterMode: 'menu',
    customFilterDropdown: !!column.filter,
    filteredValue: null,
  } as TableColumnType | any
}).filter((item: any) => item)

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
        showTotal: (total, range) => {
          return `当前显示 ${range[0]} - ${range[1]} 条数据 / 共 ${total} 条数据`
        },
      }
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

loadData(addQuery(props.option.data_url, filter_query.value))

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


let lastQuery: any = null
const getQuery = () => {
  const query = {
    ...filter_query.value,
    ...columnFilterQuery.value,
  }

  const orderMap: { [key: string]: string } = {ascend: 'asc', descend: 'desc'}
  columns.value.forEach((col: TableColumnType) => {
    if (col.sortOrder) {
      query.sort_field = col.dataIndex
      query.sort_order = orderMap[col.sortOrder]
    }
  })
  if (!lastQuery) {
    lastQuery = query
  }
  if (JSON.stringify(lastQuery) !== JSON.stringify(query)) {
    lastQuery = query
    page.value = 1
  }

  return query
}

const onFilter = () => {
  loadData(addQuery(props.option.data_url, getQuery()), true)
}

const onChange = (c_pagination: any, filters: any, sorter: any) => {
  if (page.value != c_pagination.current) {
    page.value = c_pagination.current
    const con = <HTMLElement>getScrollContainer()
    con?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  columns.value = columns.value.map((col: TableColumnType) => {
    if (col.dataIndex === sorter.field) {
      col.sortOrder = sorter.order
    } else {
      col.sortOrder = null
    }

    return col
  })

  loadData(addQuery(props.option.data_url, getQuery()))
}

watch(columnFilterQuery, () => {
  columns.value = columns.value.map((col: TableColumnType) => {
    col.filteredValue = columnFilterQuery.value[<string>col.dataIndex]
    col.filtered = !!col.filteredValue
    return col
  })

  loadData(addQuery(props.option.data_url, getQuery()))
}, {deep: true})

const handleColumnFilterConfirm = (value: any, column: TableColumnType, confirm: any) => {
  confirm()
  columnFilterQuery.value[<string>column.dataIndex] = value
}

const handleColumnClearFilters = (column: TableColumnType, clearFilters: any) => {
  clearFilters()
  columnFilterQuery.value[<string>column.dataIndex] = undefined
}

provide('filter', onFilter)

</script>

<style lang="less" scoped>

.container-box {
  display: flex;
  flex-direction: column;

  .top-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;

    .actions {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }

  .table-container {
    box-shadow: 0 0 1px #ccc;
  }
}
</style>
