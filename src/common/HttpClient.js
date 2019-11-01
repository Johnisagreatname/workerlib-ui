// 默认利用axios的cancelToken进行防重复提交。
// 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true
import axios from 'axios';
/* 防止重复提交，利用axios的cancelToken */
var pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
var CancelToken = axios.CancelToken;
var removePending = function (config, f) {
    // 获取请求的url
    var flagUrl = config.url;
    // 判断该请求是否在请求队列中
    if (pending.indexOf(flagUrl) !== -1) {
        // 如果在请求中，并存在f,f即axios提供的取消函数
        if (f) {
            f('取消重复请求'); // 执行取消操作
        }
        else {
            pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
        }
    }
    else {
        // 如果不存在在请求队列中，加入队列
        if (f) {
            pending.push(flagUrl);
        }
    }
};
/* 创建axios实例 */
var service = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});
/* request拦截器 */
service.interceptors.request.use(function (config) {
    // neverCancel 配置项，允许多个请求
    if (!config.neverCancel) {
        // 生成cancelToken
        config.cancelToken = new CancelToken(function (c) {
            removePending(config, c);
        });
    }
    // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
    //   if (store.getters.sessionId) {
    //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
    //   }
    return config;
}, function (error) {
    Promise.reject(error);
});
/* respone拦截器 */
service.interceptors.response.use(function (response) {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    if (response.status != 200) {
        throw response.data.message;
    }
    if (response.data.status != 0 || response.data.data == undefined) {
        throw response.data.message;
    }
    var data = response.data;
    return data;
}, function (error) {
    // 异常处理
    console.log(error);
    pending = [];
    if (error.message === '取消重复请求') {
        return Promise.reject(error);
    }
    return Promise.reject(error);
});
export default service;
/****使用例子****/
//
// // api/main.ts
// import request from '@/common/HttpClient';
//
// // get
// request.get(URL)
//
// // post
// request.post(URL, data)
//# sourceMappingURL=HttpClient.js.map