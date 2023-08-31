export default {
    props: {
        option: Object,
        value: [Number, String, Object, Boolean, Array],
        disabled: Boolean,
    },
    emits: ['update:value'],
}
