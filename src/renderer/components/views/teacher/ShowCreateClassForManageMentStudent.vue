<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                    我创建的班级
                </span>
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
                            label="班级成员数量（含待审核）"
                            prop="stunum"
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
                                    @click="handleDelete(scope.$index, scope.row)">查看学生
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

            this.getClassStudent();
        },
        methods: {
            getClassStudent() {
                this.$axios({
                    method: 'POST',
                    url: '/class/getClassStudent',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })
            },


            handleDelete(index, row) {
                const that = this;
                if(row.stunum>0){
                    //有学生时才会跳转

                    that.$router.push({name: 'showStudentById', params: {cid: row.cid}})
                }else{
                    this.$message({
                        type: 'info',
                        message: '该班级暂无学生'
                    });
                }


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
