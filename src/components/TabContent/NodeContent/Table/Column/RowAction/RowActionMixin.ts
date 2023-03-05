import {TableActionOption} from "@/components/TabContent/NodeContent/Table";

export default {
    props: {
        option: <TableActionOption|object>Object,
        operate: Function,
        record: Object,
    },
}