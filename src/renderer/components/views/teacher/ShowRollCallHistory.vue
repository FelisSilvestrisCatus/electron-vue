<template>
    <div>
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>


        </el-row>
        <el-tabs tab-position="top" :stretch="true">

        </el-tabs>
        <el-row :gutter="16">
            <el-col :span="12">

                <el-row>
                    <el-row>
                        <el-col :span="7" :offset="7">
                            <el-button type="primary" @click="getLatestRollDetail(1)">最近一次</el-button>


                        </el-col>
                        <el-col :span="10">
                            <el-button type="success" @click="getLatestRollDetail(-1)">上次出勤</el-button>
                        </el-col>


                    </el-row>
                    <el-row>
                        <ve-pie :data="chartData"></ve-pie>
                    </el-row>
                </el-row>

            </el-col>
            <el-col :span="12">
                <el-row>
                    <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
                </el-row>

            </el-col>

        </el-row>

    </div>
</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';
    import VePie from 'v-charts/lib/pie.min'; //vcharts
    import VeLine from 'v-charts/lib/line.min'; //vcharts

    export default {
        components: {
            WeatherAndWeekDayAndDate,
            VePie,
            VeLine,
        },
        name: "ShowRollCallHistory",
        data() {
            this.chartSettings = {
                stack: {'用户': ['请假人数', '喊到人数', '逃课人数']},
                area: true
            }
            return {
                //折线图
                index: '',//查询的编号
                attentnum: '',//喊到的人
                courseid: '',
                vacatenum: '',//请假的人

                notattentnum: '',//逃课的人
                chartData1: {
                    columns: ['日期', '请假人数', '喊到人数', '逃课人数', '出勤比例'],
                    rows: [
                        {'日期': '1/1', '请假人数': 2222, '喊到人数': 1393, '逃课人数': 1093, '出勤比例': 0.32},
                        {'日期': '1/2', '请假人数': 2222, '喊到人数': 3530, '逃课人数': 3230, '出勤比例': 0.26},
                        {'日期': '1/3', '请假人数': 2222, '喊到人数': 2923, '逃课人数': 2623, '出勤比例': 0.76},
                        {'日期': '1/4', '请假人数': 2222, '喊到人数': 1723, '逃课人数': 1423, '出勤比例': 0.49},
                        {'日期': '1/5', '请假人数': 2222, '喊到人数': 3792, '逃课人数': 3492, '出勤比例': 0.323},
                        {'日期': '1/6', '请假人数': 2222, '喊到人数': 4593, '逃课人数': 4293, '出勤比例': 0.78},
                        {'日期': '1/6', '请假人数': 2222, '喊到人数': 4593, '逃课人数': 4293, '出勤比例': 0.78}
                    ]
                },


                chartData: {
                    columns: ['a', 'b'],
                    rows: [
                        {'a': '答到人数', 'b': 0},
                        {'a': '请假人数', 'b': 0},
                        {'a': '逃课人数', 'b': 0},

                    ]
                }
            }
        },
        created() {
            this.courseid = this.$route.params.courseid;
            this.getLatestRollDetail(1);
            this.getHistoryRollCall();
        },
        mounted() {
            this.getLatestRollDetail(1);
            this.getHistoryRollCall();
        },
        methods: {
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector)
                document.documentElement.scrollTop = anchor.offsetTop
            },
            getLatestRollDetail(index_) {
                if (index_ === 1) {
                    //获取最近一次该课程出勤情况
                    //获取没有来的人的数目

                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/getLastRollCallInfo',
                        data: {
                            courseid: this.courseid,
                            index: 1
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state === '200') {
                            this.$message({
                                type: 'success',
                                message: '获取最近一次点名记录成功'
                            });

                            let datajson = JSON.parse(resdata.data);
                            if (this.index === "1") {
                                this.index = Number(this.index) + 1 + "";
                            } else {
                                this.index = "1";
                            }

                            this.attentnum = resdata.data.attnum;

                            this.chartData.rows[0].b = datajson.attnum;
                            this.chartData.rows[1].b = datajson.vnum;
                            this.chartData.rows[2].b = datajson.notattnum;

                            console.log(resdata);
                            console.log(datajson);
                            console.log(this.chartData);

                            this.vacatenum = resdata.data.vnum;
                            this.notattentnum = resdata.data.notattnum;


                        } else {
                            this.$message.error('请稍后再试');
                        }

                    })
                } else {
                    console.log("想看" + this.index);
                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/getLastRollCallInfo',
                        data: {
                            courseid: this.courseid,
                            index: this.index
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '获取倒数第' + this.index + '次点名记录成功'
                            });


                            let datajson = JSON.parse(resdata.data);

                            this.index = Number(this.index) + 1 + "";
                            this.attentnum = resdata.data.attnum;

                            this.chartData.rows[0].b = datajson.attnum;
                            this.chartData.rows[1].b = datajson.vnum;
                            this.chartData.rows[2].b = datajson.notattnum;
                        } else {
                            this.$message.error('没有更多的点名记录了');
                        }

                    })

                }


            },
            getHistoryRollCall() {

                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getAllRollCallOneWeekHistory',
                    data: {
                        courseid: this.courseid,

                    }
                }).then(response => {
                    var resdata = response.data;
                    if (resdata.state === '200') {

                        let datajson = JSON.parse(resdata.data);
                        console.log(datajson[0]);
                        console.log(datajson.length + "条");
                        console.log(datajson);


                        if (7 > datajson.length) {
                            this.chartData1.rows.splice(datajson.length, 6)
                        } else {
                            datajson.splice(7, datajson.length - 1);

                        }
                        for (var a = 0; a < 7; a++) {
                            console.log("此时a" + a + "的值")
                            this.chartData1.rows[a].喊到人数 = datajson[6 - a].attnum;
                            console.log("喊道人数" + datajson[6 - a].attnum);
                            this.chartData1.rows[a].日期 = datajson[6 - a].retime;
                            console.log("日期" + datajson[6 - a].retime);
                            this.chartData1.rows[a].请假人数 = datajson[6 - a].vnum;
                            console.log("请假人数" + datajson[6 - a].vnum);
                            this.chartData1.rows[a].逃课人数 = datajson[6 - a].notattnum;
                            console.log("逃课人数" + datajson[6 - a].notattnum);
                            this.chartData1.rows[a].出勤比例 = (datajson[6 - a].attnum) / (datajson[6 - a].attnum
                                + datajson[6 - a].notattnum + datajson[6 - a].vnum);

                        }


                    } else {
                        this.$message.error('请稍后再试');
                    }

                })

            },
        }
    }
</script>

<style scoped>

</style>
