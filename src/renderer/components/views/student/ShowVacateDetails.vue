<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>请假详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                                <el-form-item label="请假班级">
                                    <el-input v-model="vacate.cname" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="任课老师">
                                    <el-input v-model="vacate.uname" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假类型">
                                    <el-input v-model="vacate.vtype" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="请假原因">
                                    <el-input v-model="vacate.vname"></el-input>
                                </el-form-item>
                                <el-form-item label="请假时间">
                                    <el-date-picker
                                            v-model="vacate.vtime"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            value-format="yyyy-MM-dd HH:mm"
                                            format="yyyy-MM-dd HH:mm"
                                            align="left"
                                            :picker-options="pickerOptions">
                                    </el-date-picker>
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
                                    <el-button type="primary" @click="submitInfo" :disabled="vacate.isDisable">确认修改
                                    </el-button>
                                    <el-button type="danger" @click="cancelbtn">取消
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
        name: "showVacateDetails",
        data() {
            return {
                vid: '',
                vacate: {
                    cname: '',
                    vtype: '',
                    vname: '',
                    vtime: [],
                    uname: '',
                    state: '',
                    stateType: '',
                    isDisable: true,
                },
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
                //添加附件
                fileList: [],
                param: new FormData(),
                //附件列表
                vfiles: [],
                vfilesbtn: false,
                vfilesmsg: '打包下载附件',
                vfilesbtntype: 'primary',
            };
        },
        watch: {
            '$route'(to, from) {
                //监听路由变化
                this.vid = this.$route.params.vid;
                this.getDetails();
                this.getVacateFiles();
            }
        },
        created() {
            if (this.$route.params.vid == null) {
                this.$router.push('/myVacate');
            } else {
                this.vid = this.$route.params.vid;
                this.getDetails();
                this.getVacateFiles();
            }
        },
        methods: {
            cancelbtn() {
                this.$router.push('/myVacate');
            },
            submitInfo() {
                let havafile = this.fileList.length >= 1;
                this.$axios({
                    method: 'POST',
                    url: '/vacate/alterVacate',
                    data: {
                        vid: this.vid,
                        vreason: this.vacate.vname,
                        vdatetimeBegin: this.vacate.vtime[0],
                        vdatetimeEnd: this.vacate.vtime[1],
                    },
                }).then(response => {
                    var resdata = response.data;
                    if (resdata.state === "200" && havafile) {
                        this.$refs.upload.submit();
                        this.uploadFiles(resdata.vid);
                    } else if (resdata.state === "200") {
                        this.$router.push('/myVacate');
                    } else {
                        this.$alert(resdata.msg, '操作结果', {
                            confirmButtonText: '确定',
                            center: true,
                        });
                    }
                });
            },
            getDetails() {
                if (this.vid == null) {
                    this.vid = this.$route.params.vid;
                }
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getDetails',
                    data: {
                        vid: this.vid,
                    }
                }).then(response => {
                    let datajson = JSON.parse(response.data.data);
                    this.vacate.cname = datajson.cname;
                    this.vacate.vname = datajson.vname;
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
                            this.vacate.state = "请假申请已发出";
                            this.vacate.stateType = "info";
                            break;
                        case 1:
                            this.vacate.state = "请假未被批准";
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
                        vid: this.vid,
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
                        vid: this.vid,
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
            uploadFiles() {
                let that = this;

                //此处使用原生js，避免拦截器影响multipart/form-data
                let url = this.$axios.defaults.baseURL + "/vacate/createVacateFile";
                let data = this.param;
                //附加表单id
                data.append('id', that.vid);

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let resdata = JSON.parse(xhr.responseText);
                        that.$alert(resdata.msg, '操作结果', {
                            confirmButtonText: '确定',
                            center: true,
                        });
                        that.$router.replace('/myVacate');
                    }
                };

                xhr.open('POST', url);

                xhr.setRequestHeader("Authorization", that.$store.state.token);
                xhr.send(data)
            },
        }
    }
</script>


<style scoped>
    .svg-icon {
        width: 40px;
        height: 40px;
    }
</style>
