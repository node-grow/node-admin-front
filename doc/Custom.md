# Custom 自定义组件开发指南

## 说明

该组件可将外部js渲染为内部组件，只需传入一个url即可

1. 必须采用vue3开发组件
2. 开发组件完成后请暴露给 ```window.async_component```
3. 推荐采用选项式API开发，否则可能无法使用该框架下提供的属性及API
4. 开发组件推荐基于ant-design-vue开发，样式已全局引入，无需再次引入

例：<br>

Custom.vue

```vue
<template>
  <div>我是自定义组件 {{ref_value}}</div>
</template>

<script lang="ts">
export default {
  inject: ['axios'],
  props: {
    option: Object,
    value: [Number, String, Object, Boolean],
  },
  data(this: { value: any }) {
    return {
      ref_value: this.value
    }
  },
  watch: {
    ref_value(this: { $emit: Function }, val: any) {
      this.$emit('update:value', val)
    }
  },
  mounted(this: { axios: any }) {
    console.log(this.axios)
  }
}
</script>

<style scoped>

</style>
```

Custom.js

```js
import c from './Custom.vue'

(function (window) {
    window.async_component = c
})(window)
```
或直接采用defineComponent的方式
```js
import {defineComponent} from "vue";

(function (window) {
    window.async_component = defineComponent({
        template: `<div>我是自定义组件 {{ref_value}}</div>`,
        props: {
            option: Object,
            value: [Number, String, Object, Boolean],
        },
        data(){
            return {
                ref_value: this.value
            }
        }
    })
})(window)
````

然后用webpack编译Custom.js文件后将可访问地址放入url配置中即可渲染为自定义组件
