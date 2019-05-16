<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>
                    我的信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="8" v-for="(info,index) in infos" :key="info.name">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content" :class="'grid-con-'+index">
                            <div class="grid-con-icon">
                                <svg-icon :icon-class="'info-'+index"></svg-icon>
                            </div>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{info.number}}</div>
                                <div>{{info.name}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                infos: [],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcalldetails/myInfo',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    this.infos = eval('(' + resdata.data + ')');
                })
            },

        }
    }

</script>

<style scoped>

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-0 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-0 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-2 .grid-num {
        color: rgb(242, 94, 67);
    }
</style>
