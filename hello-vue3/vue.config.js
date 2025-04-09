// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false
      return args
    })
  }
}