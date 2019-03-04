import store from "./store";
import axios from 'axios';
import * as types from './types'
import router from './router'


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


axios.defaults.baseURL = 'http://127.0.0.1:8888';  //之后的url直接写/xxx
// axios.defaults.baseURL = 'http://dm.aloli.cn:8888';  //之后的url直接写/xxx

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //改为表单提交
axios.defaults.withCredentials = true; //携带cookie
axios.interceptors.request.use(function (config) {
    // 在发送请求之前,格式化参数，增加token
    let data = config.data;
    let params = new URLSearchParams() //将参数转换为url的形式
    for (var key in config.data) {
        params.append(key, data[key])
    }
    config.data = params;
    return config;
}, function (error) {
    return Promise.reject(error);
});


export default axios;
