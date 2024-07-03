import {App} from "vue";

export default {
    install(app: App) {
        // 去除警告
        app.config.warnHandler = () => {
        }

        app.provide('getModal', null)
            .provide('reloadData', null)

        if (typeof window !== 'undefined') {
            window.$app = app;
        }

        const container = window.$container

        // 注册内置组件
        container.register('TabContent/InnerPath', () => import('@/components/TabContent/InnerPath.vue'))
        container.register('TabContent/NodeContent', () => import('@/components/TabContent/NodeContent/index.vue'))

        // 界面组件
        container.register('TabContent/NodeContent/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Dashboard', () => import('@/components/TabContent/NodeContent/Dashboard/index.vue'))
        container.register('TabContent/NodeContent/Form', () => import('@/components/TabContent/NodeContent/Form/index.vue'))
        container.register('TabContent/NodeContent/Tab', () => import('@/components/TabContent/NodeContent/Tab/index.vue'))
        container.register('TabContent/NodeContent/Table', () => import('@/components/TabContent/NodeContent/Table/index.vue'))

        // 操作
        container.register('TabContent/NodeContent/Form/Action/Button', () => import('@/components/TabContent/NodeContent/Form/Action/Button.vue'))
        container.register('TabContent/NodeContent/Form/Action/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Form/Action/Submit', () => import('@/components/TabContent/NodeContent/Form/Action/Submit.vue'))

        // 表单项
        container.register('TabContent/NodeContent/Form/Item/Checkbox', () => import('@/components/TabContent/NodeContent/Form/Item/Checkbox.vue'))
        container.register('TabContent/NodeContent/Form/Item/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Form/Item/Date', () => import('@/components/TabContent/NodeContent/Form/Item/Date.vue'))
        container.register('TabContent/NodeContent/Form/Item/DateRange', () => import('@/components/TabContent/NodeContent/Form/Item/DateRange.vue'))
        container.register('TabContent/NodeContent/Form/Item/Division', () => import('@/components/TabContent/NodeContent/Form/Item/Division.vue'))
        container.register('TabContent/NodeContent/Form/Item/FileUpload', () => import('@/components/TabContent/NodeContent/Form/Item/FileUpload.vue'))
        container.register('TabContent/NodeContent/Form/Item/Iconfont', () => import('@/components/TabContent/NodeContent/Form/Item/Iconfont.vue'))
        container.register('TabContent/NodeContent/Form/Item/ImageUpload', () => import('@/components/TabContent/NodeContent/Form/Item/ImageUpload.vue'))
        container.register('TabContent/NodeContent/Form/Item/index', () => import('@/components/TabContent/NodeContent/Form/Item/index.vue'))
        container.register('TabContent/NodeContent/Form/Item/Input', () => import('@/components/TabContent/NodeContent/Form/Item/Input.vue'))
        container.register('TabContent/NodeContent/Form/Item/Number', () => import('@/components/TabContent/NodeContent/Form/Item/Number.vue'))
        container.register('TabContent/NodeContent/Form/Item/Password', () => import('@/components/TabContent/NodeContent/Form/Item/Password.vue'))
        container.register('TabContent/NodeContent/Form/Item/Radio', () => import('@/components/TabContent/NodeContent/Form/Item/Radio.vue'))
        container.register('TabContent/NodeContent/Form/Item/Select', () => import('@/components/TabContent/NodeContent/Form/Item/Select.vue'))
        container.register('TabContent/NodeContent/Form/Item/Switch', () => import('@/components/TabContent/NodeContent/Form/Item/Switch.vue'))
        container.register('TabContent/NodeContent/Form/Item/Table', () => import('@/components/TabContent/NodeContent/Form/Item/Table.vue'))
        container.register('TabContent/NodeContent/Form/Item/Text', () => import('@/components/TabContent/NodeContent/Form/Item/Text.vue'))
        container.register('TabContent/NodeContent/Form/Item/Textarea', () => import('@/components/TabContent/NodeContent/Form/Item/Textarea.vue'))
        container.register('TabContent/NodeContent/Form/Item/WangEditor', () => import('@/components/TabContent/NodeContent/Form/Item/WangEditor.vue'))

        // 表单项表格列
        container.register('TabContent/NodeContent/Form/Item/Table/Column/Input', () => import('@/components/TabContent/NodeContent/Form/Item/Table/Column/Input.vue'))
        container.register('TabContent/NodeContent/Form/Item/Table/Column/Select', () => import('@/components/TabContent/NodeContent/Form/Item/Table/Column/Select.vue'))

        // 表格操作
        container.register('TabContent/NodeContent/Table/Action/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Table/Action/Button', () => import('@/components/TabContent/NodeContent/Table/Action/Button.vue'))

        // 表格列
        container.register('TabContent/NodeContent/Table/Column/Actions', () => import('@/components/TabContent/NodeContent/Table/Column/Actions.vue'))
        container.register('TabContent/NodeContent/Table/Column/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Table/Column/Switch', () => import('@/components/TabContent/NodeContent/Table/Column/Switch.vue'))
        container.register('TabContent/NodeContent/Table/Column/Text', () => import('@/components/TabContent/NodeContent/Table/Column/Text.vue'))
        container.register('TabContent/NodeContent/Table/Column/Input', () => import('@/components/TabContent/NodeContent/Table/Column/Input.vue'))
        container.register('TabContent/NodeContent/Table/Column/Images', () => import('@/components/TabContent/NodeContent/Table/Column/Images.vue'))

        // 表格列筛选
        container.register('TabContent/NodeContent/Table/Column/DropdownFilter/Input', () => import('@/components/TabContent/NodeContent/Table/Column/DropdownFilter/Input.vue'))

        // 表格行操作
        container.register('TabContent/NodeContent/Table/Column/RowAction/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Table/Column/RowAction/LinkButton', () => import('@/components/TabContent/NodeContent/Table/Column/RowAction/LinkButton.vue'))

        // 表格筛选
        container.register('TabContent/NodeContent/Table/Filter/Custom', () => import('@/components/Common/Custom.vue'))
        container.register('TabContent/NodeContent/Table/Filter/Input', () => import('@/components/TabContent/NodeContent/Table/Filter/Input.vue'))
        container.register('TabContent/NodeContent/Table/Filter/Date', () => import('@/components/TabContent/NodeContent/Table/Filter/Date.vue'))
        container.register('TabContent/NodeContent/Table/Filter/DateRange', () => import('@/components/TabContent/NodeContent/Table/Filter/DateRange.vue'))
        container.register('TabContent/NodeContent/Table/Filter/Select', () => import('@/components/TabContent/NodeContent/Table/Filter/Select.vue'))

    }
}