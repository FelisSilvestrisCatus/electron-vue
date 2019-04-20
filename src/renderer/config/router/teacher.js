import Layout from '../../components/views/Home.vue'

const teacherRouter = {
    path: '/teacher',
    component: Layout,
    meta: {
        roles: ['1']
    },
    children: [
        {
            path: '/createClass',
            component: resolve => require(['../../components/views/teacher/CreateClass.vue'], resolve),
            meta: {
                title: '创建班级',
                icon: '班级'
            }
        },
        {
            path: '/auditClass',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: '修改班级',
                icon: '班级管理'
            }
        },
        {
            path: '/createCourse',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: '创建课程',
                icon: '班级管理'
            }
        },
        {
            path: '/auditCourse',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: '修改课程',
                icon: '班级管理'
            }
        },
    ]
};

export default teacherRouter
