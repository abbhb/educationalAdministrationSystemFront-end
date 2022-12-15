module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: '8081',
        open: true,
        proxy: {
            '^/api': {                //这里最好有一个 /
                target: 'http://127.0.0.1:8080/ssm',         // 服务器端接口地址
                ws: true,            //如果要代理 websockets，配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api':''//重写路径
                }

            }
        }
    }
}