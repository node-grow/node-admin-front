# 智能标签页 Tab

## 结构

| 字段            | 必须 | 标题     | 类型                           | 默认值 | 说明 |
|---------------|----|--------|------------------------------|-----|----|
| tabs          | 是  | 标签列表   | Array<[TabItem](#TabItem)[]> | 无   |    |
| default_index | 否  | 默认标签索引 | Number                       | 0   |    |

### TabItem

| 字段        | 必须 | 标题     | 类型     | 默认值 | 说明              |
|-----------|----|--------|--------|-----|-----------------|
| name      | 是  | 名称标识   | String | 无   |                 |
| url       | 否  | 渲染配置地址 | String | 无   | 当node_data为空时必填 |
| title     | 是  | 展示标题   | String | 无   |                 |
| method    | 否  | 请求方法   | String | GET |                 |
| node_data | 否  | 渲染内容   | Object | 无   | 与url互斥          |
