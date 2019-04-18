<template>
    <div class="app">
        <el-form :model="ruleForm" :rules="formRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="请假类型" required>
                <el-select v-model="ruleForm.vtype" placeholder="请选择请假类型">
                    <el-option label="事假" value="0"></el-option>
                    <el-option label="病假" value="1"></el-option>
                    <el-option label="其他" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请假时间" prop="vdatetime">
                <el-date-picker
                        v-model="ruleForm.vdatetime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        align="left"
                        :picker-options="pickerOptions"
                        :default-time="['08:00:00', '21:30:00']">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="请假课程" prop="vcourse">
                <el-select
                        v-model="ruleForm.vcourse"
                        filterable
                        placeholder="请选择要请假的课程"
                        no-data-text="您还没有课程">
                    <el-option
                            v-for="item in myCourse"
                            :key="item.cname"
                            :label="item.cname"
                            :value="item.courseid">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="请假原因" class="reason" prop="vreason">
                <el-input v-model="ruleForm.vreason"
                          type="textarea"
                          autosize
                          required
                >
                </el-input>
            </el-form-item>

            <el-form-item label="附件上传">
                <el-upload
                        ref="upload"
                        class="upload"
                        drag
                        action="Need but not use"
                        :on-change="OnChange"
                        :http-request="uploadFile"
                        :before-upload="beforeUpload"
                        :auto-upload="false"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交请假</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "MyVacate",
        data() {
            return {
                //时间选择器快捷选项
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                ruleForm: {
                    vreason: '',
                    vcourse: [],
                    vdatetime: new Date(),
                    vtype: '1',
                },
                formRules: {
                    vreason: [
                        {required: true, message: '请输入请假原因', trigger: 'blur'}
                    ],
                    vcourse: [
                        {required: true, message: '请选择课程', trigger: 'blur'}
                    ]
                },
                //已加入的班级
                myCourse: '',
                //附件列表
                fileList: [],
                param: new FormData(),
            };
        },
        created() {
            this.getJoinedClass();
        },
        methods: {
            getJoinedClass() {
                this.$axios({
                    method: 'POST',
                    url: '/course/getMyCourse',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    // var jsondata = eval('(' + resdata.data + ')');
                    var jsondata = JSON.parse(resdata.data);
                    console.log(jsondata);
                    this.myCourse = jsondata;
                })
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //获取附件列表
            OnChange(file, fileList) {
                this.fileList = fileList

            },
            //上传附件前的检查
            beforeUpload(file) {
                if (null == file)
                    return true;
                if (file.size / 1024 / 1024 > 20) {
                    this.common.errorTip('上传附件大小不能超过 20MB!');
                    return false;
                }
                return true;
            },
            uploadFile(vfile) {
                this.param.append('files', vfile.file)
            },
            uploadFiles(vid) {
                let that = this;

                //此处使用原生js，避免拦截器影响multipart/form-data
                let url = this.$axios.defaults.baseURL + "/vacate/createVacateFile";
                let data = this.param;
                //附加表单id
                data.append('id', vid);

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let resdata = JSON.parse(xhr.responseText);
                        that.$alert(resdata.msg, '操作结果', {
                            confirmButtonText: '确定',
                        });
                        that.$router.push('/myVacate');
                    }
                };

                xhr.open('POST', url);

                xhr.setRequestHeader("Authorization", that.$store.state.token);
                xhr.send(data)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let havafile = this.fileList.length >= 1;
                        this.$axios({
                            method: 'POST',
                            url: '/vacate/createVacate',
                            data: {
                                vtype: this.ruleForm.vtype,
                                vreason: this.ruleForm.vreason,
                                vcourse: this.ruleForm.vcourse,
                                vdatetimeBegin: this.ruleForm.vdatetime[0],
                                vdatetimeEnd: this.ruleForm.vdatetime[1],
                                vhavefile: havafile
                            },
                        }).then(response => {
                            var resdata = response.data;
                            if (resdata.state === "200" && havafile) {
                                // this.uploadFiles();
                                this.$refs.upload.submit();
                                this.uploadFiles(resdata.vid);

                            } else if (resdata.state === "200") {
                                this.$router.push('/myVacate');
                            } else {
                                this.$alert(resdata.msg, '操作结果', {
                                    confirmButtonText: '确定',
                                });
                            }
                        });
                    } else {
                        this.$alert('请检查信息完整性', '', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                });
            },
        }
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
