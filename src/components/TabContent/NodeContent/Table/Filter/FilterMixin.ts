export default {
    props: {
        option: Object,
        title: String,
        value: [Number, String, Object],
        filter_on_change: Boolean,
    },
    emits: ['update:value']
}