<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <svg-icon icon-class="我的课程"/>
                    我的课程
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="background-color: white">
                <el-table
                        :data="TableData.filter(data => !myCourseSearch || data.cname.toLowerCase().includes(myCourseSearch.toLowerCase()))"
                        style="width: 100%">

                    <el-table-column
                            label="班级名"
                            prop="classname">
                    </el-table-column>
                    <el-table-column
                            label="课程名"
                            prop="cname">
                    </el-table-column>
                    <el-table-column
                            label="任课老师"
                            prop="uname">
                    </el-table-column>
                    <el-table-column
                            label="星期"
                            prop="cday"
                            :formatter="cdaydirection">
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            :formatter="statedirection"
                            prop="state">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="myCourseSearch"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCourse",
        data() {
            return {
                TableData: [],
                myCourseSearch: ''
            }
        },
        created() {
            this.getMyCourse();
        },
        methods: {
            statedirection(row) {
                switch (row.state) {
                    case 0:
                        return "正常";
                    case 1:
                        return "已结课";
                }
            },
            cdaydirection(row) {
                switch (row.cday) {
                    case 1:
                        return "周一";
                    case 2:
                        return "周二";
                    case 3:
                        return "周三";
                    case 4:
                        return "周四";
                    case 5:
                        return "周五";
                    case 6:
                        return "周六";
                    case 7 :
                        return "周日";
                }
            },
            getMyCourse() {
                this.$axios({
                    method: 'POST',
                    url: '/course/getMyCourse',
                    data: {}
                }).then(response => {
                    let jsondata = JSON.parse(response.data.data);
                    this.TableData = jsondata;
                })
            }
        },
    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
