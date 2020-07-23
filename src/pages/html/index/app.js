/*
 * @Author: your name
 * @Date: 2020-06-19 14:32:51
 * @LastEditTime: 2020-06-28 09:56:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\html\index\app.js
 */ 
import App from './app.vue';
import Vue from 'vue';
import router from 'pages/router/router.js'
import axios  from 'axios'
import ElementUI from 'element-ui';
import Vuex from 'vuex'
import vTap from 'v-tap';
import store from '../../../dora/store'  //vuex
import VDistpicker from 'v-distpicker'  //地区选择器

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(router);
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.use(vTap); //添加vue tap事件
Vue.prototype.$axios = axios;
// process.env.NODE_ENV = 'production';   //development   //production   //local

if(process.env.NODE_ENV === 'test'){
    axios.defaults.baseURL = 'http://app.fzyishuang.top/';
}else if(process.env.NODE_ENV === 'production'){
    axios.defaults.baseURL = 'http://www.pycac.com/';
}else{
    axios.defaults.baseURL = '/api';
}
     //http://www.pycac.com/  //http://app.fzyishuang.top/
Vue.config.productionTip = false;

/** rsa加密 */
import JSEncrypt from 'jsencrypt';
 
Vue.prototype.$getRsaCode = function(str){ // 注册方法
  let pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEAQnLqKDERepmXQyLoHpz3jpDO5I6Pyw2IhijiAN1Uhc12EpCvgUdoaCYV31sKGnRkXnaoJHspLWmGtznND6mXMlPEEg0VCOjRJoa6AH9hjmqz+vdgJJdjHef+nOV6BrsQLiMO8Nho5FlFZkPkEWHpKhfb3lsmujZZzx6bO+GwwIDAQAB`;// ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let  data = encryptStr.encrypt(str.toString());  // 进行加密
  return data;
}

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template:"<App/>",
});

//全局布置组件
Vue.component('v-distpicker',VDistpicker);