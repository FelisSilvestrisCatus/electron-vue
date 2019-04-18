<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:265px;">
                    <div class="user-info">
                        <avatar :username=user.uname :size="100" color="#fff" background-color="#FFC107"></avatar>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user.uname}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <ul class="userlastinfoul">
                        <div v-if="havelast">
                            <li class="userlastinfoli">
                                <div class="user-info-list">上次登录时间：<span>{{beforelogintime}}</span></div>
                                <div class="user-info-list">上次登录地点：<span>{{beforeloginaddress}}</span></div>
                                <div class="user-info-list" v-if="beforelogintype==='1'">上次登录类型：<span>网页端</span></div>
                                <div class="user-info-list" v-else-if="beforelogintype==='2'">上次登录类型：<span>移动端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='3'">上次登录类型：<span>客户端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='4'">上次登录类型：<span>微信端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='4'">上次登录类型：<span>安卓端</span>
                                </div>
                            </li>
                            <div style="float:left;width: 1px;height:80px; background: gray;"></div>
                        </div>
                        <li v-else>
                            欢迎访问，这是您第一次登录
                        </li>
                        <li class="userlastinfoli">
                            <div class="user-info-list">本次登录时间：<span>{{lastlogintime}}</span></div>
                            <div class="user-info-list">本次登录地点：<span>{{lastloginaddress}}</span></div>
                            <div class="user-info-list" v-if="lastlogintype==='1'">上次登录类型：<span>网页端</span></div>
                            <div class="user-info-list" v-else-if="lastlogintype==='2'">上次登录类型：<span>移动端</span>
                            </div>
                            <div class="user-info-list" v-else-if="lastlogintype==='3'">上次登录类型：<span>客户端</span>
                            </div>
                            <div class="user-info-list" v-else-if="lastlogintype==='4'">上次登录类型：<span>微信端</span>
                            </div>
                            <div class="user-info-list" v-else-if="lastlogintype==='4'">上次登录类型：<span>安卓端</span>
                            </div>
                        </li>
                    </ul>

                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="3.7"></el-progress>
                    HTML
                    <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">
                                    {{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data" type="line"
                            :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import Avatar from 'vue-avatar'

    export default {
        name: 'dashboard',
        data() {
            return {
                beforelogintime: "",
                beforeloginaddress: "",
                beforelogintype: "",
                lastlogintime: "",
                lastloginaddress: "",
                lastlogintype: "",
                havelast: true,
                user: null,
                todoList: [
                    {
                        title: '今天王林写了3个bug',
                        status: false,
                    },
                    {
                        title: '今天重构了过滤器,过滤了users.flag!=0的情况',
                        status: false,
                    },
                ],
                data: [
                    {
                        name: '2018/09/04',
                        value: 998
                    },
                    {
                        name: '2018/09/05',
                        value: 999
                    }
                ],
                options: {
                    title: '最近七天每天的用户访问量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天用户访问趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart,
            Avatar
        },
        computed: {
            role() {
                return this.user.type === 1 ? '老师' : '学生';
            }
        },
        created() {
            // this.handleListener();
            // this.changeDate();
            this.user = this.$store.state.user;
            this.loginGetLast();
        },
        activated() {
            this.handleListener();
        },
        deactivated() {
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
                })
            },
            handleListener() {
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg) {
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart() {
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            },
            loginGetLast: function () {
                //发送get请求
                this.$axios({
                    method: 'GET',
                    url: '/usersLogin/getLast',
                }).then(response => {
                        var resdata = response.data;
                        this.lastloginaddress = resdata.area;
                        this.lastlogintime = resdata.time;
                        this.lastlogintype = resdata.lasttype;

                        //用户第一次登录
                        if (resdata.isfirst === "true") {
                            this.havelast = false;
                        } else {
                            this.beforelogintime = resdata.lasttime;
                            this.beforeloginaddress = resdata.lastarea;
                            this.beforelogintype = resdata.type;
                        }
                    },
                )
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .userlastinfoul {

        width: 1000px;
    }

    .userlastinfoli {
        list-style: none;
        display: inline-block;
        margin: 3px;
        margin-left: 5px;
        float: left;
        color: red;

    }


    .mgb20 {
        margin-bottom: 20px;
        width: 100%;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
