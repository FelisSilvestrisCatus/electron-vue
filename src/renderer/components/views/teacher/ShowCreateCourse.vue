<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                    该班级的课程
                </span>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="课程号"
                            prop="courseid">
                    </el-table-column>
                    <el-table-column
                            label="课程名"
                            prop="cname">
                    </el-table-column>
                    <el-table-column
                            label="课程时间"
                            prop="cday"
                            :formatter="courseTime">
                    </el-table-column>
                    <el-table-column
                            label="课程状态"
                            prop="state"
                            :formatter="courseState">
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
                                    @click="changCourse(scope.$index, scope.row)">编辑课程信息
                            </el-button>

                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="changeCourseState(scope.$index, scope.row)">更改课程状态
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="创建班级"/>
                    创建课程
                </span>

                <el-form :inline="true" :model="formInline" class="demo-form-inline">

                    <el-form-item>
                        <label>点击按钮 跳转到班级列表</label>>
                        <el-button type="primary" @click="createCourse()">创建课程</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
               >
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程名称" prop="cname">
                    <el-input v-model="ruleForm.cname"></el-input>
                </el-form-item>
                <el-form-item label="课程安排" prop="ctime">
                    <el-select v-model="ruleForm.ctime" placeholder="请选择上课时间">
                        <el-option label="周一" value="1"></el-option>
                        <el-option label="周二" value="2"></el-option>
                        <el-option label="周三" value="3"></el-option>
                        <el-option label="周四" value="4"></el-option>
                        <el-option label="周五" value="5"></el-option>
                        <el-option label="周六" value="6"></el-option>
                        <el-option label="周日" value="7"></el-option>
                    </el-select>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateCourse">确 定</el-button>
  </span>
        </el-dialog>

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

                dialogVisible: false,
                ruleForm: {
                    cname: '',
                    ctime: ''

                },
                cid: '',
                courseid: ''
            }
        },

        created() {
            this.cid = this.$route.params.cid
            this.getAllCourseByCid();
        },
        methods: {

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
