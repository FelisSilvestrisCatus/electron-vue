<template>
    <div style="background-color: white">
                      <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的课程"/>
                    我的课程
                </span>
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
                    prop="cday">
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
</template>

<script>
    export default {
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
