module.exports = {
  proxy: {
    '/api': { // 将www.exaple.com印射为/apis
      target: 'http://192.168.123.66:9000', // 接口域名
      changeOrigin: false // 是否跨域
    }
  }
}
