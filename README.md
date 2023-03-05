# node-admin

## 说明
该项目为后台纯前端，可通过接口返回来渲染表格或表单。<br>
详细接口格式请查看: [点我](https://www.apifox.cn/apidoc/shared-ea187bc5-eb07-4f55-b1ac-00c684f01ba5) <br>
访问密码 : j2rUrtXB<br>

接口分为常规接口及智能渲染接口
- 常规接口：有固定的地址，返回结果固定
- 智能渲染接口：无固定的地址，返回结果不固定

目前除了登录流程、获取系统配置、获取后台菜单等接口外，其它均为智能渲染接口

| 字段     | 必须  | 标题     | 类型     | 默认值 | 说明            |
|--------|-----|--------|--------|-----|---------------|
| type   | 是   | 渲染类型   | String | 无   | [智能渲染接口类型](#智能渲染接口类型) |
| option | 是   | 渲染类型配置 | Object | 无   |               |

### 智能渲染接口类型
- table 表格：[详细结构请点我](./doc/Table.md)
- form 表单：[详细结构请点我](./doc/Form.md)
- custom 自定义组件：[详细结构请点我](./doc/Custom.md)

<span style="color:red;font-weight:bold;">PS: 接口文档若有冲突，以此文档为准<span>

## 技术栈

- [Vue3](https://v3.cn.vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [Axios](http://www.axios-js.com/)

## 安装
```
yarn install
```

### 开发
```
yarn serve
```

#### 目录结构
```tree
./
├─dist
├─doc
├─public
└─src
    ├─assets（资源文件）
    ├─components（组件目录）
    │  └─TabContent
    │      └─NodeContent
    │          ├─Form
    │          │  ├─Action（表单操作组件目录）
    │          │  └─Item（表单项组件目录）
    │          └─Table
    │              ├─Action（表格顶部操作组件目录）
    │              ├─Column（表格列组件目录）
    │              │  └─RowAction（表格行操作组件目录）
    │              └─Filter（表格数据过滤组件目录）
    ├─router（路由）
    ├─store（全局存储目录）
    └─utils（通用JS）
       └─api（接口目录）
```
### 构建
```
yarn build
```

## TODO

- 增加权限点检查渲染
