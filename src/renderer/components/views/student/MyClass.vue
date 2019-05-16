<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                    我加入的班级
                </span>
                <el-table
                        :data="myClassTableData.filter(data => !myClassSearch || data.cname.toLowerCase().includes(myClassSearch.toLowerCase()))"
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
                            label="任课老师"
                            prop="uname">
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
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="加入班级"/>
                    可加入的班级
                </span>
                <el-table
                        :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
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
                            label="任课老师"
                            prop="uname">
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
                                    @click="joinClassButton(scope.$index, scope.row)">加入
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "MyClass",
        data() {
            return {
                tableData: [],
                search: '',
                myClassTableData: [],
                myClassSearch: ''
            }
        },
        created() {
            this.getJoinedClass();
            this.getAllClass();
        },
        methods: {
            getJoinedClass() {
                this.$axios({
                    method: 'POST',
                    url: '/classstudents/getJoinedClass',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.myClassTableData = jsondata;
                })
            },
            getAllClass() {
                this.$axios({
                    method: 'POST',
                    url: '/class/getAllClass',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.tableData = jsondata;
                })
            },
            joinClassButton(index, row) {
                this.$axios({
                    method: 'POST',
                    url: '/classstudents/joinClass',
                    data: {
                        cid: row.cid,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                        center: true,
                    });
                });
                this.getJoinedClass();
                this.getAllClass();
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
