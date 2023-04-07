const path = require('path')
const {build, createServer} = require('vite')
const vuePlugin = require("@vitejs/plugin-vue")

const action = process.argv[2]
const name = process.argv[3]

const config = {
    base: './',
    build: {
        minify: false,
        cssCodeSplit: true, // 将组件的 style 打包到 js 文件中
        outDir: path.resolve(__dirname, `../remote/${name}/dist`),
        lib: {
            name,
            target: 'esnext',
            formats: ['umd'],
            entry: path.resolve(__dirname, `../remote/${name}/index.js`),
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [
        vuePlugin(),
    ]
}

switch (action) {
    case 'build':
        (async () => {
            await build(config)
        })()
        break;
    case 'dev':
        (async () => {
            const server = await createServer(config)

            await server.listen()
            server.printUrls()
        })()
        break;

}