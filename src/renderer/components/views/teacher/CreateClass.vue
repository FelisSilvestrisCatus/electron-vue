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
                                    @click="handleDelete(scope.$index, scope.row)">编辑班级
                            </el-button>

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="addCourse(scope.$index, scope.row)">添加课程
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="创建班级"/>
                    创建班级
                </span>

                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="班级名">
                        <el-input v-model="formInline.name" placeholder="新建班级名字"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="createClass()">创建新班级</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
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
    <el-button type="primary" @click="updateAddCourse">确 定</el-button>
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
                cid: ''
            }
        },

        created() {

            this.getAllClass();
        },
        methods: {
            updateAddCourse() {
                this.$axios({
                    method: 'POST',
                    url: '/course/createCourse',
                    data: {
                        cname: this.ruleForm.cname,
                        ctime: this.ruleForm.ctime,
                        cid: this.cid
                    }
                }).then(response => {
                    var resdata = response.data;

                    if (resdata.state == 200) {

                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.dialogVisible = false;
                        this.getAllClass();

                    } else {
                        this.$message({
                            type: 'info',
                            message: '添加失败'
                        });

                    }
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
            auditClass(cid, cname) {
                this.$axios({
                    method: 'POST',
                    url: '/class/changeClass',
                    data: {
                        cid: cid,
                        name: cname
                    }
                }).then(response => {
                    var resdata = response.data;

                    if (resdata.state == '200') {

                        return true;

                    } else {
                        return false;
                    }

                })
            },

            createClass() {

                this.$axios({
                    method: 'POST',
                    url: '/class/createClass',
                    data: {
                        name: this.formInline.name,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定', callback: function () {
                            location.reload();

                        }

                    });


                })
            },

            handleDelete(index, row) {

                this.$prompt('请输入班级新名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{6,10}$/,

                    inputErrorMessage: '格式不正确（汉字 字母 数字）6--10位'
                }).then(({value}) => {
                    this.$axios({
                        method: 'POST',
                        url: '/class/changeClass',
                        data: {
                            cid: row.cid,
                            name: value
                        }
                    }).then(response => {
                        var resdata = response.data;

                        if (resdata.state == '200') {

                            this.$message({
                                type: 'success',
                                message: '修改后的名字是: ' + value
                            });
                            this.getAllClass();

                        } else {
                            this.$message({
                                type: 'info',
                                message: '修改名字失败'
                            });

                        }

                    })


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //添加课程
            addCourse(index, row) {

                this.dialogVisible = true;
                this.cid = row.cid;


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
