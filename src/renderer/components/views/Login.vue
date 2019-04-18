<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">点名系统</div>
            <el-tabs
                    type="border-card"
                    :stretch=true
            >
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 验证码登录</span>
                    <el-form :model="ruleFormCode" :rules="rulesCode" ref="ruleFormCode" label-width="0px"
                             class="ms-content">
                        <el-form-item prop="phone">
                            <el-input v-model="ruleFormCode.phone" placeholder="请输入手机号">
                                <el-button slot="prepend">
                                    <svg-icon icon-class="手机号"/>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="15">
                                <el-input v-model="ruleFormCode.code"
                                          placeholder="请输入验证码">
                                    <el-button slot="prepend">
                                        <svg-icon icon-class="验证码"/>
                                    </el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-button
                                        type="primary"
                                        round
                                        @click="getPhoneValidateCode"
                                        v-bind:disabled="changeCodeDisabled"
                                        v-bind:style="{opacity:changeCodeOpacity}"
                                >{{codemsg}}
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitCodeForm('ruleFormCode')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 密码登录</span>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                        <el-form-item prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="请输入手机号">
                                <el-button slot="prepend">
                                    <svg-icon icon-class="people"/>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password">
                                <el-button slot="prepend">
                                    <svg-icon icon-class="密码"/>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 新用户注册</span>
                    <el-form :model="registerRuleForm" label-width="0px" class="ms-content">
                        <el-alert
                                :title="promot"
                                :type="promotType"
                                center
                                :closable="false"
                                show-icon>
                        </el-alert>

                        <el-form-item prop="username">
                            <el-input v-model="registerRuleForm.username" placeholder="请输入姓名"
                                      v-on:input="validateUsername()">
                                <el-button slot="prepend">
                                    <svg-icon icon-class="people"/>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input v-model="registerRuleForm.idnumber" placeholder="请输入学号" required>
                                <el-button slot="prepend">
                                    <svg-icon icon-class="证件"/>
                                </el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="userphone">
                            <el-input v-model="registerRuleForm.userphone"
                                      placeholder="请输入手机号"
                                      v-on:input="getRealTimePhone">
                                <el-button slot="prepend">
                                    <svg-icon icon-class="手机号"/>
                                </el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="validatecode">
                            <el-row>
                                <el-col :span="15">
                                    <el-input v-model="registerRuleForm.validatecode"
                                              placeholder="请输入验证码">
                                        <el-button slot="prepend">
                                            <svg-icon icon-class="验证码"/>
                                        </el-button>
                                    </el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-button
                                            type="primary"
                                            round
                                            @click="registerGetPhoneValidateCode"
                                            v-bind:disabled="registerChangeCodeDisabled"
                                            v-bind:style="{opacity:registerChangeCodeOpacity}">{{registerCodemsg}}
                                    </el-button>
                                </el-col>
                            </el-row>

                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitRegisterForm('registerRuleForm')">注册</el-button>
                        </div>

                    </el-form>

                </el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>

