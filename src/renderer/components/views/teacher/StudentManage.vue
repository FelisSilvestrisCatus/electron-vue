<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级学生列表"/>
                    已加入的学生
                </span>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="学生id"
                            prop="uid">
                    </el-table-column>
                    <el-table-column
                            label="学生名字"
                            prop="uname">
                    </el-table-column>
                    <el-table-column
                            label="学生手机号"
                            prop="phone"
                    >
                    </el-table-column>
                    <el-table-column
                            label="学生状态"
                            prop="flag"
                            :formatter="studentselfstate"
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
                                    type="danger"
                                    @click="deleteClassStudent(scope.$index, scope.row)">删除
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="创建班级"/>
                    待审核的学生
                </span>

                <el-table
                        :data="tableData1"
                        style="width: 100%">

                    <el-table-column
                            label="学生id"
                            prop="uid">
                    </el-table-column>
                    <el-table-column
                            label="学生名字"
                            prop="uname">
                    </el-table-column>
                    <el-table-column
                            label="学生手机号"
                            prop="phone"
                    >
                    </el-table-column>
                    <el-table-column
                            label="学生状态"
                            prop="flag"
                            :formatter="studentselfstate"
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
                                    @click="apply(scope.$index, scope.row)">同意申请
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="refuse(scope.$index, scope.row)">拒绝申请
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
                cid: '',
                courseid: '',
                uid: ''
            }
        },

        created() {
            this.cid = this.$route.params.cid
            this.getjoinedStudent();
            this.getnotjoinedStudent();
        },
        methods: {
            //同意申请
            apply(index, row) {


                this.$axios({
                    method: 'POST',
                    url: '/classstudents/agreeApply',
                    data: {
                        cid: this.cid,
                        uid: row.uid

                    }
                }).then(response => {
                    var resdata = response.data;

                    if (resdata.state == 200) {

                        this.$message({
                            type: 'success',
                            message: '该同学成功进入班级'
                        });
                        this.getjoinedStudent();
                        this.getnotjoinedStudent();
                    } else {
                        this.$message({
                            type: 'info',
                            message: '操作失败'
                        });

                    }


                })


            },
            refuse(index, row) {
                this.deleteClassStudent(index, row.uid)
            },
            deleteClassStudent(index, row) {
                this.uid = row.uid;
                this.$confirm('此操作将拒绝用户加入, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: 'POST',
                        url: '/classstudents/deleteStudent',
                        data: {
                            cid: this.cid,
                            uid: this.uid

                        }
                    }).then(response => {
                        var resdata = response.data;

                        if (resdata.state == 200) {

                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                            this.getjoinedStudent();
                            this.getnotjoinedStudent();
                        } else {
                            this.$message({
                                type: 'info',
                                message: '修改失败'
                            });

                        }


                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            studentselfstate(row) {
                switch (row.flag) {

                    case 0:
                        return "账号正常";
                    case 1:
                        return "账号被冻结";

                }
            },
            getjoinedStudent() {
                this.$axios({
                    method: 'POST',
                    url: '/classstudents/getStudents',
                    data: {
                        cid: this.cid,
                        state: 1//已加入的

                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })


            },
            getnotjoinedStudent() {

                this.$axios({
                    method: 'POST',
                    url: '/classstudents/getStudents',
                    data: {
                        cid: this.cid,
                        state: 0//待审核

                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData1 = jsondata;
                })


            },

            createCourse() {
                this.$router.push('/createClass');

            },
            updateCourse() {
                this.$axios({
                    method: 'POST',
                    url: '/course/changeCourse',
                    data: {
                        cname: this.ruleForm.cname,
                        ctime: this.ruleForm.ctime,
                        courseid: this.courseid
                    }
                }).then(response => {
                    var resdata = response.data;

                    if (resdata.state == 200) {

                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.dialogVisible = false;
                        this.getAllCourseByCid();


                    } else {
                        this.$message({
                            type: 'info',
                            message: '修改失败'
                        });

                    }
                })

            },
            courseTime(row) {
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
            courseState(row) {
                switch (row.state) {

                    case 0:
                        return "正常";
                    case 1:
                        return "已经结课";

                }
            },

            getAllCourseByCid() {
                this.$axios({
                    method: 'POST',
                    url: '/course/getCourseByCid',
                    data: {
                        cid: this.cid

                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })
            },
            changeCourseState(index, row) {

                this.$axios({
                    method: 'POST',
                    url: '/course/changeCourseState',
                    data: {
                        courseid: row.courseid,
                        state: (row.state + 1) % 2
                    }
                }).then(response => {
                    var resdata = response.data;


                    if (resdata.state == 200) {

                        this.$message({
                            type: 'success',
                            message: '修改状态成功'
                        });

                        this.getAllCourseByCid();


                    } else {
                        this.$message({
                            type: 'info',
                            message: '修改状态失败'
                        });

                    }

                })
            },


            changCourse(index, row) {
                this.dialogVisible = true;

                this.ruleForm.cname = row.cname;
                this.ruleForm.ctime = row.cday + "";
                this.courseid = row.courseid;

                // this.$prompt('请输入班级新名称', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     inputPattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{6,10}$/,
                //
                //     inputErrorMessage: '格式不正确（汉字 字母 数字）6--10位'
                // }).then(({value}) => {
                //     this.$axios({
                //         method: 'POST',
                //         url: '/class/changeClass',
                //         data: {
                //             cid: row.cid,
                //             name: value
                //         }
                //     }).then(response => {
                //         var resdata = response.data;
                //
                //         if (resdata.state == '200') {
                //
                //             this.$message({
                //                 type: 'success',
                //                 message: '修改后的名字是: ' + value
                //             });
                //             this.getAllClass();
                //
                //         } else {
                //             this.$message({
                //                 type: 'info',
                //                 message: '修改名字失败'
                //             });
                //
                //         }
                //
                //     })
                //
                //
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '取消输入'
                //     });
                // });
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
