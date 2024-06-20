# Operation 操作

## 结构

| 字段               | 必须 | 标题            | 类型      | 默认值   | 说明 |
|------------------|----|---------------|---------|-------|----|
| type             | 是  | 类型            | String  | 无     |    |
| reload_layout    | 否  | 完成后重新加载界面（菜单） | Boolean | false |    |
| operation_option | 是  | [类型配置](#类型配置) | Object  | 无     |    |

### 类型配置

#### add_tab

增加Tab页

| 字段        | 必须 | 标题     | 类型      | 默认值  | 说明                         |
|-----------|----|--------|---------|------|----------------------------|
| url       | 否  | 渲染配置地址 | String  | 无    | 当node_data为空时必填            |
| title     | 是  | tab页标题 | String  | 无    |                            |
| type      | 是  | 类型     | String  | 无    | [node_content，inner_path]  |
| closable  | 是  | 是否可关闭  | Boolean | true |                            |
| node_data | 否  | 渲染内容   | Object  | 无    | type为node_content有效，与url互斥 |

---

#### modal

弹窗

| 字段        | 必须 | 标题     | 类型     | 默认值 | 说明                         |
|-----------|----|--------|--------|-----|----------------------------|
| url       | 否  | 渲染配置地址 | String | 无   | 当node_data为空时必填            |
| title     | 是  | tab页标题 | String | 无   |                            |
| type      | 是  | 类型     | String | 无   | [node_content，inner_path]  |
| node_data | 否  | 渲染内容   | Object | 无   | type为node_content有效，与url互斥 |

---

#### request

发送请求

| 字段     | 必须 | 标题     | 类型     | 默认值 | 说明 |
|--------|----|--------|--------|-----|----|
| url    | 是  | 请求地址   | String | 无   |    |
| method | 是  | 请求方法   | String | 无   |    |
| body   | 是  | 请求body | any    | 无   |    |

---

#### goto_as_a

a标签跳转页面

| 字段     | 必须 | 标题    | 类型     | 默认值    | 说明 |
|--------|----|-------|--------|--------|----|
| url    | 是  | 跳转地址  | String | 无      |    |
| target | 否  | a标签目标 | String | _blank |    |

---

*类型配置 结束*

### 注意事项

表格行操作、表单Actions操作时，会进行特殊处理

1. 将url字段中大括号"{}"或双下划线"__"包含在内的字段用数据中对应的字段替换
2. 若body为对象，则将body字段中符合/^{(\w+)}$/或/^\__(\w+)__$/的字段用数据中对应的字段替换

表格操作(Table.Actions)

1. 将url或body中的{selected_keys}及\_\_selected_keys__转换为由选中行的data_key组成的逗号分隔的字符串
2. 将body中的{selected_rows}及\_\_selected_rows__转换为由选中行的数据组成的数组

---