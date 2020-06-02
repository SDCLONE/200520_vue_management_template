<template>
    <div>
        <header class="header">
<!--            <el-col :span="10">-->
<!--                <i  class="el-icon-platform-eleme"></i> Element-->
<!--            </el-col>-->
<!--            <el-col :span="13">-->
<!--                <el-link class="head-links" href="http://www.bupt.edu.cn" :underline="false">关于我们</el-link>-->
<!--            </el-col>-->
            <AllHeadNoLogin/>
        </header>
        <section class="main-container">
            <div class="success-info-box">
                <div class="info-title" style="font-size: 25px">
                    <i  class="el-icon-circle-check"></i> 您已注册成功
                </div>
                <div class="info-msg">请前往控制台进行更多操作</div>
                <div class="btn-container" style="width: 100%; text-align: center">
                    <el-button type="primary" class="to-login-btn" @click="toLogin">前往登录</el-button>
                </div>
            </div>
        </section>
        <footer class="footer">
            <AllFooter/>
        </footer>
    </div>
</template>

<script>
    import AllHead from "../components/AllHead";
    import AllFooter from "../components/AllFooter";
    import AllHeadNoLogin from "../components/AllHeadNoLogin";
    export default {
        name: "RegisterCompletion",
        components: {AllHeadNoLogin, AllFooter, AllHead},
        methods:{
            toLogin(){
                this.$router.push({path:'/login'});
            }
        }
    }
</script>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        height: 60px;
        /*line-height: 60px;*/
        z-index: 999;
        width: 100%;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
        /*background-color: #fff;*/
        /*padding: 0 20px;*/
    }
    .header .el-col{
        font-size: 32px;
        /*margin-left: 20px;*/
    }

    .head-links{
        float:right;
        margin-left: 20px;
    }
    .main-container{
        /*border: 1px solid #000;*/
        padding-bottom: 120px;
        padding-top: 60px;
    }
    .success-info-box{
        width: 500px;
        height: 250px;
        margin: 60px auto 0;
        background-color: #fff;
        padding: 20px;
    }
    .success-info-box .info-title{
        font-size: 35px;
        text-align: center;
        margin-top: 30px;
    }
    .success-info-box .info-msg{
        text-align: center;
        margin-top: 40px;
    }
    .success-info-box .btn-container{
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .success-info-box .to-login-btn{
        width: 150px;
    }
    .footer{
        position: absolute;
        height: 120px;
        bottom: 0;
        left: 0;
        width: 100%;

    }
</style>