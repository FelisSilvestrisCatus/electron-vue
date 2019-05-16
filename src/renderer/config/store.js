import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import * as types from './types'
import {asyncRouterMap, constantRouterMap} from './router'

Vue.use(Vuex);

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    });
    return res
}


export default new Vuex.Store({
    modules: {
        app
    },
    state: {
        user: null,
        token: null,
        norouter: true,
        routers: constantRouterMap,
        addRouters: [],
        isPc:true,
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            state.token = data.token;
            state.user = data.user;
            localStorage.token = data.token;
            localStorage.user = JSON.stringify(data.user);
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
            state.routers = null;
            state.addRouters = null;
            state.norouter = true;
        },
        [types.SET_ROUTERS]: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            state.norouter = false;
        },
        [types.SET_PC]: (state, routers) => {
            state.isPc = routers;
        }
    },
    actions: {
        //生成路由
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                const {roles} = data;
                let accessedRouters;
                if (roles.includes('0')) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit(types.SET_ROUTERS, accessedRouters);
                resolve()
            })
        },
        //未授权访问
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit(types.LOGOUT);
                resolve()
            })
        },
    },
    getters: {
        sidebar: state => state.app.sidebar,
        language: state => state.app.language,
        size: state => state.app.size,
        device: state => state.app.device,
        token: state => state.user.token,
        permission_routers: state => state.routers,
        addRouters: state => state.addRouters,
        norouter: state => state.norouter,
    }
})
