const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: "development",
    
    // 生成map映射文件
    devtool: "source-map",
	
    // 开发服务器配置
    devServer: {
        port: 8080,// 默认端口是8080
        // host:'0.0.0.0',//支持任何终端设备的访问
        stats: 'errors-only'   // + 只打印报错信息
   },
})