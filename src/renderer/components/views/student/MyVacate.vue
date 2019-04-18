<template>
    <div class="app">
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的请假"/>
                    我的请假记录
                </span>
        <el-table
                :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">

            <el-table-column
                    label="课程"
                    prop="cname">
            </el-table-column>
            <el-table-column
                    label="请假原因"
                    prop="vname">
            </el-table-column>
            <el-table-column
                    label="请假类型"
                    prop="vtype"
                    :formatter="vtypedirection"
            >
            </el-table-column>
            <el-table-column
                    label="请假时间范围"
                    prop="vtime">
            </el-table-column>
            <el-table-column
                    label="课程老师"
                    prop="uname">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="state"
                    :formatter="statedirection"
            >
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入课程名搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="showDetails(scope.$index, scope.row)">查看详情
                    </el-button>
                    <el-button
                            v-if="scope.row.state!==-1"
                            size="mini"
                            type="danger"
                            @click="cancel(scope.$index, scope.row)">取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
            }
        },
        created() {
            this.getMyVacate();
        },
        methods: {
            getMyVacate() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/myVacate',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.tableData = jsondata;
                })
            },
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
            statedirection(row) {
                switch (row.state) {
                    case -1:
                        return "已取消";
                    case 0:
                        return "已申请";
                    case 1:
                        return "未批准";
                    case 2:
                        return "已批准"
                }
            },
            cancel(index, row) {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/cancelVacate',
                    data: {
                        vid: row.vid,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                    this.getMyVacate();
                })
            },
            showDetails(index, row) {
                this.$router.push({path: '/showVacateDetails', query: {vid: row.vid}});
            }
        },
    }
</script>

<style scoped>
    .app {
        background-color: white
    }

    .reason {
        width: 50%;
    }
</style>
