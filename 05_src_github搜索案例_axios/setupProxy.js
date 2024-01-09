const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy.createProxyMiddleware('/api1',{   //遇见/api1前缀的请求，就会触发该代理配置
            target:'http://localhost:5000',     //请求转发给谁
            changeOrigin:true,      //控制服务器收到的请求头中Host字段的值
            /**
             * changeOrigin设置为true时，服务器收到的请求头中的host为：localhost：6000
             * changeOrigin设置为false时，服务器收到的请求头中的host为：localhost：3000
             * changeOrigin默认值为false，但我们一般将changeOrigin值设为true
             */
            pathRewrite:{'^/api1':''}   //重写请求路径 去除请求前缀，保证交给后台服务器的是正常的请求地址（必须配置）
        })
    )
}