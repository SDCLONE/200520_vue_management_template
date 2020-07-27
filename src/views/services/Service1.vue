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
        props:['activeMenu'],
        mounted() {
            //加载二级路由界面修改左侧导航栏高亮选项
            console.log("页面目前的activeMenu是",this.activeMenu);
            this.$store.state.activeMenu = this.activeMenu;
        }
    }
</script>

<style scoped>
    #testBox{
        /*width: 1200px;*/
        /*height: 1200px;*/
    }
</style>