export default {
    props: {
        option: Object,
        value: [Number, String, Object, Boolean],
        disabled: Boolean,
    },
    emits: ['update:value'],
}