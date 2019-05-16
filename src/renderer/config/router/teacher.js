import Layout from '../../components/views/Home.vue'

const teacherRouter = {
    path: '/teacher',
    component: Layout,
    meta: {
        roles: ['1']
    },
    children: [
        {
            path: '/teacherDashboard',
            meta: {
                title: '系统首页',
                icon: 'dashboard',
            },
            component: resolve => require(['../../components/views/teacher/TeacherDashboard.vue'], resolve),
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
            path: '/createClass',
            component: resolve => require(['../../components/views/teacher/CreateClass.vue'], resolve),
            meta: {
                title: '班级维护',
                icon: '班级'
            }
        },
        {
            path: '/showCreatedClass',
            component: resolve => require(['../../components/views/teacher/ShowCreatedClass.vue'], resolve),
            meta: {
                title: '课程维护',
                icon: '课程'
            }
        },

        {
            path: '/rollCall',
            component: resolve => require(['../../components/views/teacher/ShowRollCallClass.vue'], resolve),
            meta: {
                title: '考勤管理',
                icon: '考勤'
            }
        }, {
            path: '/studentManagement',
            component: resolve => require(['../../components/views/teacher/ShowCreateClassForManageMentStudent.vue'], resolve),
            meta: {
                title: '人员管理',
                icon: '班级'
            }
        },

        {
            path: '/vacateManagement',
            component: resolve => require(['../../components/views/teacher/ShowRoughVacate.vue'], resolve),
            meta: {
                title: '请假管理',
                icon: '请假'
            }
        },
        {
            path: '/showCourseByCid',
            name: 'showCourse',
            hidden: true,

            component: resolve => require(['../../components/views/teacher/ShowCreateCourse.vue'], resolve),
            meta: {
                title: '课程信息',

            }
        },
        {
            path: '/showStudentById',
            name: 'showStudentById',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/StudentManage.vue'], resolve),
            meta: {
                title: '学生信息',

            }
        },
        {
            path: '/showDetailVacate',
            name: 'showDetailVacate',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/ShowDetailVacate.vue'], resolve),
            meta: {
                title: '请假申请详情',

            }
        },
        {
            path: '/RocallUserNormal',
            name: 'RocallUseNormal',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/RocallUserNormal.vue'], resolve),
            meta: {
                title: '常规点名',

            }
        },
        {
            path: '/ShowRollCallHistory',
            name: 'ShowRollCallHistory',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/ShowRollCallHistory.vue'], resolve),
            meta: {
                title: '查看出勤历史',

            }
        },
        {
            path: '/ShowPersoncalRollCall',
            name: 'ShowPersoncalRollCall',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/ShowPersoncalRollCall.vue'], resolve),
            meta: {
                title: '查看个人出勤历史',

            }
        },
        {
            path: '/RocallUseDefaultRate',
            name: 'RocallUseDefaultRate',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/RocallUseDefaultRate.vue'], resolve),
            meta: {
                title: '随机点名',

            }
        }, {
            path: '/RocallUseVoice',
            name: 'RocallUseVoice',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/RocallUseVoice.vue'], resolve),
            meta: {
                title: '语音点名',
            }
        },{
            path: '/RocallUseFaceReco',
            name: 'RocallUseFaceReco',
            hidden: true,
            component: resolve => require(['../../components/views/teacher/RocallUseFaceReco.vue'], resolve),
            meta: {
                title: '人脸识别点名',
            }
        },
    ]
};

export default teacherRouter
