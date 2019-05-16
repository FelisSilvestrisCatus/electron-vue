<template>
    <div style="background-color: white">
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>
        </el-row>
        <el-row :gutter="16">
            <el-col :span="8" :offset="8">
                <div v-show="btndisable===0">
                    <el-tag>应出勤人数:{{this.tableData.length}}</el-tag>
                    <el-button type="primary" @click='startCall'>开始点名</el-button>
                </div>
                <div v-show="btndisable===1">
                    当前被点名的同学：
                    <span style="color: #2d8cf0;">{{this.tableData[this.activeIndex].uname}}</span>
                    <br>
                    <el-button type="success" @click='nextStep(0)' icon='circle-check' class='coming'
                    >
                        来了
                    </el-button>
                    <el-button type="danger" @click='nextStep(1)' icon='circle-close' class='noComing'
                    >
                        没来
                    </el-button>
                    <audio :src="audioSrc" autoplay></audio>
                </div>
                <div v-show="btndisable===2">
                    点名完毕
                    <br>
                    <el-tag>应出勤人数:{{this.tableData.length}}</el-tag>
                    <el-tag>出勤人数:{{this.countatt}}</el-tag>
                    <el-tag>未出勤人数:{{this.countnotatt}}</el-tag>
                </div>
            </el-col>

        </el-row>
        <el-row :gutter="16">
            <el-col :span="18">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">

                    <el-table-column
                            label="学生账号"
                            prop="uid">
                    </el-table-column>
                    <el-table-column
                            label="学生姓名"
                            prop="uname">
                    </el-table-column>
                    <el-table-column
                            label="学生手机号"
                            prop="phone"
                    >
                    </el-table-column>
                    <el-table-column
                            label="请假情况"
                            prop="state"
                            :formatter="studentState"
                    >
                    </el-table-column>

                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input

                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-radio v-model="radio[scope.row.uid]" label="0">已到</el-radio>
                            <el-radio v-model="radio[scope.row.uid]" label="1">未到</el-radio>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row :gutter="16">
                    <el-col :span="4" :offset="20">
                        <el-button type="primary" @click="submit()">立即创建</el-button>

                    </el-col>


                </el-row>
            </el-col>

            <el-col :span="6">
                <el-card :body-style="{ padding: '5px' }">
                    <el-row>
                        请假同学信息(点击右侧箭头展开详情)
                    </el-row>
                    <el-row :gutter="16">

                        <el-table
                                :data="tableData1"
                                style="width: 100%">

                            <el-table-column
                                    label="学生姓名"
                                    prop="uname">
                            </el-table-column>
                            <el-table-column
                                    label="请假类型"
                                    prop="vtype"
                                    :formatter="showVtype">
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="学生学号">
                                            <span>{{ props.row.uid}}</span>
                                        </el-form-item>
                                        <el-form-item label="学生姓名">
                                            <span>{{ props.row.uname}}</span>
                                        </el-form-item>
                                        <el-form-item label="学生手机号">
                                            <span>{{ props.row.phone }}</span>
                                        </el-form-item>
                                        <el-form-item label="学生请假类型">
                                            <span>{{showVtype(props.row.vtype)}}</span>
                                        </el-form-item>
                                        <el-form-item label="请假时间">
                                            <span>{{ props.row.vtime }}</span>
                                        </el-form-item>

                                    </el-form>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-card>

            </el-col>
        </el-row>


    </div>
    <!-- 对话框-->

</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';

    export default {
        components: {
            WeatherAndWeekDayAndDate
        },
        data() {
            return {
                //点名按钮
                btndisable: 0,
                //语音地址
                srcs: [],
                audioSrc: [],
                //点名序号
                activeIndex: 0,
                //出勤情况
                countatt: 0,
                countnotatt: 0,


                tableData1: [],
                count: '',
                tableData: {},
                //按钮点名
                radio: {},
                courseid: '',
                coursename: '',
                rocalltype: '',
                rocalldetail: '' //显示点名方式详情
            }
        },
        mounted() {
            // eslint-disable-next-line no-console
            console.clear();
        },
        created() {
            //获取参数值
            this.courseid = this.$route.params.courseid;
            this.rocalltype = this.$route.params.rocalltype;
            this.coursename = this.$route.params.coursename;
            this.rocalldetail = this.$route.params.rocalldetail;
            //执行函数
            this.getCourseStudentWithoutVacate();
            //获取请假的学生
            this.getCourseStudentWhoVacate();
        },
        methods: {
            //获取当前课程下的学生请假信息
            getCourseStudentWhoVacate() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getCourseStudentWhoVacate',
                    data: {
                        courseid: this.courseid
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData1 = eval('(' + resdata.data + ')');
                })

            },
            //学生状态
            studentState(row) {
                if (row.state == null) {
                    return "未请假";
                }
                switch (row.state) {


                    case '-1':
                        return "请假取消";
                    case '0':
                        return "审批中";
                    case '1':
                        return "未批准";


                }
            },
            //学生请假的类型
            showVtype(row) {
                if (row.vtype === null) {
                    return "未请假";
                }

                switch (row.vtype) {
                    case '0':
                        return "事假";
                    case '1':
                        return "病假";
                    case '2':
                        return "其他";
                }
            },

            //求返回的json数目
            /**
             * @return {number}
             */
            JSONLength(obj) {
                var Length = 0;
                for (var item in obj) {
                    Length++;
                }
                return Length;
            },
            //根据路由的参数 courseid来选择展示要点名的学生
            getCourseStudentWithoutVacate() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getCourseStudentWithoutVacate',
                    data: {
                        courseid: this.courseid
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.count = this.JSONLength(jsondata);
                    this.tableData = jsondata;
                })
            },
            submit() {

                //都选上时
                //转换为json类型的string
                var StringJson = JSON.stringify(this.radio);
                //将json类型的String  转为 json
                var json = JSON.parse(StringJson);
                console.log(this.radio);
                console.log(this.JSONLength(json));
                if (this.count === (this.JSONLength(json))) {
                    this.$message({
                        type: 'success',
                        message: '正在提交'
                    });
                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/insertOneRollcall', //包括创建一次点名 以及传输 学生出勤信息
                        data: {
                            courseid: this.courseid,
                            rollType: this.rocalltype,
                            datamap: JSON.stringify(this.radio),
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state === '200') {
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                            this.$router.push({
                                name: 'ShowRollCallHistory',
                                params: {courseid: this.courseid}
                            });
                        } else {
                            this.$message.error('请稍后再试');
                        }
                    })
                } else {
                    this.$message.error('有遗漏的学生，请仔细检查后提交');
                }
            },
            startCall() {
                //开始点名
                this.btndisable = 1;

                for (let i = 0; i < this.tableData.length; i++) {
                    let value = this.tableData[i].uname;
                    let src = "http://fanyi.baidu.com/gettts?lan=zh&text=" + encodeURI(value) + "&spd=5&source=web";
                    this.srcs.push(src)
                }
                this.audioSrc = this.srcs[0];
            },
            nextStep(state) {
                //下一个名字
                let index = this.activeIndex;
                this.radio[this.tableData[index].uid] = state + "";
                if (state === 0)
                    this.countatt++;
                else
                    this.countnotatt++;
                console.log(this.radio);
                if (this.activeIndex + 1 === this.tableData.length) {
                    this.btndisable = 2;
                } else {
                    index = ++this.activeIndex;
                    this.audioSrc = this.srcs[index];
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
