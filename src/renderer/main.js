import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import axios from './config/axios';
import ELEMENT from 'element-ui'
import './config/permission'; //权限验证
import './assets/css/icon.css';
import './components/icon' // icon
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

//去除警告
Vue.config.productionTip = false;

//启用Element
Vue.use(ELEMENT);

//注册全局变量
Vue.prototype.$axios = axios;


//启用浏览器的devtools拓展
Vue.config.devtools = true;

new Vue({
    store,
    router,
    axios,
    render: h => h(App)
}).$mount('#app')
