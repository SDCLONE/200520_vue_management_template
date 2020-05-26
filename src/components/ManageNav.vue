<template>
    <div>
        <el-menu
                default-active="/manage/service1"
                class="management-navi-vertical"
                @select="handleSelect"
                :router="true"
                :unique-opened="false"

        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>任务一</span>
                </template>
                <el-menu-item index="/manage/service1">选项一</el-menu-item>
                <el-menu-item index="/manage/service2">选项二</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>任务二</span>
                </template>
                <el-menu-item index="/manage/func1">选项一</el-menu-item>
                <el-menu-item index="/manage/func2">选购香儿</el-menu-item>
                <el-menu-item index="/manage/func3">任务监控</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>个人中心</span>
                </template>
                <el-menu-item index="/manage/item1">用户列表</el-menu-item>
                <el-menu-item index="/manage/item2">个人信息</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>

</template>

<script>
    export default {
        name: "ManageNav",
        methods:{
            handleSelect(key,keyPath){
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-item{
        background: #eaedf1;
    }
    /*.el-menu{*/
    /*    height: 400px;*/
    /*}*/
</style>