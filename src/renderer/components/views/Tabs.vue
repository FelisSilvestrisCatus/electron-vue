<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.message}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">时间:{{scope.row.mtime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180">
                            <template slot-scope="scope">
                                <span class="message-title">发件人:{{scope.row.uname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.row.umid)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleAllRead">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.message}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">时间:{{scope.row.mtime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="180">
                                <template slot-scope="scope">
                                    <span class="message-title">发件人:{{scope.row.uname}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                unread: [],
                read: [],
            }
        },
        created() {
            this.getMsg();
        },
        methods: {
            getMsg() {
                this.$axios({
                    method: 'POST',
                    url: '/usermessage/getMsg',
                    data: {}
                }).then(response => {
                    this.unread = JSON.parse(response.data.unread);
                    this.read = JSON.parse(response.data.read);
                })
            },
            handleRead(umid) {
                this.$axios({
                    method: 'POST',
                    url: '/usermessage/setMsgRead',
                    data: {
                        umid: umid,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                    this.getMsg();
                    bus.$emit('changemsgnum', 0);
                });
            },
            handleAllRead() {
                this.$axios({
                    method: 'POST',
                    url: '/usermessage/setAllMsgRead',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                    this.getMsg();
                    bus.$emit('changemsgnum', 0);
                });

            },
        },
        computed: {
            unreadNum() {
                return this.unread.length;
            }
        }
    }

</script>

<style>
    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }
</style>

