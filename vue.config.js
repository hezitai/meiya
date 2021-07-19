/*
 * @Author: hhh
 * @Date: 2021-07-12 10:47:22
 * @LastEditTime: 2021-07-12 14:52:45
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/vue.config.js
 */
const path = require('path')
module.exports = {
    lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "./static/css/variable.less")] // 引入全局样式变量
        }
    },
}