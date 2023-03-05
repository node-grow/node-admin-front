import {ColumnsType} from "ant-design-vue/es/table";
import {ColumnType} from "@/components/TabContent/NodeContent/Table";
import {TableColumnProps} from "ant-design-vue";

interface MixColumn extends ColumnsType{
    dataIndex: string,
    column: TableColumnProps & {
        resColumn: ColumnType,
    },
}

export default {
    props: {
        column: <object|MixColumn>Object,
        record: Object,
        option: Object,
    }
}