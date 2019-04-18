<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>请假详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
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

                    <el-form-item>
                        <el-button type="primary" @click="submitInfo" :disabled="vacate.isDisable">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: "MyVacate",
        data() {
            return {
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
            };
        },
        created() {
            this.getDetails();
        },
        methods: {
            submitInfo() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/alterVacate',
                    data: {
                        vid: this.$route.query.vid,
                        vreason: this.vacate.vname,
                        vdatetimeBegin: this.vacate.vtime[0],
                        vdatetimeEnd: this.vacate.vtime[1],
                    },
                }).then(response => {
                    var resdata = response.data;
                    if (resdata.state === "200") {
                        this.$router.push('/myVacate');
                    } else {
                        this.$alert(resdata.msg, '操作结果', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            },
            getDetails() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getDetails',
                    data: {
                        vid: this.$route.query.vid,
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
        }
    }
</script>


<style scoped>

</style>
