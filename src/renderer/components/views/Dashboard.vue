<template>
    <div>
    </div>
</template>

<script>

    export default {
        name: 'dashboard',
        data() {
            return {}
        },
        created() {
            this.checkuser();
        },
        methods: {
            checkuser() {
                if (this.$store.state.user.type === 1) {
                    this.$router.push({path: '/teacherDashboard'});
                } else {
                    this.$router.push({path: '/dashboardStudent'});
                }
            }
        }
    }

</script>


<style scoped>
</style>
