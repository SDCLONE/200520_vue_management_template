<template>
    <div id="#app">

        <el-container>
            <el-header>
                <AllHead/>
            </el-header>
            <el-main>
                <el-scrollbar>
                    <el-row class="login-main">
                        <el-col :span="12">
                            <div class="platform-description">
                                <div style="font-size: 35px">云平台管理系统</div>
                                <div style="font-size: 20px; margin-top: 15px">管理员模式：<br>服务监控，数据预览，功能测试</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
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
                                        <el-button type="primary" @click="submitLogin('loginForm')" >登录</el-button>
                                        <el-button @click="doRegister">注册</el-button>
                                        <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>
                                    </el-form-item>
                                </el-form>

                            </el-card>

                        </el-col>
                    </el-row>
                    <el-row class="footer">
                        <div style="width: 90%; margin: 0 auto">
                            <el-divider></el-divider>
                            <span>© 2009-2019 Aliyun.com 版权所有 浙ICP备12022327号 增值电信业务经营许可证： 浙B2-20080101</span>
                        </div>

                    </el-row>
                </el-scrollbar>

            </el-main>
<!--            <el-footer  style="width: 100%;height: 80px;background-color: deeppink;">-->

<!--            </el-footer>-->
<!--            <el-container class="inner-container">-->
<!--                <el-aside width="50%">-->
<!--                    <div class="platform-description">-->
<!--                        <div style="font-size: 35px">云平台管理系统</div>-->
<!--                        <div style="font-size: 20px; margin-top: 15px">管理员模式：<br>服务监控，数据预览，功能测试</div>-->
<!--                    </div>-->
<!--                </el-aside>-->
<!--                <el-main>-->
<!--                    <el-scrollbar>-->
<!--&lt;!&ndash;                        <div id="testBox">&ndash;&gt;-->
<!--&lt;!&ndash;                            This is login page!!&ndash;&gt;-->
<!--&lt;!&ndash;                            <el-button type="primary" @click="handleLogin">sign in</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                        <el-card class="login-box-card" shadow="always">-->
<!--                            <el-form ref="loginForm" hide-required-asterisk :rules="rules" :model="loginForm" label-width="60px">-->
<!--                                <el-row>-->
<!--                                    <el-col :span="6" class="form-title">-->
<!--                                        密码登录-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="10" class="login-fail-hint" v-show="hintStatus">-->
<!--                                        用户名或密码错误-->
<!--                                    </el-col>-->
<!--                                </el-row>-->

<!--                                <el-form-item label="用户名" prop="username">-->
<!--                                    <el-col :span="21">-->
<!--                                        <el-input v-model="loginForm.username"></el-input>-->
<!--                                    </el-col>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="密码" prop="password">-->
<!--                                    <el-col :span="21">-->
<!--                                        <el-input type="password" v-model="loginForm.password"></el-input>-->
<!--                                    </el-col>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item>-->
<!--                                    <el-button type="primary" @click="submitLogin('loginForm')" native-type="submitLogin">登录</el-button>-->
<!--                                    <el-button @click="doRegister">注册</el-button>-->
<!--                                    <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                        </el-card>-->
<!--                    </el-scrollbar>-->
<!--                </el-main>-->
<!--            </el-container>-->

        </el-container>
    </div>
</template>

<script>
    import AllHead from "../components/AllHead";
    import axios from "axios";
    import qs from "querystring";   //当发送post请求需要用到
    axios.defaults.withCredentials=true;    //发送请求携带session信息

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
            submitLogin(formName){
                this.$refs[formName].validate((valid)=>{
                    if (valid){
                        //连接服务器进行表单验证
                        axios({
                            method:'post',
                            url:'http://localhost:7770/admin/login',
                            data:qs.stringify(this.loginForm)
                        }).then(res=>{
                            console.log(res);
                            //用户名或者密码错误
                            if (res.data.status===this.$store.state.USER_LOGIN_FAIL){
                                console.log(res.data.desc);
                                this.hintStatus=true;
                                this.$message({
                                    showClose:true,
                                    message:'登录失败',
                                    type:'error',
                                    duration:1500
                                })
                            }
                            //正确登录
                            else{
                                this.hintStatus=false;
                                console.log("确认登录");
                                //填充vuex中全局变量adminName
                                this.$store.state.adminName=this.loginForm.username;
                                // this.$store.state.adminUsername=this.loginForm.username;
                                console.log(this.$store.state.adminName);
                                this.$message({
                                    showClose:true,
                                    message:'成功',
                                    type:'success',
                                    duration:1500
                                });
                                this.$router.push({path:'/manage'});
                            }

                        });

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
            axios({
                method:'get',
                url:'http://localhost:7770/admin/getUsernameBySession'
            }).then(res=>{
                console.log("这个是页面加载完毕的res",res);
                //session中有登录信息
                if (res.data.status===0){
                    this.$store.state.adminName=res.data.data;
                    this.$router.push({path:'/manage'})
                }
                //session中没有登录信息
                else{
                    this.$store.state.adminName='';
                }
            })
        }
    }
</script>

<style scoped>
    .el-header{
        padding: 0;
        width: 100%;
    }
    .el-main{
        /*border: 4px solid green;*/
        padding:0;
        width: 100%;
        height: 800px;
    }
    .login-main{
        /*border: 1px solid #000;*/
        height: 500px;
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

    .platform-description{
        width: 400px;
        margin: 160px 20%;
    }

    .login-box-card{
        width: 480px;
        font-size: 16px;
        margin: 120px 30px;
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
    .footer{
        /*width: 100%;*/
        height: 150px;
        /*background-color: #;*/
    }

</style>