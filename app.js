const config = require('./package.json');

const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();
const compression = require('compression');
app.use(compression({filter: shouldCompress}));


function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // 这里就过滤掉了请求头包含'x-no-compression'
        return false;
    }

    return compression.filter(req, res);
}

// 超时时间
const TIME_OUT = 600 * 1e3;

// 设置端口
app.set('port', config.listen);

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
    if (!req.timedout) next();
});


proxyOption = {
    target: `http://${config.proxyServer.host}:${config.proxyServer.port}`,
    pathRewrite: {
        '^/api/' : '/api/' // 重写请求，api/解析为/
    },
    changeOrigoin:true
};

// 反向代理
app.use('/api/*', proxy(proxyOption));

// 静态资源路径
app.use('/', express.static('./dist'));

// 监听端口
app.listen(app.get('port'), () => {
    console.log(`server running http://localhost:${app.get('port')}`);
});