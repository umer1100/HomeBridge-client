module.exports = {
  // options...
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': require('path').resolve(__dirname, 'src')
      }
    }
  }
}
