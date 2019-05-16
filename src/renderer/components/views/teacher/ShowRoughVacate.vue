<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                   等待审批的请假申请
                </span>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="学生姓名"
                            prop="uname">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假课程名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假类型"
                            prop="vtype"
                            :formatter="vtypedirection"
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
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                已拒绝的请假申请
                </span>
                <el-table
                        :data="tableData1"
                        style="width: 100%">

                    <el-table-column
                            label="学生姓名"
                            prop="uname">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假课程名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假类型"
                            prop="vtype"
                            :formatter="vtypedirection"
                    >
                    </el-table-column>

                    <el-table-column
                            label="拒绝原因"
                            prop="remark"
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
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    已批准的请假申请
                </span>
                <el-table
                        :data="tableData2"
                        style="width: 100%">

                    <el-table-column
                            label="学生姓名"
                            prop="uname">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假课程名"
                            prop="cname">
                    </el-table-column>

                    <el-table-column
                            label="请假类型"
                            prop="vtype"
                            :formatter="vtypedirection"
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
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 对话框-->

</template>

<script>
    export default {

        data() {
            return {
                tableData: [],
                tableData1: [],
                tableData2: [],
                search: '',

                formInline: {
                    name: '',
                    region: ''
                },

                dialogVisible: false,
                ruleForm: {
                    cname: '',
                    ctime: ''

                },
                cid: ''
            }
        },

        created() {
            this.getAllVacateStateIsZero();
            this.getAllVacateStateIsOne();
            this.getAllVacateStateIsTwo();
        },
        methods: {
            vtypedirection(row) {
                switch (row.vtype) {
                    case 0:
                        return "事假";
                    case 1:
                        return "病假";
                    case 2:
                        return "其他"
                }
            },

            //请假申请
            getAllVacateStateIsZero() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state: 0
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData = eval('(' + resdata.data + ')');
                })
            },
            //已经拒绝的
            getAllVacateStateIsOne() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state: 1
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData1 = eval('(' + resdata.data + ')');
                })
            },
            //申请通过的
            getAllVacateStateIsTwo() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state: 2
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData2 = eval('(' + resdata.data + ')');
                })
            },
            //路由跳转
            showDetail(index, row) {
                this.$router.push({name: 'showDetailVacate', params: {vid: row.vid}})
            },
        },

    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
