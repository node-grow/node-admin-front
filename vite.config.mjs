import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {visualizer} from 'rollup-plugin-visualizer'
import path from "node:path"

// https://vitejs.dev/config/

export default defineConfig({
    base: './',
    plugins: [
        vue(),
        visualizer({
            open: true,
        }),
    ],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

})