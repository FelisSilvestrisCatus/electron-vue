<template>
    <div>
        <el-button type="primary" @click="testaxios()">登录test</el-button>
        <br>
        {{info}}
    </div>
</template>

<script type="application/ecmascript">
    export default {
        name: '',
        data() {
            return {
                info: null,
            }
        },
        methods: {
            testaxios() {
                this.$axios({
                    method: 'POST',
                    url: '/users/getall',
                }).then(response => {
                    this.info = response;
                })
            }
        }
    }


</script>


<style scoped>

</style>
