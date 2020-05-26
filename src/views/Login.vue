<template>
    <div id="#app">
        <header class="header">
            <AllHead/>
        </header>
        <section class="login-main">
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
        </section>
        <footer class="footer">
            <div style="width: 90%; margin: 0 auto">
                <el-divider></el-divider>
                <span>© 2009-2019 Aliyun.com 版权所有 浙ICP备12022327号 增值电信业务经营许可证： 浙B2-20080101</span>
            </div>
        </footer>
<!--        <el-container>-->
<!--            <el-header>-->
<!--                <AllHead/>-->
<!--            </el-header>-->
<!--            <el-main>-->
<!--                    <el-col :span="12">-->
<!--                        <div class="platform-description">-->
<!--                            <div style="font-size: 35px">云平台管理系统</div>-->
<!--                            <div style="font-size: 20px; margin-top: 15px">管理员模式：<br>服务监控，数据预览，功能测试</div>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
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
<!--                                    <el-button type="primary" @click="submitLogin('loginForm')" >登录</el-button>-->
<!--                                    <el-button @click="doRegister">注册</el-button>-->
<!--                                    <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                        </el-card>-->

<!--                    </el-col>-->


<!--&lt;!&ndash;                <el-scrollbar>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-row class="login-main">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="platform-description">&ndash;&gt;-->
<!--&lt;!&ndash;                                <div style="font-size: 35px">云平台管理系统</div>&ndash;&gt;-->
<!--&lt;!&ndash;                                <div style="font-size: 20px; margin-top: 15px">管理员模式：<br>服务监控，数据预览，功能测试</div>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;                            <el-card class="login-box-card" shadow="always">&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-form ref="loginForm" hide-required-asterisk :rules="rules" :model="loginForm" label-width="60px">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-row>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-col :span="6" class="form-title">&ndash;&gt;-->
<!--&lt;!&ndash;                                            密码登录&ndash;&gt;-->
<!--&lt;!&ndash;                                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-col :span="10" class="login-fail-hint" v-show="hintStatus">&ndash;&gt;-->
<!--&lt;!&ndash;                                            用户名或密码错误&ndash;&gt;-->
<!--&lt;!&ndash;                                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-row>&ndash;&gt;-->

<!--&lt;!&ndash;                                    <el-form-item label="用户名" prop="username">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-col :span="21">&ndash;&gt;-->
<!--&lt;!&ndash;                                            <el-input v-model="loginForm.username"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-form-item label="密码" prop="password">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-col :span="21">&ndash;&gt;-->
<!--&lt;!&ndash;                                            <el-input type="password" v-model="loginForm.password"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-button type="primary" @click="submitLogin('loginForm')" >登录</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-button @click="doRegister">注册</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-form>&ndash;&gt;-->

<!--&lt;!&ndash;                            </el-card>&ndash;&gt;-->

<!--&lt;!&ndash;                        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-row>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-row class="footer">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div style="width: 90%; margin: 0 auto">&ndash;&gt;-->
<!--&lt;!&ndash;                            <el-divider></el-divider>&ndash;&gt;-->
<!--&lt;!&ndash;                            <span>© 2009-2019 Aliyun.com 版权所有 浙ICP备12022327号 增值电信业务经营许可证： 浙B2-20080101</span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->

<!--&lt;!&ndash;                    </el-row>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-scrollbar>&ndash;&gt;-->

<!--            </el-main>-->
<!--            <el-footer  class="footer">-->
<!--                <div style="width: 90%; margin: 0 auto">-->
<!--                    <el-divider></el-divider>-->
<!--                    <span>© 2009-2019 Aliyun.com 版权所有 浙ICP备12022327号 增值电信业务经营许可证： 浙B2-20080101</span>-->
<!--                </div>-->
<!--            </el-footer>-->
<!--&lt;!&ndash;            <el-container class="inner-container">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-aside width="50%">&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="platform-description">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div style="font-size: 35px">云平台管理系统</div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div style="font-size: 20px; margin-top: 15px">管理员模式：<br>服务监控，数据预览，功能测试</div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-aside>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-main>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-scrollbar>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                        <div id="testBox">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                            This is login page!!&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                            <el-button type="primary" @click="handleLogin">sign in</el-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                        </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-card class="login-box-card" shadow="always">&ndash;&gt;-->
<!--&lt;!&ndash;                            <el-form ref="loginForm" hide-required-asterisk :rules="rules" :model="loginForm" label-width="60px">&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-row>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-col :span="6" class="form-title">&ndash;&gt;-->
<!--&lt;!&ndash;                                        密码登录&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-col :span="10" class="login-fail-hint" v-show="hintStatus">&ndash;&gt;-->
<!--&lt;!&ndash;                                        用户名或密码错误&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-row>&ndash;&gt;-->

<!--&lt;!&ndash;                                <el-form-item label="用户名" prop="username">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-col :span="21">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-input v-model="loginForm.username"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-form-item label="密码" prop="password">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-col :span="21">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <el-input type="password" v-model="loginForm.password"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-button type="primary" @click="submitLogin('loginForm')" native-type="submitLogin">登录</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-button @click="doRegister">注册</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-button type="text" @click="doLoginHelp">忘记用户名或密码？</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                            </el-form>&ndash;&gt;-->

<!--&lt;!&ndash;                        </el-card>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-scrollbar>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-main>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-container>&ndash;&gt;-->

<!--        </el-container>-->
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
                            // url:'http://localhost:7770/admin/login',
                            url:'http://localhost:9000/api/admin/login',
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
        beforeCreate() {
            //TODO 先判断是否登录，如果登录直接跳转到管理界面
            axios({
                method:'get',
                // url:'http://localhost:7770/admin/getUsernameBySession',
                url:'http://localhost:9000/api/admin/getUsernameBySession'
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
        },
        // mounted() {
        //     //TODO 先判断是否登录，如果登录直接跳转到管理界面
        //     axios({
        //         method:'get',
        //         // url:'http://localhost:7770/admin/getUsernameBySession',
        //         url:'http://localhost:9000/api/admin/getUsernameBySession'
        //     }).then(res=>{
        //         console.log("这个是页面加载完毕的res",res);
        //         //session中有登录信息
        //         if (res.data.status===0){
        //             this.$store.state.adminName=res.data.data;
        //             this.$router.push({path:'/manage'})
        //         }
        //         //session中没有登录信息
        //         else{
        //             this.$store.state.adminName='';
        //         }
        //     })
        // }
    }
</script>

<style scoped>

    .header{
        width: 100%;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
    }


    .login-main{
        width: 100%;
        min-height: 300px;
        /*height: 1000px;*/
        padding-bottom: 120px;
        /*margin-top: 60px;*/
    }



    .platform-description{
        width: 400px;
        margin: 220px 20%;
    }

    .login-box-card{
        width:450px;
        font-size: 16px;
        margin: 180px 30px;
    }
    .form-title{
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 20px;

    }
    .login-fail-hint{
        margin-bottom: 20px;
        font-size: 12px;
        line-height: 25px;

        color: #F56C6C;
    }
    .footer{
        height: 120px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;

    }

</style>