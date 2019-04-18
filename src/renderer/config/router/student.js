import Layout from '../../components/views/Home.vue'

const studentRouter = {
    path: '/student',
    component: Layout,
    meta: {
        roles: ['2']
    },
    children: [
        {
            path: '/myClass',
            component: resolve => require(['../../components/views/student/MyClass.vue'], resolve),
            meta: {
                title: '我的班级',
                icon: '班级'
            }
        },
        {
            path: '/myCourse',
            component: resolve => require(['../../components/views/student/MyCourse.vue'], resolve),
            meta: {
                title: '我的课程',
                icon: '课程'
            }
        },
        {
            path: '/myInfo',
            component: resolve => require(['../../components/views/student/MyInfo.vue'], resolve),
            meta: {
                title: '我的考勤',
                icon: '考勤'
            }
        },
        {
            path: '/vacate',
            component: resolve => require(['../../components/views/student/NewVacate.vue'], resolve),
            meta: {
                title: '请假申请',
                icon: '请假'
            }
        },
        {
            path: '/myVacate',
            component: resolve => require(['../../components/views/student/MyVacate.vue'], resolve),
            meta: {
                title: '我的请假',
                icon: '请假列表'
            }
        },
        {
            path: '/showVacateDetails',
            component: resolve => require(['../../components/views/student/ShowVacateDetails.vue'], resolve),
            hidden: true,
            meta: {
                title: '请假详情',
            }
        }
    ]
};

export default studentRouter
