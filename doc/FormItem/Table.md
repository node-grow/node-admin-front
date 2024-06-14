## 表单Table说明

### Column

| 字段            | 必须 | 标题  | 类型     | 默认值 | 说明                                     |
|---------------|----|-----|--------|-----|----------------------------------------|
| label         | 是  | 标题  | string | -   | -                                      |
| type          | 是  | 类型  | string | -   | 参考 [Type类型及option配置](#Type类型及option配置) |
| column_option | 是  | 列配置 | object | -   | -                                      |

#### Type类型及option配置

##### input

| 字段          | 必须 | 标题  | 类型     | 默认值 | 说明 |
|-------------|----|-----|--------|-----|----|
| placeholder | 否  | 占位符 | string | -   | -  |

##### select

| 字段           | 必须 | 标题   | 类型      | 默认值      | 说明                             |
|--------------|----|------|---------|----------|--------------------------------|
| option       | 是  | 选项   | array   | -        | -                              |
| option.label | 是  | 标题   | string  | -        | -                              |
| option.value | 是  | 值    | string  | -        | -                              |
| placeholder  | 否  | 占位符  | string  | -        | -                              |
| mode         | 否  | 模式   | String  | combobox | 参考 ant-design-vue Select 模式配置  |
| searchable   | 否  | 可搜索  | boolean | -        | -                              |
| search_url   | 否  | 搜索接口 | string  | -        | 参考 [搜索接口](../Helper.md#Search) |

