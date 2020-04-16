// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router/.invoke/router'
import VueTouch from 'vue-touch'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(VueTouch, {name: 'v-touch'})
import store from './store';

/* eslint-disable no-new */
//全局配置消息
Vue.prototype.$Message.config({
    top: 120,                                      //设置高度
    duration:3                                   //设置3秒后消失
});
router.beforeEach((to, from ,next) => {
    const loginInfo = sessionStorage.getItem('loginInfo') || localStorage.getItem('token') || to.query.token

    if(to.matched.some(record => record.meta.requireAuth || record.meta.homePages)){
        //处理拦截至登录页，然后点去注册页，完善信息页，再回登录页，再登录进去，依然进去目标order页
        if(Object.keys(from.query).length === 0){//不是这种目标拦截的情况（就from.query是空对象）直接next()
            next()
        }else{
            let redirect = from.query.redirect//是目标拦截的情况，记录redirect
            if(to.path === redirect){//这个是处理无限循环的问题
                next()
            }else{
                if(Object.keys(to.query).length > 0){//加上query之后，就判断它有了query，就next()跳转进去
                    next()
                }else{//第一次跳转to路由是没有query的，我们需要加上query来记录我们需要的目标路由
                    next({
                        path:to.path,
                        query: {redirect: redirect}
                    })
                }
            }
        }
    }else{
        if(loginInfo){
            if(Object.keys(from.query).length === 0){
                next()
            }else{
                let redirect = from.query.redirect
                if(to.path === redirect){
                    next()
                }else{
                    next()
                }
            }
        }else{
            if(to.path==="/mobile/details"){
                next()
            }else if(to.path==="/mobile/moveLogin"){
                next()
            }else if(to.path==="/mobile/moveRegister"){
                next()
            }else if(to.path==="/spectaculars" ){
                next()
            }else if(to.path==="/login" ){
                next()
            }else{
                next({
                    path:"/login",
                    query: {redirect: to.fullPath}
                })
            }
        }
    }
    return
})

new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app')
