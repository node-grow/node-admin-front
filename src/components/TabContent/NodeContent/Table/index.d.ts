import {Operation} from "@/components/TabContent/NodeContent";

export interface TableActionOption{
    type: String,
    title: String,
    operation: Operation,
}

export interface ColumnType {
    type: String,
    title: String,
    option: Object,
    name: String,
    fixed: String|any,
    sortable?: boolean,
    filter: {
        type: String,
        option: any,
    },
}