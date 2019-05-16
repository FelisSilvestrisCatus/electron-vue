<template>
    <div>
        <el-container class="container">
            <el-aside width="700px">
                <el-row>
                    <el-container>
                        <div class="form-box">
                            <el-alert
                                    :title="vacate.state"
                                    :type="vacate.stateType"
                                    :closable="false"
                                    center
                                    show-icon>
                            </el-alert>
                            <br>
                            <el-form label-width="80px">
                                <el-form-item label="学生姓名">
                                    <el-input v-model="vacate.uname" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假班级">
                                    <el-input v-model="vacate.classname" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假课程">
                                    <el-input v-model="vacate.coursename" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假类型">
                                    <el-input v-model="vacate.vtype" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假原因">
                                    <el-input v-model="vacate.vname" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假时间">
                                    <el-date-picker
                                            v-model="vacate.vtime"
                                            :disabled="true"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            value-format="yyyy-MM-dd HH:mm"
                                            format="yyyy-MM-dd HH:mm"
                                            align="left"
                                    >
                                    </el-date-picker>
                                </el-form-item>


                                <el-form-item label="审批备注">
                                    <el-input v-model="vacate.remark"
                                              :disabled="vacate.isDisable"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :disabled="vacate.isDisable"
                                               @click="vapply(2)">同意该申请
                                    </el-button>
                                    <el-button type="danger" :disabled="vacate.isDisable"
                                               @click="vapply(1)">拒绝该申请
                                    </el-button>
                                </el-form-item>
                            </el-form>


                        </div>
                    </el-container>
                </el-row>
            </el-aside>
            <el-main>
                <el-row>
                    <el-col :span="6" :offset="8">
                        <el-button :disabled="vfilesbtn" :type="vfilesbtntype" round @click="getFiles">{{vfilesmsg}}
                        </el-button>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="20" v-for="vfile in vfiles" :key="vfile.vfid">
                        <el-card :body-style="{ padding: '5px' }">
                            <el-row style="padding: 14px;">
                                <el-col :span="2">
                                    <svg-icon :icon-class="vfile.filetype"/>
                                </el-col>
                                <el-col :span="18">
                                    <span>{{vfile.filename}}</span>
                                </el-col>
                                <div style="text-align: right">
                                    <el-button type="primary" class="button"
                                               @click="getFile(vfile.vfid,vfile.filename)">下载
                                    </el-button>
                                </div>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: "ShowDetailVacate",
        data() {
            return {
                vacate: {
                    vid: '',
                    classname: '',
                    coursename: '',
                    vtype: '',
                    vname: '',
                    vtime: [],
                    state: '',
                    stateType: '',
                    remark: '',
                    isDisable: '',
                },
                vfiles: [],
                vfilesbtn: false,
                vfilesmsg: '打包下载附件',
                vfilesbtntype: 'primary',
            };
        },
        watch: {
            '$route'(to, from) {
                //监听路由变化
                if (this.$route.params.vid == null) {
                    this.$router.push('/vacateManagement');
                } else {
                    this.getDetails();
                    this.getVacateFiles();
                }
            }
        },
        created() {
            this.getDetails();
            this.getVacateFiles();

        },
        methods: {
            vapply(bstate) {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/auditVacate',
                    data: {
                        vid: this.$route.params.vid,
                        state: bstate,
                        remark: this.vacate.remark,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                    if (resdata.state === "200") {
                        this.$router.push('/vacateManagement');
                    }
                })
            },
            getDetails() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getDetailsByTeacher',
                    data: {
                        vid: this.$route.params.vid,
                    }
                }).then(response => {
                    let datajson = JSON.parse(response.data.data);
                    this.vacate.classname = datajson.classname;
                    this.vacate.coursename = datajson.coursename;
                    this.vacate.vname = datajson.vname;
                    this.vacate.remark = datajson.remark;
                    this.vacate.uname = datajson.uname;
                    this.vacate.state = datajson.state + '';
                    this.vacate.vtime = datajson.vtime.split("至");
                    this.vacate.isDisable = this.vacate.state !== '0';
                    switch (datajson.vtype) {
                        case 0:
                            this.vacate.vtype = "事假";
                            break;
                        case 1:
                            this.vacate.vtype = "病假";
                            break;
                        case 2:
                            this.vacate.vtype = "其他";
                            break;
                    }
                    switch (datajson.state) {
                        case -1:
                            this.vacate.state = "请假已取消";
                            this.vacate.stateType = "warning";
                            break;
                        case 0:
                            this.vacate.state = "等待审批";
                            this.vacate.stateType = "info";
                            break;
                        case 1:
                            this.vacate.state = "请假已被拒绝";
                            this.vacate.stateType = "error";
                            break;
                        case 2:
                            this.vacate.state = "请假已被批准";
                            this.vacate.stateType = "success";
                            break;
                    }

                })
            },
            //获取附件信息
            getVacateFiles() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getVacateFile',
                    data: {
                        vid: this.$route.params.vid,
                    }
                }).then(response => {
                    //是否有附件
                    if (response.data.state === '400') {
                        this.vfilesbtn = true;
                        this.vfilesmsg = "无附件";
                        this.vfilesbtntype = 'info';
                    } else {
                        this.vfiles = JSON.parse(response.data.data);
                    }
                })
            },
            //获取单个附件
            getFile(vfid, filename) {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getFile',
                    data: {
                        vfid: vfid,
                    },
                    responseType: 'blob'
                }).then(response => {
                    const blob = response.data;
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                        const a = document.createElement('a');
                        a.download = filename;
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                })
            },
            //获取打包的附件
            getFiles() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getFiles',
                    data: {
                        vid: this.$route.params.vid,
                    },
                    responseType: 'blob'
                }).then(response => {
                    const blob = response.data;
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                        const a = document.createElement('a');
                        a.download = this.vfiles[0].filename + "等文件.zip";
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .svg-icon {
        width: 40px;
        height: 40px;
    }
</style>
