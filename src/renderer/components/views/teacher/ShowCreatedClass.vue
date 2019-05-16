<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="班级号"
                            prop="cid">
                    </el-table-column>
                    <el-table-column
                            label="班级名"
                            prop="cname">
                    </el-table-column>
                    <el-table-column
                            label="班级状态"
                            prop="cstate"
                            :formatter="statedirection">
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
                                    @click="showCourse(scope.$index, scope.row)">查看课程
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
                search: '',

                formInline: {
                    name: '',
                    region: ''
                },

                cid: ''
            }
        },
        created() {
            this.getAllClass();
        },
        methods: {
            getAllClass() {
                this.$axios({
                    method: 'POST',
                    url: '/class/getTeacherClass',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })
            },
            statedirection(row) {
                switch (row.cstate) {

                    case 0:
                        return "该班级未有课程安排";
                    case 1:
                        return "该班级存在课程";
                    case 2:
                        return "该班级已被冻结"
                }
            },
            showCourse(index, row) {
                const that = this;
                that.$router.push({name: 'showCourse', params: {cid: row.cid}})
            }

        }
    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
