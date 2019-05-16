<template>
    <div class="table">
        <div class="container">
            <el-row :gutter="12" style="text-align: right;">
                <el-col>
                    <el-select
                            v-model="course"
                            filterable
                            placeholder="请选择课程"
                            no-data-text="您还没有课程">
                        <el-option
                                v-for="item in myCourse"
                                :key="item.courseid"
                                :label="item.cname"
                                :value="item.courseid">
                        </el-option>
                    </el-select>
                    <el-date-picker
                            style="margin-right: 10px"
                            v-model="selectdatetime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            align="left"
                            :picker-options="pickerOptions"
                            :default-time="['08:00:00', '21:30:00']">
                    </el-date-picker>
                    <el-button type="primary" @click="getData">搜索符合条件的记录</el-button>
                    <el-button type="danger" @click="resetSearchTime">清空条件</el-button>
                </el-col>
            </el-row>

            <el-table
                    :data="tableData.filter(data => !search || data.coursename.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="班级名"
                        prop="cname">
                </el-table-column>
                <el-table-column
                        label="课程名"
                        prop="coursename">
                </el-table-column>
                <el-table-column
                        label="任课老师"
                        prop="uname">
                </el-table-column>
                <el-table-column
                        label="点名时间"
                        :formatter="rtimedirection"
                        prop="rtime">
                </el-table-column>
                <el-table-column
                        label="出勤状态"
                        :formatter="statedirection"
                        prop="state">
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        :current-page="currentPage"
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="datatotal"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MyVacateDetails',
        data() {
            return {
                //筛选日期
                selectdatetime: [],
                //筛选课程
                course: '',
                //当前页码
                currentPage: 1,
                //搜索内容
                search: '',
                //表格数据
                tableData: [],
                //总记录数
                datatotal: 0,
                //课程数据
                myCourse: [],
                //时间选择器快捷选项
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            }
        },
        created() {
            this.getData();
            this.getMyCourse();
        },
        methods: {
            //课程数据
            getMyCourse() {
                this.$axios({
                    method: 'POST',
                    url: '/course/getMyCourse',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    this.myCourse = JSON.parse(resdata.data);
                })
            },
            //加载数据
            getData() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcalldetails/myAttendance',
                    data: {
                        currentPage: this.currentPage,
                        datetimeBegin: this.selectdatetime[0],
                        datetimeEnd: this.selectdatetime[1],
                        course: this.course,
                    }
                }).then(response => {
                    this.tableData = JSON.parse(response.data.data);
                    this.datatotal = JSON.parse(response.data.total);
                })
            },
            //加载当前页的数据
            handleCurrentChange(nowpage) {
                this.currentPage = nowpage;
                this.getData();
            },
            //更改出勤的显示
            statedirection(row) {
                switch (row.state) {
                    case 0:
                        return "已出勤";
                    case 1:
                        return "缺勤";
                }
            },
            //更改考勤时间的格式
            rtimedirection(row) {
                let timestr = row.rtime;
                timestr = timestr.replace(/T/g, '   ');
                return timestr;
            },
            resetSearchTime() {
                this.selectdatetime = [];
                this.getData();
            }
        }
    }

</script>

<style scoped>

    .table {
        width: 100%;
        font-size: 14px;
    }

</style>
