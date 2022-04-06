module.exports = {
    //取消打包后自动生成的map文件
    productionSourceMap: false,
    //关闭rslint
    lintOnSave: false,
    //跨域代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211'
            }
        }
    }
}