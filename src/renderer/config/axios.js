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
        // console.log("response" + response);
        return response;
    },
    error => {
        if (error.response.status === 401) {
            store.commit(types.LOGOUT);
            router.replace({
                path: '/login',
                // query: {redirect: router.currentRoute.fullPath}
            });
            return Promise.reject('401')   // 返回接口返回的错误信息
        }
    }
)
;

if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = 'http://vue.aloli.cn/api';
} else {
    axios.defaults.baseURL = 'http://127.0.0.1:8888';
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //改为表单提交
axios.defaults.withCredentials = true; //携带cookie
axios.interceptors.request.use(function (config) {
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
