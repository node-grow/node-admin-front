import '@vue/runtime-core'
import {Container} from "@/container";

/// <reference types="vite/client" />
declare module '*.vue' {
    import {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    interface Window {
        $container: Container,
        $app: any,
        Vue: any,
    }
}