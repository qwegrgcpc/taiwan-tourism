module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = '台灣哪裡趣'
      return args
    })
  }
}