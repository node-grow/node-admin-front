# 智能表格渲染 Table

## 结构

| 字段           | 必须 | 标题         | 类型                         | 默认值 | 说明                |
|--------------|----|------------|----------------------------|-----|-------------------|
| actions      | 是  | 表格顶部操作     | Array<[Action](#Action)[]> | []  |                   |
| filters      | 是  | 表格顶部筛选     | Array<[Filter](#Filter)[]> | []  |                   |
| filters_data | 否  | 表格顶部筛选默认数据 | Object                     | {}  |                   |
| columns      | 是  | 表格列        | Array<[Column](#Column)[]> | []  |                   |
| data_url     | 是  | 表格数据地址     | String                     | 无   | [表格数据接口](#表格数据接口) |
| data_key     | 否  | 表格数据唯一标识字段 | String                     | id  |                   |

### 表格数据接口

| 字段         | 必须 | 标题   | 类型                                | 默认值  | 说明 |
|------------|----|------|-----------------------------------|------|----|
| data_list  | 是  | 数据列表 | Array<Object[]>                   | []   |    |
| pagination | 否  | 数据分页 | Object<[Pagination](#Pagination)> | null |    |

### Pagination

| 字段        | 必须 | 标题    | 类型     | 默认值 | 说明 |
|-----------|----|-------|--------|-----|----|
| current   | 是  | 当前页   | Number | 无   |    |
| page_size | 是  | 分页数   | Number | 无   |    |
| total     | 是  | 数据总条数 | Number | 无   |    |

### Action

| 字段            | 必须 | 标题   | 类型                                    | 默认值 | 说明                              |
|---------------|----|------|---------------------------------------|-----|---------------------------------|
| type          | 是  | 类型   | String                                | 无   | [ActionOption](#ActionOption)类型 |
| badge         | 否  | 徽标数  | Number                                | 无   | 右上角标识数字                         |
| operation     | 否  | 操作   | Object<[Operation](./Operation.md)>   | {}  |                                 |
| action_option | 是  | 类型配置 | Object<[ActionOption](#ActionOption)> | 无   |                                 |

#### ActionOption

##### button

普通按钮

| 字段           | 必须 | 标题     | 类型      | 默认值     | 说明                                                             |
|--------------|----|--------|---------|---------|----------------------------------------------------------------|
| btn_type     | 否  | 按钮展示样式 | String  | primary | 详情查看[Antdv的Button](https://antdv.com/components/button-cn#API) |
| title        | 是  | 按钮展示名称 | String  | 无       |                                                                |
| style        | 否  | 样式     | Object  | null    |                                                                |
| for_selected | 否  | 选中行操作  | Boolean | false   |                                                                |

---

##### custom

自定义组件（接口提供地址）

| 字段  | 必须 | 标题 | 类型     | 默认值 | 说明 |
|-----|----|----|--------|-----|----|
| url | 是  | 地址 | String | 无   |    |

开发指南请查看[Custom开发](./Custom.md)

---

ActionOption结束

---

### Filter

| 字段               | 必须 | 标题      | 类型                                    | 默认值 | 说明                              |
|------------------|----|---------|---------------------------------------|-----|---------------------------------|
| type             | 是  | 类型      | String                                | 无   | [FilterOption](#FilterOption)类型 |
| name             | 是  | 字段名     | String                                | 无   | 搜索时的查询字段名                       |
| title            | 是  | 展示标题    | String                                | 无   |                                 |
| filter_on_change | 是  | 变更时立即搜索 | Boolean                               | 无   |                                 |
| filter_option    | 是  | 类型配置    | Object<[FilterOption](#FilterOption)> | 无   |                                 |

#### FilterOption

##### text

文本输入

暂无配置项

---

##### select

下拉选择

| 字段      |       | 必须 | 标题   | 类型              | 默认值 | 说明       |
|---------|-------|----|------|-----------------|-----|----------|
| options |       | 是  | 选项   | Array<Option[]> | 无   |          |
|         | label | 是  | 展示名称 | String          | 无   | Option字段 |
|         | value | 是  | 选项值  | String          | 无   | Option字段 |

---

##### date

日期时间选择

| 字段           | 必须 | 标题     | 类型                                                          | 默认值   | 说明 |
|--------------|----|--------|-------------------------------------------------------------|-------|----|
| placeholder  | 否  | 占位符    | String                                                      | 无     |    |
| show_time    | 否  | 是否展示时间 | Boolean                                                     | false |    |
| picker       | 否  | 选择器    | String<"date", "week", "month", "quarter", "year">          | date  |    |
| value_format | 否  | 值格式    | String [具体格式](https://day.js.org/docs/zh-CN/display/format) | null  |    |

---

##### date_range

日期时间范围选择

| 字段           | 必须 | 标题     | 类型                                                          | 默认值   | 说明 |
|--------------|----|--------|-------------------------------------------------------------|-------|----|
| placeholder  | 否  | 占位符    | Array<[String,String]>                                      | 无     |    |
| show_time    | 否  | 是否展示时间 | Boolean                                                     | false |    |
| picker       | 否  | 选择器    | String<"date", "week", "month", "quarter", "year">          | date  |    |
| value_format | 否  | 值格式    | String [具体格式](https://day.js.org/docs/zh-CN/display/format) | null  |    |

---

##### custom

自定义组件（接口提供地址）

| 字段  | 必须 | 标题 | 类型     | 默认值 | 说明 |
|-----|----|----|--------|-----|----|
| url | 是  | 地址 | String | 无   |    |

开发指南请查看[Custom开发](./Custom.md)

---

*FilterOption 结束*

---

### Column

| 字段            | 必须 | 标题   | 类型                                    | 默认值   | 说明                               |
|---------------|----|------|---------------------------------------|-------|----------------------------------|
| type          | 是  | 类型   | String                                | 无     | [ColumnOption](#ColumnOption)类型  |
| name          | 是  | 字段名  | String                                | 无     |                                  |
| title         | 是  | 列标题  | String                                | 无     |                                  |
| column_option | 是  | 类型配置 | Object<[ColumnOption](#ColumnOption)> | 无     |                                  |
| sortable      | 否  | 可排序  | Boolean                               | false | 启用排序后将以sort_field和sort_order字段发送 |           |
| filter        | 否  | 筛选   | Object                                | 无     |                                  |
| filter.type   | 否  | 筛选类型 | String<"input">                       | 无     |                                  |
| filter.option | 否  | 筛选配置 | Object                                | 无     |                                  |

#### ColumnOption

##### text

文本展示

暂无配置项

---

##### input

可编辑的文本展示

| 字段        | 必须 | 标题 | 类型                                  | 默认值 | 说明 |
|-----------|----|----|-------------------------------------|-----|----|
| operation | 否  | 操作 | Object<[Operation](./Operation.md)> | {}  |    |

---

##### switch

开关

| 字段        | 必须 | 标题 | 类型                                  | 默认值          | 说明 |
|-----------|----|----|-------------------------------------|--------------|----|
| operation | 否  | 操作 | Object<[Operation](./Operation.md)> | {}           |    |
| values    | 否  | 值  | [{未选中的值}, {选中后的值}]                  | [false,true] |    |

未设置values时，value将自动转换为Boolean

---

##### images

图片展示(多图值类型应为[Image](#Image)[]，单图则为String即可)

###### Image

| 字段  | 必须 | 标题 | 类型     | 默认值 | 说明 |
|-----|----|----|--------|-----|----|
| id  | 否  | ID | String | 无   |    |
| url | 是  | 地址 | String | 无   |    |

暂无配置项

---

##### custom

自定义组件（接口提供地址）

| 字段  | 必须 | 标题 | 类型     | 默认值 | 说明 |
|-----|----|----|--------|-----|----|
| url | 是  | 地址 | String | 无   |    |

开发指南请查看[Custom开发](./Custom.md)

---

##### actions

行操作

| 字段      | 必须 | 标题 | 类型                               | 默认值 | 说明 |
|---------|----|----|----------------------------------|-----|----|
| actions | 是  | 操作 | Array<[RowAction](#RowAction)[]> | []  |    |

---

*ColumnOption 结束*

---

##### RowAction

| 字段            | 必须 | 标题   | 类型                                          | 默认值  | 说明                                    |
|---------------|----|------|---------------------------------------------|------|---------------------------------------|
| type          | 是  | 类型   | String                                      | 无    | [RowActionOption](#RowActionOption)类型 |
| operation     | 否  | 操作   | Object<[Operation](./Operation.md)>         | {}   |                                       |
| action_option | 是  | 类型配置 | Object<[RowActionOption](#RowActionOption)> | 无    |                                       |
| condition     | 否  | 操作   | Object<[Condition](./Condition.md)>         | null |                                       |
| badge_key     | 否  | 徽标数  | String                                      | 无    | 右上角标识数字                               |

###### RowActionOption

###### link_button

编辑

| 字段     | 必须 | 标题     | 类型      | 默认值   | 说明 |
|--------|----|--------|---------|-------|----|
| title  | 是  | 按钮展示名称 | String  | 无     |    |
| danger | 否  | 是否危险操作 | Boolean | false |    |
| style  | 否  | 样式     | Object  | null  |    |

---

###### custom

自定义组件（接口提供地址）

| 字段  | 必须 | 标题 | 类型     | 默认值 | 说明 |
|-----|----|----|--------|-----|----|
| url | 是  | 地址 | String | 无   |    |

开发指南请查看[Custom开发](./Custom.md)

---

*RowActionOption 结束*

---
