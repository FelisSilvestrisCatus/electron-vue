<template>
    <div>
        <el-row :gutter="7">
            <el-col :span="9" :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
                <el-card shadow="hover">
                    <div class="user-info">
                        <avatar :username=user.uname :size="100" color="#fff" background-color="#FFC107"></avatar>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user.uname}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <el-row :gutter="32">
                        <el-col :span="12">
                            <div v-if="havelast">
                                <div class="user-info-list">上次登录时间：<span>{{beforelogintime}}</span></div>
                                <div class="user-info-list">上次登录地点：<span>{{beforeloginaddress}}</span></div>
                                <div class="user-info-list" v-if="beforelogintype==='1'">上次登录类型：<span>网页端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='2'">
                                    上次登录类型：<span>移动端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='3'">
                                    上次登录类型：<span>客户端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='4'">
                                    上次登录类型：<span>微信端</span>
                                </div>
                                <div class="user-info-list" v-else-if="beforelogintype==='4'">
                                    上次登录类型：<span>安卓端</span>
                                </div>
                            </div>
                            <div v-else>
                                欢迎访问，这是您第一次登录
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>
                                <div class="user-info-list">本次登录时间：<span>{{lastlogintime}}</span></div>
                                <div class="user-info-list">本次登录地点：<span>{{lastloginaddress}}</span></div>
                                <div class="user-info-list" v-if="lastlogintype==='1'">本次登录类型：<span>网页端</span></div>
                                <div class="user-info-list" v-else-if="lastlogintype==='2'">本次登录类型：<span>移动端</span>
                                </div>
                                <div class="user-info-list" v-else-if="lastlogintype==='3'">本次登录类型：<span>客户端</span>
                                </div>
                                <div class="user-info-list" v-else-if="lastlogintype==='4'">本次登录类型：<span>微信端</span>
                                </div>
                                <div class="user-info-list" v-else-if="lastlogintype==='4'">本次登录类型：<span>安卓端</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <BaiduMap></BaiduMap>
                    </el-row>
                </el-card>
                <br>

            </el-col>
            <el-col class="hidden-md-and-down" :span="15">
                <el-card shadow="hover">

                    <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>


                </el-card>
                <el-card shadow="hover">
                    <el-carousel :interval="4000" type="card">
                        <el-carousel-item v-for="item in imgsrc" :key="item">
                            <h3 class="medium">
                                <img :src="item" style="height: 100%">
                            </h3>
                        </el-carousel-item>
                    </el-carousel>


                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import Avatar from 'vue-avatar';
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';
    import BaiduMap from '../BaiduMap';

    export default {

        name: 'TeacherDashboard',
        data() {
            return {
                imgsrc: [],
                calenderdate: new Date(),

                //上次登录信息
                beforelogintime: "",
                beforeloginaddress: "",
                beforelogintype: "",
                //本次登录信息
                lastlogintime: "",
                lastloginaddress: "",
                lastlogintype: "",
                //是否为第一次登录
                havelast: true,

                user: null,
            }
        },
        components: {
            WeatherAndWeekDayAndDate,
            Avatar,
            BaiduMap
        },
        computed: {
            role() {
                return this.user.type === 1 ? '老师' : '学生';
            }
        },
        created() {
            this.setImg();
            this.user = this.$store.state.user;
            this.loginGetLast();

        },
        mounted() {
            // eslint-disable-next-line no-console
            console.clear();
        },
        methods: {
            setImg() {
                let imgpath;
                for (let i = 1; i <= 7; i++) {
                    imgpath = "https://cos.aloli.cn/carousel/" + i + ".jpg";
                    this.imgsrc[i - 1] = imgpath;
                }
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

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>
