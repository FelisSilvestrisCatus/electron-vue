import Vue from 'vue'
import Router from 'vue-router';
import Layout from '../../components/views/Home.vue'
import studentRouter from './student'
import teacherRouter from "./teacher";

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: resolve => require(['../../components/views/Login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                meta: {
                    title: '系统首页',
                    icon: 'dashboard',
                },
                component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            },
            {
                path: '/information',
                component: resolve => require(['../../components/views/ChangeInfo.vue'], resolve),
                meta: {
                    title: '信息维护',
                    icon: 'documentation',
                }
            }
        ]
    },
    {
        path: '/404',
        hidden: true,
        component: resolve => require(['../../components/views/404.vue'], resolve),
        meta: {title: '404'}
    }
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    studentRouter,
    teacherRouter,
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
