// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import Echart from 'echarts';
Vue.prototype.$echarts = Echart;

Vue.config.productionTip = false

import store from './store';

/* eslint-disable no-new */
//全局配置消息
Vue.prototype.$Message.config({
  top: 120,                                      //设置高度
  duration:3                                   //设置3秒后消失
});

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
