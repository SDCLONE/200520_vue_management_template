<template>
    <div id="#app">

        <el-container>
            <el-header>
                <AllHead/>
            </el-header>
            <el-container class="inner-container">
<!--                <el-scrollbar>-->
<!--                    <el-aside width="200px">-->
<!--                        <h2>hello</h2>-->
<!--                    </el-aside>-->
<!--                </el-scrollbar>-->
                <el-aside width="50%">
                    <h2>hello</h2>
                </el-aside>
                <el-main>
                    <el-scrollbar>
<!--                        <div id="testBox">-->
<!--                            This is login page!!-->
<!--                            <el-button type="primary" @click="handleLogin">sign in</el-button>-->
<!--                        </div>-->
                        <el-card class="login-box-card" shadow="always">
                            <el-form ref="loginForm" hide-required-asterisk :rules="rules" :model="loginForm" label-width="60px">
                                <el-row>
                                    <el-col :span="6" class="form-title">
                                        密码登录
                                    </el-col>
                                    <el-col :span="10" class="login-fail-hint" v-show="hintStatus">
                                        用户名或密码错误
                                    </el-col>
                                </el-row>

                                <el-form-item label="用户名" prop="username">
                                    <el-col :span="21">
                                        <el-input v-model="loginForm.username"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-col :span="21">
                                        <el-input type="password" v-model="loginForm.password"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitLogin('loginForm')" native-type="submitLogin">登录</el-button>
                                    <el-button @click="doRegister">注册</el-button>
                                    <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>
                                </el-form-item>
                            </el-form>

                        </el-card>
                    </el-scrollbar>
                </el-main>
            </el-container>

        </el-container>

    </div>
</template>

<script>
    import AllHead from "../components/AllHead";

    export default {
        name: "Login",
        components: {AllHead},
        data(){
            return{
                hintStatus:false,
                loginForm:{
                    username:'',
                    password:'',

                },
                rules:{
                    username:[
                        {required:true,message:'请输入用户名',trigger:'change'}
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'change'}
                    ]
                }
            }
        },
        methods:{
            // handleLogin(){
            //     console.log("点击了登录，开始登录");
            //     this.$store.state.adminName='yanzhibo';
            //     this.$router.push({path:'/manage'});
            // }
            submitLogin(formName){
                this.$refs[formName].validate((valid)=>{
                    if (valid){
                        //TODO 连接服务器进行表单验证
                        this.$store.state.adminName=this.loginForm.username;
                        this.$router.push({path:'/manage'});
                        return false;
                    }
                })
            },
            doRegister(){
                alert("注册")
            },
            doLoginHelp(){
                alert("用户名或密码找回")
            }
        },
        mounted() {
            //TODO 先判断是否登录，如果登录直接跳转到管理界面
            if (this.$store.state.adminName!==''){
                this.$router.push({path:'/manage'});
            }
        }
    }
</script>

<style scoped>
    .inner-container{
        height: 700px;
        border: 1px solid red;
    }
    .el-header{
        padding: 0;
        width: 100%;
    }
    .el-aside{
        border: 1px solid green;
    }
    .el-main{
        /*border: 1px solid #000;*/
        padding:0;
    }
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

    .login-box-card{
        width: 480px;
        font-size: 16px;
        margin: 150px 30px;
    }
    .form-title{
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 20px;
        /*border: 1px solid #000;*/
    }
    .login-fail-hint{
        margin-bottom: 20px;
        font-size: 12px;
        line-height: 25px;
        /*border: 1px solid #000;*/
        color: #F56C6C;
    }

</style>