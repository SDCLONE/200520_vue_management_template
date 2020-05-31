<template>
    <div>
<!--        <h1>这个是注册页面</h1>-->
<!--        <h1>//TODO This is the registration page</h1>-->
        <header class="header">
<!--            <AllHead/>-->
            <el-col :span="10">
                <i class="el-icon-platform-eleme"></i> Element
            </el-col>
            <el-col :span="13">
                <el-link class="head-links" href="http://www.bupt.edu.cn" :underline="false">关于我们</el-link>
            </el-col>
        </header>
        <section class="register-main">

            <div class="form-container">
                <div class="form-header">
                    <el-col :span="12" :offset="6" >欢迎注册账号</el-col>
                    <el-col :span="6">已有账号？<a @click="toLogin()">直接登录></a></el-col>
                    <!--                    <span style="font-size: 25px;margin:0 auto;border: 1px solid #000;">欢迎注册账号</span>-->
<!--                    <span style="float: right;font-size: 15px">已有账号，登录</span>-->
                </div>
                <el-form ref="registerForm"
                         :rules="rules"
                         :model="registerForm"
                         label-width="100px"
                         :status-icon="true">
                    <el-form-item label="用户名" prop="username">
                        <el-col :span="22">
                            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" >
                        <el-col :span="22" >
                            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass" >
                        <el-col :span="22" >
                            <el-input type="password" v-model="registerForm.checkPass" placeholder="确认输入密码"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email" >
                        <el-col :span="22" >
                            <el-input  v-model="registerForm.email" placeholder="请输入邮箱" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="邮箱验证码" prop="verifyCode" >
                        <el-col :span="11" >
                            <el-input  v-model="registerForm.verifyCode" placeholder="请输入验证码" ></el-input>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <el-button type="primary" @click="getVerifyCode()">获取邮箱验证码</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="手机（选填）" prop="phone" >
                        <el-col :span="22" >
                            <el-input  v-model="registerForm.phone" placeholder="请输入手机号" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitRegisterInfo('registerForm')" >确认信息</el-button>
                        <el-button @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
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

    import axios from 'axios';
    import qs from 'querystring';
    axios.defaults.withCredentials=true;
    export default {
        name: "Register",
        components: {AllFooter, AllHead},
        data(){
            //自定义校验规则
            //最后成功必须要加上callback()否则会一直无法验证成功
            let validateUsername=(rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请输入用户名'));
                }
                else if(value.length<3){
                    callback(new Error('用户名至少为3位'));
                }
                else{
                    axios({
                        method:'get',
                        url:'http://localhost:9000/api/admin/adminExist/'+this.registerForm.username,
                    }).then(res=>{
                        //该用户名已经存在
                        if (res.data.data===true){
                            callback(new Error('用户名已经存在'));
                        }
                        //正确
                        else {
                            callback();
                        }
                    })
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else if(value.length<=5){
                    callback(new Error("密码长度至少6位"));
                }
                else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateEmail = (rule, value, callback) =>{
                let emailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (value===''){
                    callback(new Error('电子邮箱不可以为空'));
                }
                else if(!emailReg.test(value)){
                    callback(new Error('电子邮箱格式不正确'));
                }
                else{
                    callback();
                }
            };
            let validateVerifyCode=(rule,value,callback)=>{
                let codeReg=/^\d+$/;
                if(value===''){
                    callback(new Error('请输入验证码'));
                }
                else if (!codeReg.test(value)){
                    callback(new Error('请输入正确的验证码'));
                }
                else {
                    callback();
                }

            };
            let validatePhone=(rule,value,callback)=>{
                let phoneReg=/^\d+$/;
                if(value===''){
                    callback();
                }
                else if (!phoneReg.test(value)){
                    callback(new Error('请输入正确的电话号码'));
                }
                else {
                    callback();
                }

            };
            return{
                //表单元素
                registerForm:{
                    username:'',
                    password:'',
                    checkPass:'',
                    email:'',
                    verifyCode:'',
                    phone:'',
                },
                //校验规则
                rules:{
                    username:[
                        {required:true,validator:validateUsername,trigger:'blur'},
                    ],
                    password: [
                        {required:true, validator:validatePass, trigger:'blur'}
                    ],
                    checkPass:[
                        {required:true, validator:validateCheckPass, trigger:'blur'}
                    ],
                    email:[
                        {required:true, validator:validateEmail, trigger:'blur'}
                    ],
                    verifyCode:[
                        {required:true,validator:validateVerifyCode,trigger:'blur'}
                    ],
                    phone:[
                        {required:false, validator:validatePhone,trigger:'blur'}
                    ]

                }
            }
        },
        methods:{

            //提交注册表单
            submitRegisterInfo(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let data={
                            username:this.registerForm.username,
                            password:this.registerForm.password,
                            email:this.registerForm.email,
                            phone:this.registerForm.phone,
                            verifyCode:this.registerForm.verifyCode
                        };
                        axios({
                            method:'post',
                            url:'http://localhost:9000/api/admin/createAdmin',
                            data:qs.stringify(data)
                        }).then(res=>{
                            //验证码错误
                            if (res.data.status===this.$store.state.VERIFY_INCORRECT){
                                this.$message.error(res.data.desc);
                            }
                            //验证码正确
                            else {
                                // this.$message.success("注册成功");
                                this.$router.push({path:'/register/completion'});
                            }
                        });
                        return false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            //获取邮箱验证码
            getVerifyCode(){
                //首先清空上一个弹框
                this.$notify.closeAll();
                //再进行判断
                this.$refs.registerForm.validateField('email',err=>{
                    //邮箱验证通过
                    if (err===''){
                        console.log("邮箱验证通过，可以发送邮件啦");
                        axios({
                            method:'get',
                            url:'http://localhost:9000/api/admin/emailVerifyCode/'+this.registerForm.email,
                        }).then(res=>{
                            //判断是否为频繁请求
                            if (res.data.status===this.$store.state.FREQUENT_CODE_REQUEST){
                                this.$notify.error({
                                    title:'错误',
                                    message:res.data.desc
                                })
                            }
                            //如果不是频繁请求
                            else{
                                this.$notify.success({
                                    title:'成功',
                                    message:'验证码发送成功'
                                })
                            }

                        });
                    }
                    //邮箱验证失败
                    else{
                        console.log("邮箱验证失败："+err);
                        this.$notify.error({
                            title:'错误',
                            message:err
                        })
                    }

                });
            },
            //点击跳转登录
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
        line-height: 60px;
        z-index: 999;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: #fff;
        padding: 0 20px;
    }

    .header .el-col{
        font-size: 32px;
        /*margin-left: 20px;*/
    }

    .head-links{
        float:right;
        margin-left: 20px;
    }
    /*
    预留出头部和尾部部分
    */
    .register-main {
        margin-top: 0;
        padding-bottom: 120px;
        padding-top: 60px;
    }


    .description{
        width: 400px;
        margin: 100px auto;
    }

    .form-container{
        width: 700px;
        background-color: #fff;
        margin: 50px auto;
        padding: 20px;
        /*height: 200px;*/
    }

    .el-form{
        width: 90%;
        margin: 0 auto;
    }

    .form-header{
        width: 100%;
        height: 50px;
        line-height: 50px;
        /*border: 1px solid #000;*/
        margin: 10px 0 20px;
    }
    .form-header .el-col:nth-child(1){
        font-size: 25px;
        text-align: center;
        /*border: 1px solid #000;*/
    }
    .form-header .el-col:nth-child(2){
        font-size: 12px;
        text-align: right;
    }
    .form-header a{
        color: #409EFF;
        cursor: pointer;
    }
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
    }
</style>