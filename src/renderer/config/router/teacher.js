import Layout from '../../components/views/Home.vue'

const teacherRouter = {
    path: '/teacher',
    component: Layout,
    meta: {
        roles: ['1']
    },
    children: [
        {
            path: '/Dashboard2',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: 'example role 1',
                icon: '班级管理'
            }
        },

    ]
};

export default teacherRouter
