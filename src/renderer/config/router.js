import Vue from 'vue'
import * as types from './types';
import store from "./store";
import Router from 'vue-router';

Vue.use(Router);

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
    store.commit(types.LOGIN, {
        token: localStorage.getItem('token'),
        user: eval("(" + localStorage.getItem('user') + ")")
    });
}

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve => require(['../components/views/Login.vue'], resolve)
        },
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            // name: 'home',
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: resolve => require(['../components/views/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/views/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                }
                // {
                //     path: '/table',
                //     component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                //     meta: {title: '基础表格'}
                // },
                // {
                //     path: '/tabs',
                //     component: resolve => require(['../components/page/Tabs.vue'], resolve),
                //     meta: {title: 'tab选项卡'}
                // },
                // {
                //     path: '/form',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                //     meta: {title: '基本表单'}
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                //     meta: {title: '富文本编辑器'}
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve),
                //     meta: {title: 'markdown编辑器'}
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve),
                //     meta: {title: '文件上传'}
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                //     meta: {title: 'schart图表'}
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve),
                //     meta: {title: '拖拽列表'}
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                //     meta: {title: '拖拽弹框'}
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: resolve => require(['../components/page/Permission.vue'], resolve),
                //     meta: {title: '权限测试', permission: true}
                // },
                // {
                //     path: '/404',
                //     component: resolve => require(['../components/page/404.vue'], resolve),
                //     meta: {title: '404'}
                // },
                // {
                //     path: '/403',
                //     component: resolve => require(['../components/page/403.vue'], resolve),
                //     meta: {title: '403'}
                // }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['../components/views/Test.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router;
