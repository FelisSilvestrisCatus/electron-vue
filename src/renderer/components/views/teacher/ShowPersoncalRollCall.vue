<template>
    <div>
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>
        </el-row>
        <el-row>
            <el-row>
                拖动滑条，按所需要出勤率 筛选未达标的学生
            </el-row>
            <el-row>
                <el-slider
                        v-model="value"
                        show-input
                        @change="getAttendRateLessThanRate">
                </el-slider>
            </el-row>
        </el-row>
        <el-row>
            <el-table
                    :data="tableData.filter(data => !search || data.uname.toLowerCase().includes(search.toLowerCase()))"
                    border
                    style="width: 100%">

                <el-table-column
                        label="学生姓名"
                        prop="uname">
                </el-table-column>
                <el-table-column
                        label="手机号"
                        prop="phone"
                >
                </el-table-column>
                <el-table-column
                        label="出勤次数"
                        prop="attnum"
                >

                </el-table-column>
                <el-table-column
                        label="缺勤次数(不含请假"
                        prop="notattnum"
                >

                </el-table-column>
                <el-table-column
                        label="出勤率"
                        prop="attrate"

                >
                </el-table-column>

                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>

                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';

    export default {
        components: {
            WeatherAndWeekDayAndDate
        },
        name: "ShowRollCallHistory",
        data() {
            return {
                search: '',
                courseid: '',
                tableData: [],
                value: 60
            }
        },
        created() {
            this.courseid = this.$route.params.courseid;
            this.getAttendRateLessThanRate();

        },
        methods: {
            getAttendRateLessThanRate() {
                console.log(this.value);
                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getStudentRollCallRate',
                    data: {
                        courseid: this.courseid,
                        rate: this.value

                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })

            }

        }
    }
</script>

<style scoped>

</style>
