module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/taiwan-tourism/' : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '台灣哪裡趣'
      return args
    })
  }
}
