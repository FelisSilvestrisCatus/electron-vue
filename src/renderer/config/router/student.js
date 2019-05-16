import Layout from '../../components/views/Home.vue'

const studentRouter = {
    path: '/student',
    component: Layout,
    meta: {
        roles: ['2']
    },
    children: [

        {
            path: '/dashboardStudent',
            meta: {
                title: '系统首页',
                icon: 'dashboard',
            },
            component: resolve => require(['../../components/views/student/StudentDashboard.vue'], resolve),
        },
        {
            path: '/information',
            component: resolve => require(['../../components/views/ChangeInfo.vue'], resolve),
            meta: {
                title: '信息维护',
                icon: 'documentation',
            }
        },
        {
            path: '/SetFaceImg',
            name: '人脸信息',
            meta: {
                title: '人脸信息',
                icon: '人脸',
            },
            component: resolve => require(['../../components/views/student/SetFaceImg.vue'], resolve)
        },
        {
            path: '/myClass',
            name: 'myClass',
            component: resolve => require(['../../components/views/student/MyClass.vue'], resolve),
            meta: {
                title: '我的班级',
                icon: '班级'
            }
        },
        {
            path: '/myCourse',
            name: 'myCourse',
            component: resolve => require(['../../components/views/student/MyCourse.vue'], resolve),
            meta: {
                title: '我的课程',
                icon: '课程'
            }
        },
        {
            path: '/MyVacateInfo',
            name: 'MyVacateInfo',
            component: resolve => require(['../../components/views/student/MyVacateInfo.vue'], resolve),
            meta: {
                title: '我的信息',
                icon: '考勤'
            }
        },
        {
            path: '/MyVacateDetails',
            name: 'MyVacateDetails',
            component: resolve => require(['../../components/views/student/MyVacateDetails.vue'], resolve),
            meta: {
                title: '考勤列表',
                icon: '考勤列表'
            }
        },
        {
            path: '/vacate',
            name: 'vacate',
            component: resolve => require(['../../components/views/student/NewVacate.vue'], resolve),
            meta: {
                title: '请假申请',
                icon: '请假'
            }
        },
        {
            path: '/myVacate',
            name: 'myVacate',
            component: resolve => require(['../../components/views/student/MyVacate.vue'], resolve),
            meta: {
                title: '我的请假',
                icon: '请假列表'
            }
        },
        {
            path: '/showVacateDetails',
            name: 'showVacateDetails',
            component: resolve => require(['../../components/views/student/ShowVacateDetails.vue'], resolve),
            hidden: true,
            meta: {
                title: '请假详情',
            }
        }
    ]
};

export default studentRouter
