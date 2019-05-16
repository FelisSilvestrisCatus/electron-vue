<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
        <div v-show="showdiv===0">
            <el-row>
                <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>
                <el-row :gutter="24">
                    <el-card :body-style="{ padding: '5px' }">

                        <el-table
                                :data="tableData1.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"

                                style="width: 100%">

                            <el-table-column
                                    label="课程id"
                                    prop="courseid">
                            </el-table-column>
                            <el-table-column
                                    label="班级名字"
                                    prop="classname">
                            </el-table-column>
                            <el-table-column
                                    label="课程名字"
                                    prop="cname"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="应到人数/总人数"
                                    prop="cname"
                                    :formatter="snum_anum"


                            >
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            type="primary"
                                            @click="showRollWays(scope.row)">点名
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="right">
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                            v-model="search"
                                            size="mini"
                                            placeholder="输入关键字搜索"/>
                                </template>
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            type="primary"
                                            @click="chooseCourseRollOrPerson(scope.$index, scope.row)">查看考勤
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>


                </el-row>


            </el-row>
        </div>
        <div v-show="showdiv===1" class="container">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="点名课程名字" prop="cname">
                    <el-input v-model="ruleForm.cname" :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="点名方式" prop="ctime">
                    <el-select v-model="ruleForm.ctime" placeholder="请选择点名方式">
                        <el-option :label="item.rtname" :value="item.rtid+''" v-for="item in rolltype"
                                   :key="item.rtid"></el-option>

                    </el-select>
                </el-form-item>


            </el-form>
            <el-button type="primary" @click="startRoll">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </div>

        <div v-show="showdiv===2" class="container">
            <el-button type="primary" @click="showPersonaRollCall()">个人历史出勤</el-button>
            <el-button type="primary" @click="showRollCallDetailByCourseId">课程历史出勤</el-button>
        </div>
    </div>

</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';

    export default {
        name: "ShowRollClallClass",
        components: {
            WeatherAndWeekDayAndDate
        },
        data() {
            return {
                index: '',
                row: '',
                //点名类型
                rolltype: [],
                courseid: '',//点名班级号
                //对话框选择点名技术
                dialogVisible: false,
                dialogVisible_: false,
                ruleForm: {
                    cname: '',
                    ctime: ''

                },

                search: '',
                tableData1: [],
                weekday: '',
                date: '',//日期
                weather: '',//图标
                weathername: '',//天气名称
                wind: '',//风向及大小
                temperature: '',//温度
                humidity: '',//湿度
                loginaddress: '',
                value: new Date(),

                showdiv: 0,
            }
        },
        watch: {
            '$route'(to, from) {
                //监听路由变化
                this.getWeather();
                this.getDay();
                this.getCourseToday();
                this.getRollType();
            }
        },
        created() {

            this.getWeather();
            this.getDay();
            this.getCourseToday();
            this.getRollType();

        },
        methods: {
            //查看个人
            showPersonaRollCall() {
                this.dialogVisible_ = false;
                this.$router.push({
                    name: 'ShowPersoncalRollCall',
                    params: {
                        courseid: this.courseid,
                    }
                })
            },
            chooseCourseRollOrPerson(index, row) {
                this.courseid = row.courseid;
                this.dialogVisible_ = true;
                this.showdiv = 2;
            },
            //查看考勤历史
            showRollCallDetailByCourseId() {
                this.dialogVisible_ = false;
                this.$router.push({
                    name: 'ShowRollCallHistory',
                    params: {
                        courseid: this.courseid,


                    }
                })

            },
            //获取点名方式
            getRollType() {

                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getRollType',
                    data: {}
                }).then(response => {
                    var jsondata = eval('(' + response.data.data + ')');
                    this.rolltype = jsondata;
                    console.log(jsondata);

                })

            },
            getDay() {
                var myDate = new Date();

                //获取当前星期X(0-6,0代表星期天)
                var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                this.weekday = weekDay[myDate.getDay()];
                this.date = "日期：" + myDate.toLocaleDateString();     //获取当前日期

            },
            judgeWeather(info) {
                if (info.indexOf("多云") > -1 || info.indexOf('阴') > -1) {
                    this.weather = "多云";
                    return;

                }
                if (info.indexOf("雨") > -1) {
                    this.weather = "雨天";
                    return;

                }
                if (info.indexOf("雪") > -1) {
                    this.weather = "雪";
                    return;

                }
                if (info.indexOf("雷") > -1) {
                    this.weather = "雷";
                    return;

                }
                if (info.indexOf("雾") > -1) {
                    this.weather = "雾";
                    return;

                }
                if (info.indexOf("雾霾") > -1) {
                    this.weather = "雾霾";
                    return;

                }
                if (info.indexOf("台风") > -1) {
                    this.weather = "台风";
                    return;

                }
                if (info.indexOf("晴") > -1) {
                    this.weather = "晴";


                } else {

                    this.weather = "未知天气";
                    return;
                }

            },
            getWeather() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getWeather',
                    data: {}
                }).then(response => {

                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.judgeWeather(jsondata.info);
                    this.weathername = "当前：" + jsondata.info;
                    this.wind = jsondata.direct + ":" + jsondata.power;
                    this.temperature = "温度：" + jsondata.temperature;
                    this.humidity = "湿度:" + jsondata.humidity;
                })


            },
            getCourseToday() {

                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getCourseToday',
                    data: {}
                }).then(response => {
                    var jsondata = eval('(' + response.data.data + ')');

                    this.tableData1 = jsondata;

                })


            },
            snum_anum(row) {
                return row.anum + "/" + row.snum;
            },
            showRollWays(row) {
                this.dialogVisible = true;
                this.courseid = row.courseid;
                this.ruleForm.cname = row.cname;
                this.ruleForm.ctime = '1';
                this.showdiv = 1;
            },
            //开始点名
            startRoll() {
                this.dialogVisible = false;
                let param = {
                    courseid: this.courseid,
                    rocalltype: this.ruleForm.ctime,
                    coursename: this.ruleForm.cname,
                    rocalldetail: this.rolltype[this.ruleForm.ctime - 1].rtdescription
                };

                switch (this.ruleForm.ctime) {
                    case "1":
                        this.$router.push({
                            name: 'RocallUseNormal',
                            params: param
                        });
                        return;
                    case "2":
                        this.$router.push({
                            name: 'RocallUseDefaultRate',
                            params: param
                        });
                        return;
                    case "3"://人脸识别点名
                        this.$router.push({
                            name: 'RocallUseFaceReco',
                            params: param
                        });
                        return;
                    case "4":
                        this.$router.push({
                            name: 'RocallUseVoice',
                            params: param
                        });
                        return;

                }

            }
        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 20px;

    }

    .el-col {
        border-radius: 4px;
    }


    .container {
        max-width: 500px;
        margin: 0 auto;
    }
</style>
