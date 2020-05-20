<template>
    <div>
        <el-container>
            <el-header>
                <AllHead/>
            </el-header>
                <el-container class="inner-container">
                    <el-aside width="200px">
                        <el-scrollbar>
                            <ManageNav/>
                        </el-scrollbar>
                    </el-aside>
                    <el-main>
                        <el-scrollbar>
                            <div id="testBox">
                                <h3>This is management page!! Admin:{{this.$store.state.adminName}}</h3>
                                <el-button @click="handleLogout">log out</el-button>
                            </div>

                        </el-scrollbar>

                    </el-main>
                </el-container>
        </el-container>
    </div>
</template>

<script>
    import AllHead from "../components/AllHead";
    import ManageNav from "../components/ManageNav";

    export default {
        name: "Manage",
        components:{ManageNav, AllHead},
        methods:{
            handleLogout(){
                console.log("点击了退出登录");
                this.$store.state.adminName='';
                this.$router.push({path:'/login'});
            }
        },
        mounted() {
            //TODO 先判断是否登录，否则直接跳转到登录界面
            if (this.$store.state.adminName===''){
                alert("请先登录");
                this.$router.push({path:'/login'});
            }

        }
    }
</script>

<style scoped>
    .el-container:first-child{
        /*border: 1px solid #000;*/
        /*height: 800px;*/
        width: 100%;
        height: 100%;
    }
    .inner-container{
        height: 700px;
    }

    .el-header{
        z-index: 999;
        height: 60px;
        padding:0;
        width: 100%;
    }
    .el-aside{
        /*border: 1px solid red;*/
        /*height: 700px;*/
        background-color: #ffffff;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
    }
    .el-main{
        padding: 0;
    }
    /*
    开启element滚动条
    */
    .el-scrollbar{
        height: 100%
    }
    /*
    是否开启element样式的横向滚动条
     */
    .el-scrollbar .el-scrollbar__wrap{
        overflow-x: auto;
    }
    /*
   关闭系统自带的滚动条 （chrome浏览器这样关闭）
    */
    .el-main ::-webkit-scrollbar{
        display: none;
    }
    /*
    IE  Edge这样关闭滚动条
     */
    .el-main{
        -ms-overflow-style: none;
    }

    #testBox{
        /*width: 1200px;*/
        height: 1200px;
    }
</style>