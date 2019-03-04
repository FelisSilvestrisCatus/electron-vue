import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import axios from './config/axios';
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

//去除警告
Vue.config.productionTip = false

//启用Element
Vue.use(ELEMENT, {
    size: 'small'
});

//注册全局变量
Vue.prototype.$axios = axios;


//启用浏览器的devtools拓展
Vue.config.devtools = true;


/* eslint-disable no-new */
new Vue({
    store,
    // components: {App},
    router,
    axios,
    render: h => h(App)
}).$mount('#app')
