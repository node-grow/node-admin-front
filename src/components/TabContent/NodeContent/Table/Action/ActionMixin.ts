import {TableActionOption} from "@/components/TabContent/NodeContent/Table";

export default {
    props: {
        option: <TableActionOption><any>Object,
        operate: Function,
        appContext: Object
    },
    inject:['getSelectedRows'],
    computed: {
        selected_rows(this:{getSelectedRows:Function}){
            return this.getSelectedRows()
        }
    }
}