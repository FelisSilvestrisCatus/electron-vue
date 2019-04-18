<template>
    <div>
        <el-button
                v-bind:disabled="disbtn"
        >
            {{codemsg}}
        </el-button>
        <el-button @click="codemsg+=1">
            test
        </el-button>
        <el-button @click="disbtn=true">
            disable
        </el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                codemsg: "1",
                disbtn: false,
            }
        },
    }
</script>

<style scoped>

</style>