<script type="application/ecmascript">
    import * as types from '../../config/types'

    export default {
        name: '',
        data() {
            return {
                msg: '',
                //密码登录
                ruleForm: {
                    phone: '2',
                    password: '2'
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                //验证码登录
                ruleFormCode: {
                    phone: '',
                    code: ''
                },
                rulesCode: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                changeCodeDisabled: false,
                changeCodeOpacity: "1",
                codemsg: "获取验证码",

                //注册
                registerRuleForm: {
                    username: '',
                    userphone: '',
                    validatecode: '',
                    idnumber: '',
                },

                promot: "请确保信息的准确性,姓名学号注册后不可修改",
                promotType: 'warning',
                registerCodemsg: "获取验证码",

                registerChangeCodeDisabled: false,
                registerChangeCodeOpacity: "1"
            }
        },
        methods: {
            //获取登录验证码
            getPhoneValidateCode() {
                this.$axios({
                    method: 'POST',
                    url: '/validatecode/getLoginValidatecode',
                    data: {
                        userphone: this.ruleFormCode.phone,
                    }
                }).then(response => {
                    this.changeGetCodeButtonStyle();
                    this.$alert(response.data.msg, '', {
                        confirmButtonText: '确定'
                    });
                })
            },
            //改变获取验证码按钮样式
            changeGetCodeButtonStyle() {
                let that = this;
                that.codemsg = "60秒后重新获取";
                that.changeCodeDisabled = true;
                setTimeout(function () {
                    that.changeCodeOpacity = "0.6";
                }, 1000);
                let time = 60;
                let set = setInterval(function () {
                    that.codemsg = "(" + --time + ")" + "秒后重新获取";
                }, 1000);
                setTimeout(function () {
                    that.codemsg = "获取验证码";
                    that.changeCodeOpacity = "1";
                    that.changeCodeDisabled = false;
                    clearInterval(set);
                }, 60000);
            },
            //验证码登录
            submitCodeForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/validatecode/loginByCode',
                            data: {
                                loginType: 1,
                                phone: this.ruleFormCode.phone,
                                code: this.ruleFormCode.code
                            }
                        }).then(response => {
                            var resdata = response.data;
                            var jsonuser = eval('(' + resdata.user + ')');
                            if (resdata.state === "200") {
                                this.$store.commit(types.LOGIN, {token: resdata.token, user: jsonuser});
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                });
                            } else {
                                this.$alert('手机号或验证码错误', '', {
                                    confirmButtonText: '确定'
                                });
                            }
                        })
                    } else {
                        this.$alert('请输入用户名和验证码', '', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                });
            },
            //提交登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/users/login',
                            data: {
                                loginType: 1,
                                phone: this.ruleForm.phone,
                                password: this.ruleForm.password
                            }
                        }).then(response => {
                            var resdata = response.data;
                            var jsonuser = eval('(' + resdata.user + ')');
                            if (resdata.state === "200") {
                                this.$store.commit(types.LOGIN, {token: resdata.token, user: jsonuser});
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                });
                            } else {
                                this.$alert('手机号或密码错误', '', {
                                    confirmButtonText: '确定'
                                });
                            }
                        })
                    } else {
                        this.$alert('请输入用户名和密码', '', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                });
            },

            //注册部分
            //检测名字
            validateUsername() {
                this.promot = "用户姓名仅支持中文";
                this.promotType = "info";
                let uname = this.registerRuleForm.username;
                let reg = /^[\u4E00-\u9FA5]+$/;
                if (!reg.test(uname)) {
                    this.promot = "姓名含有非中文";
                    this.promotType = "warning";
                    this.registerRuleForm.username = uname.substring(0, uname.length - 1);
                } else {
                    this.promot = "姓名符合规范";
                    this.promotType = "success";
                    return true;
                }

                if (uname.length > 20) {
                    this.promot = "用户姓名长度不可超过20";
                    this.promotType = "warning";
                    this.registerRuleForm.username = uname.substring(0, 19);
                }

                return false;
            },

            //实时获取用户输入的手机号
            getRealTimePhone() {
                this.promot = "请填写手机号";
                let userphone = this.registerRuleForm.userphone;
                if (userphone.length === 11) {
                    if (!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(userphone))) {
                        this.promot = "手机号格式错误！";
                        this.promotType = "warning";
                        this.registerRuleForm.userphone = "";
                    } else {
                        this.$axios({
                            method: 'POST',
                            url: '/usersRegiste/phoneIsOrNotExist',
                            data: {
                                userphone: this.registerRuleForm.userphone,
                            }
                        }).then(response => {
                            var resdata = response.data;
                            if (null == resdata) {
                                this.promot = "请检查网络连接状况";
                            }
                            if (resdata.state === "200") {
                                this.promot = "该手机号可以注册使用";
                                this.registerChangeCodeDisabled = false;
                                this.registerChangeCodeOpacity = "1";
                            } else {
                                this.promot = "手机号已经注册";
                                this.registerChangeCodeDisabled = true;
                                this.registerChangeCodeOpacity = "0.6";
                            }
                        })
                    }
                }
            },
            //获取验证码
            registerGetPhoneValidateCode() {
                this.$axios({
                    method: 'POST',
                    url: '/validatecode/getValidatecode',
                    data: {
                        userphone: this.registerRuleForm.userphone,
                    }
                }).then(response => {
                    this.registerChangeGetCodeButtonStyle();
                    this.$alert(response.data.msg, '', {
                        confirmButtonText: '确定'
                    });
                })
            },
            //提交注册
            submitRegisterForm() {
                if (this.validateUsername()) {
                    this.$axios({
                        method: 'POST',
                        url: '/users/registe',
                        data: {
                            username: this.registerRuleForm.username,
                            userphone: this.registerRuleForm.userphone,
                            validatecode: this.registerRuleForm.validatecode,
                            idnumber: this.registerRuleForm.idnumber,
                        }
                    }).then(response => {
                        var resdata = response.data;
                        this.$alert(response.data.msg, '', {
                            confirmButtonText: '确定'
                        });
                        if (resdata.state === "200") {
                            this.$router.push('/');
                        }
                    })
                }
            },
            //改变获取验证码按钮样式
            registerChangeGetCodeButtonStyle() {
                let that = this;
                that.registerChangeCodeDisabled = true;
                setTimeout(function () {
                    this.registerChangeCodeOpacity = "0.6";
                }, 1000);
                var time = 60;
                var set = setInterval(function () {
                    that.registerCodemsg = "(" + --time + ")" + "秒后获取";
                }, 1000);
                setTimeout(function () {
                    that.registerCodemsg = "获取验证码";
                    that.registerChangeCodeOpacity = "1";
                    that.registerChangeCodeDisabled = false;
                    clearInterval(set);
                }, 60000);
            }
        }

    }

</script>


<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(http://img.aloli.cn/blog/20190322/kGPBTSpGgUru.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 410px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
        margin-top: 35px;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

</style>
