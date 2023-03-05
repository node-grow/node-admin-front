import {Operation} from "@/components/TabContent/NodeContent";


export declare interface FormItem {
    type: String,
    option: Object,
    name: String,
    label: String
}

export declare interface FormOption {
    submit: Operation,
    items: FormItem[],
    data: Object
}