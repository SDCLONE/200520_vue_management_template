<template>
    <div>
        <div id="testBox">
            <h3>This is management page!! Admin:{{this.$store.state.adminName}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Service1",
        methods:{

        },
    }
</script>

<style scoped>
    #testBox{
        /*width: 1200px;*/
        height: 1200px;
    }
</style>