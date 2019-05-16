<template>
    <div>

        <el-row :gutter="16">
            <el-card :body-style="{ padding: '5px' }">
                <el-row style="padding: 14px;">

                    <el-col :span="6" :offset="6">
                        <svg-icon icon-class="天气"/>
                        <span>天气</span>

                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class="周"/>
                        <span>{{weekday}}</span>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class="日期"/>
                        <span>{{date}}</span>
                    </el-col>

                </el-row>
                <el-row :gutter="10">


                    <el-col :span="2" :offset="2">
                        <svg-icon v-bind:icon-class="weather"/>
                        <span>{{weathername}}</span>

                    </el-col>
                    <el-col :span="2">
                        <svg-icon icon-class="周"/>
                        <span>{{temperature+"℃"}}</span>
                    </el-col>
                    <el-col :span="2">
                        <svg-icon icon-class="日期"/>
                        <span>{{humidity+"%"}}</span>

                    </el-col>
                    <el-col :span="2">
                        <svg-icon icon-class="日期"/>
                        <span>{{wind}}</span>
                    </el-col>


                </el-row>
            </el-card>
        </el-row>


    </div>
</template>

<script>
    export default {
        name: "WeatherAndWeekDayAndDate",
        data() {
            return {

                weekday: '',
                date: '',//日期
                weather: '',//图标
                weathername: '',//天气名称
                wind: '',//风向及大小
                temperature: '',//温度
                humidity: '',//湿度
                loginaddress: '',
                value: new Date(),


            }
        },
        created() {
            this.getWeather();
            this.getDay();
        },
        methods: {

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


            }
        }
    }
</script>

<style scoped>

</style>
