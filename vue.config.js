const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    extract: !process.env.CUSTOM_COMPONENT,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }
  },

  devServer: {
    proxy: {
      '/webpack': {
        target: 'http://0.0.0.0:8088',
        pathRewrite: { '^/webpack': '' },
      },
    }
  },
  runtimeCompiler: true
})
