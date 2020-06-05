<template>
    <div id="app">
        <nav>
            <el-col :span="10" >
                <a class="icon-link" href="http://www.baidu.com"><i class="el-icon-platform-eleme"></i> Element</a>
            </el-col>
            <el-col :span="13">
                <el-link class="head-links" :underline="false" v-show="(this.$store.state.adminName!=='')">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{this.$store.state.adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-link :underline="false" href="http://www.baidu.com" target="_blank">个人中心</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-link :underline="false" @click="handleLogout">退出登录</el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-link>
                <el-link class="head-links" href="http://www.bupt.edu.cn" :underline="false">关于我们</el-link>
                <el-link class="head-links" href="http://localhost:8080" :underline="false">首页</el-link>
            </el-col>
        </nav>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AllHead",
        methods:{
            handleLogout(){
                axios({
                    method:'get',
                    url:'http://localhost:9000/api/admin/logout'
                }).then(res=>{
                    if (res.data.status===this.$store.state.SUCCESS){
                        console.log("点击了退出登录");
                        this.$store.state.adminName='';
                        this.$router.push({path:'/login'});
                    }
                    else {
                        this.$message({
                            showClose:true,
                            message:'退出登录失败',
                            type:'error',
                            duration:1500
                        })
                    }

                })

            },

        }
    }
</script>

<style scoped>
    nav{
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /*border: 1px solid green;*/
    }
    nav .el-col{
        /*border: 1px solid #000;*/
        font-size: 25px;
    }
    nav .el-col:first-child{
        font-size: 32px;
    }

    .icon-link{
        text-decoration: none;
        color: black;
        margin-left: 15px;
    }

    .head-links{
        float:right;
        margin-left: 20px;
    }

    .el-dropdown-link:hover{
        color: #409EFF;
    }


</style>