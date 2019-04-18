<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 信息维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-alert
                        title="不需要修改的信息请留空"
                        type="info"
                        center
                        show-icon>
                </el-alert>
                <br>
                <el-form ref="ruleform" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newpassword" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="pwdrule">
                        <el-input v-model="form.newpassword2" placeholder="请再次输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitInfo('ruleform')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import * as types from '../../config/types'

    export default {
        data: function () {
            var validatePass = (rule, value, callback) => {
                if (this.form.newpassword === '') {
                    callback();
                } else if (this.form.newpassword2 === '') {
                    callback(new Error('请再次输入密码'));
                } else if (this.form.newpassword2 !== this.form.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                pwdrule: '',
                form: {
                    email: this.$store.state.user.email,
                    newpassword: '',
                    newpassword2: '',
                },
                rules: {
                    pwdrule: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitInfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/users/changeInfo',
                            data: {
                                email: this.form.email,
                                password: this.form.newpassword
                            }
                        }).then(response => {
                            let resdata = response.data;
                            if (resdata.state === "200") {
                                this.$alert('修改成功!', '修改', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        if (action) {
                                            this.$store.commit(types.LOGOUT);
                                            this.$router.push('/login');
                                        }
                                    }
                                });
                            } else {
                                this.$alert('修改失败!请检查密码!', '修改', {
                                    confirmButtonText: '确定'
                                });
                            }
                        });
                    } else {
                        this.$alert(' 两次输入密码不一致!!', '修改', {
                            confirmButtonText: '确定'
                        });
                    }
                });
            }
        }
    }
</script>
