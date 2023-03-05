# 智能表单渲染 Form

## 结构

| 字段      | 必须  | 标题   | 类型                         | 默认值 | 说明  |
|---------|-----|------|----------------------------|-----|-----|
| items   | 是   | 表单项  | Array<[Item](#Item)[]>     | 无   |     |
| data    | 是   | 表单数据 | Object                     | 无   |     |
| actions | 是   | 表单操作 | Array<[Action](#Action)[]> | 无   |     |

### Item

| 字段          | 必须  | 标题   | 类型                                  | 默认值   | 说明                          |
|-------------|-----|------|-------------------------------------|-------|-----------------------------|
| type        | 是   | 类型   | String                              | 无     | [ItemOption](#ItemOption)类型 |
| name        | 是   | 字段名  | String                              | 无     |                             |
| label       | 是   | 展示标题 | String                              | 无     |                             |
| item_option | 是   | 类型配置 | Object<[ItemOption](#ItemOption)>   | 无     |                             |
| tips        | 否   | 提示   | String                              | ""    |                             |
| condition   | 否   | 操作   | Object<[Condition](./Condition.md)> | null  |                             |
| disabled    | 否   | 是否禁用 | Boolean                             | false |                             |

#### ItemOption

##### text

文本显示

| 字段   | 必须  | 标题     | 类型     | 默认值 | 说明       |
|------|-----|--------|--------|-----|----------|
| text | 否   | 展示文字   | String | ""  | 与html二选一 |
| html | 否   | 展示html | String | ""  | 与text二选一 |


##### input

单行文本输入

| 字段          | 必须  | 标题  | 类型                              | 默认值 | 说明  |
|-------------|-----|-----|---------------------------------|-----|-----|
| placeholder | 是   | 占位符 | String                          | 无   |     |

---

##### textarea

多行文本输入

| 字段          | 必须  | 标题  | 类型                              | 默认值 | 说明  |
|-------------|-----|-----|---------------------------------|-----|-----|
| placeholder | 是   | 占位符 | String                          | 无   |     |

---

##### password

密码输入

| 字段          | 必须  | 标题  | 类型                              | 默认值 | 说明  |
|-------------|-----|-----|---------------------------------|-----|-----|
| placeholder | 是   | 占位符 | String                          | 无   |     |

---

##### date

日期时间选择

| 字段           | 必须  | 标题     | 类型                                                          | 默认值   | 说明  |
|--------------|-----|--------|-------------------------------------------------------------|-------|-----|
| placeholder  | 否   | 占位符    | String                                                      | 无     |     |
| show_time    | 否   | 是否展示时间 | Boolean                                                     | false |     |
| picker       | 否   | 选择器    | String<"date", "week", "month", "quarter", "year">          | date  |     |
| value_format | 否   | 值格式    | String [具体格式](https://day.js.org/docs/zh-CN/display/format) | null  |     |

---

##### date_range

日期时间范围

| 字段           | 必须  | 标题     | 类型                                                          | 默认值   | 说明  |
|--------------|-----|--------|-------------------------------------------------------------|-------|-----|
| placeholder  | 否   | 占位符    | Array<[String,String]>                                      | 无     |     |
| show_time    | 否   | 是否展示时间 | Boolean                                                     | false |     |
| picker       | 否   | 选择器    | String<"date", "week", "month", "quarter", "year">          | date  |     |
| value_format | 否   | 值格式    | String [具体格式](https://day.js.org/docs/zh-CN/display/format) | null  |     |

---

##### switch

开关

暂无配置

---

##### select

下拉选择

| 字段          |       | 必须  | 标题   | 类型              | 默认值 | 说明       |
|-------------|-------|-----|------|-----------------|-----|----------|
| searchable |       | 是   | 是否可搜索  | Boolean | false   |          |
| placeholder |       | 是   | 占位符  | String          | 无   |          |
| options     |       | 是   | 占位符  | Array<Option[]> | 无   |          |
|             | label | 是   | 展示名称 | String          | 无   | Option字段 |
|             | value | 是   | 选项值  | String          | 无   | Option字段 |

---

##### radio

单选

| 字段      |       | 必须  | 标题   | 类型              | 默认值 | 说明       |
|---------|-------|-----|------|-----------------|-----|----------|
| options |       | 是   | 占位符  | Array<Option[]> | 无   |          |
|         | label | 是   | 展示名称 | String          | 无   | Option字段 |
|         | value | 是   | 选项值  | String          | 无   | Option字段 |

---

##### checkbox

多选

| 字段      |       | 必须  | 标题   | 类型              | 默认值 | 说明       |
|---------|-------|-----|------|-----------------|-----|----------|
| options |       | 是   | 占位符  | Array<Option[]> | 无   |          |
|         | label | 是   | 展示名称 | String          | 无   | Option字段 |
|         | value | 是   | 选项值  | String          | 无   | Option字段 |

---

##### wang_editor

富文本

| 字段                      |     | 必须  | 标题         | 类型     | 默认值 | 说明  |
|-------------------------|-----|-----|------------|--------|-----|-----|
| upload_image_config_url |     | 是   | 获取上传图片配置地址 | String | 无   |     |

---

##### iconfont

iconfont图标

| 字段      |       | 必须  | 标题   | 类型              | 默认值 | 说明       |
|---------|-------|-----|------|-----------------|-----|----------|
| searchable |       | 是   | 是否可搜索  | Boolean | false   |          |
| placeholder |       | 是   | 占位符  | String          | 无   |          |
| options |       | 是   | 占位符  | Array<Option[]> | 无   |          |
|         | label | 是   | 展示名称 | String          | 无   | Option字段 |
|         | value | 是   | 选项值(需为iconfont中的symbol)  | String          | 无   | Option字段 |

---

##### image_upload

图片上传

| 字段         |      | 必须  | 标题        | 类型            | 默认值     | 说明                                                                                                       |
|------------|------|-----|-----------|---------------|---------|----------------------------------------------------------------------------------------------------------|
| max_count  |      | 否   | 最大上传数     | Number        | 1       |                                                                                                          |
| file_list  |      | 是   | 文件列表      | Array<File[]> | 无       |                                                                                                          |
|            | url  | 是   | 文件地址      | String        | 无       | File字段                                                                                                   |
|            | name | 是   | 文件名       | String        | 无       | File字段                                                                                                   |
|            | id   | 是   | 文件id      | String        | 无       | File字段                                                                                                   |
| config_url |      | 是   | 获取上传配置的地址 | String        | 无       |                                                                                                          |
| accept     |      | 否   | 允许上传的文件类型 | String        | image/* | 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |

value值类型为上述字段的file_list

---

##### file_upload

文件上传

| 字段         |      | 必须  | 标题        | 类型            | 默认值 | 说明                                                                                                       |
|------------|------|-----|-----------|---------------|-----|----------------------------------------------------------------------------------------------------------|
| max_count  |      | 否   | 最大上传数     | Number        | 1   |                                                                                                          |
| file_list  |      | 是   | 文件列表      | Array<File[]> | 无   |                                                                                                          |
|            | url  | 是   | 文件地址      | String        | 无   | File字段                                                                                                   |
|            | name | 是   | 文件名       | String        | 无   | File字段                                                                                                   |
|            | id   | 是   | 文件id      | String        | 无   | File字段                                                                                                   |
| config_url |      | 是   | 获取上传配置的地址 | String        | 无   |                                                                                                          |
| accept     |      | 否   | 允许上传的文件类型 | String        | 无   | 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |

value值类型为上述字段的file_list

---

##### division

地区联动

| 字段          | 必须  | 标题      | 类型     | 默认值 | 说明                    |
|-------------|-----|---------|--------|-----|-----------------------|
| placeholder | 否   | 占位符     | String | 无   |                       |
| url         | 是   | 加载地区url | String | 无   | 例：/divisions/\_\_id__ |
| level       | 是   | 最大级别    | String | 无   |                       |

响应返回格式：

```json
{
  "code": 200,
  "message": "",
  "data": {
    "id": "110000",
    "name": "北京",
    "level": "2",
    "parent_id": "1",
    "children": [
      {
        "id": "110100",
        "name": "北京市",
        "level": "3",
        "parent_id": "110000"
      }
    ]
  }
}
```

---

##### custom

自定义组件（接口提供地址）

| 字段  | 必须  | 标题  | 类型     | 默认值 | 说明  |
|-----|-----|-----|--------|-----|-----|
| url | 是   | 地址  | String | 无   |     |

开发指南请查看[Custom开发](./Custom.md)

---

*ItemOption 结束*

---

### Action

| 字段            | 必须  | 标题     | 类型                                    | 默认值  | 说明                                                             |
|---------------|-----|--------|---------------------------------------|------|----------------------------------------------------------------|
| type          | 是   | 类型     | String                                | 无    | [ActionOption](#ActionOption)类型                                |
| action_option | 是   | 类型配置   | Object<[ActionOption](#ActionOption)> | 无    |                                                                |
| operation     | 否   | 操作     | Object<[Operation](./Operation.md)>   | {}   |                                                                |
| condition     | 否   | 操作     | Object<[Condition](./Condition.md)>   | null |                                                                |

#### ActionOption

##### submit

提交

| 字段       | 必须  | 标题     | 类型      | 默认值   | 说明                                                             |
|----------|-----|--------|---------|-------|----------------------------------------------------------------|
| title    | 是   | 展示标题   | String  | 无     |                                                                |
| btn_type | 是   | 按钮展示样式 | String  | 无     | 详情查看[Antdv的Button](https://antdv.com/components/button-cn#API) |
| style    | 否   | 样式     | Object | null |                                                                |

---

##### button

普通按钮

| 字段       | 必须  | 标题     | 类型      | 默认值   | 说明                                                             |
|----------|-----|--------|---------|-------|----------------------------------------------------------------|
| title    | 是   | 展示标题   | String  | 无     |                                                                |
| btn_type | 是   | 按钮展示样式 | String  | 无     | 详情查看[Antdv的Button](https://antdv.com/components/button-cn#API) |
| style    | 否   | 样式     | Object | null |                                                                |

---

##### custom

自定义组件（接口提供地址）

| 字段  | 必须  | 标题  | 类型     | 默认值 | 说明  |
|-----|-----|-----|--------|-----|-----|
| url | 是   | 地址  | String | 无   |     |

开发指南请查看[Custom开发](./Custom.md)

---

*ActionOption 结束*

---