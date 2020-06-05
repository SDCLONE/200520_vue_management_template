<template>
    <div>
        <header class="header">
            <AllHeadNoLogin/>
        </header>
        <section class="main-part">
            <!--            <h1>开始寻找密码</h1>-->
            <div class="step-box">
                <el-steps :active="this.$store.state.findPassStep" finish-status="success" align-center>
                    <el-step title="输入邮箱"></el-step>
                    <el-step title="选择对应账号"></el-step>
                    <el-step title="输入新密码"></el-step>
<!--                    <el-step title="完成"></el-step>-->
                </el-steps>
            </div>
            <div class="operation-box">
                <el-row class="header-container">
                    <el-col :offset="0" :span="15" class="form-header">
                        {{formTitles[this.$store.state.findPassStep]}}
                    </el-col>
                    <el-col :span="8" class="back-login-link">
                        <a class="back-login-link" @click="backToLogin()">返回登录></a>
                    </el-col>
                </el-row>

                <div v-if="this.$store.state.findPassStep === 0">
                    <FindPassEmailForm/>
                </div>
                <div v-else-if="this.$store.state.findPassStep === 1">
<!--                    <h1>哈哈哈哈哈</h1>-->
<!--                    <h1 v-for="acc in this.$store.state.findPassAccounts" :key="acc.username">-->
<!--                        {{acc.username}}-->
<!--                    </h1>-->
                    <FindPassSelectAccount/>
                </div>
                <div v-else-if="this.$store.state.findPassStep === 2">
<!--                    <h1>输入确认密码</h1>-->
                    <FindPassUpdatePwd/>
                </div>
                <div v-else>
                    <FindPassSuccess/>
                </div>
<!--                <el-form -->
<!--                        ref="enterEmailForm"-->
<!--                        :model="enterEmailForm"-->
<!--                        :rules="rules"-->
<!--                        label-width="100px"-->
<!--                        :status-icon="false"-->
<!--                >-->
<!--                    <el-form-item label="电子邮箱" prop="email" >-->
<!--                        <el-col :span="22" >-->
<!--                            <el-input  v-model="enterEmailForm.email" placeholder="请输入邮箱" ></el-input>-->
<!--                        </el-col>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="邮箱验证码" prop="verifyCode" >-->
<!--                        <el-col :span="11" >-->
<!--                            <el-input  v-model="enterEmailForm.verifyCode" placeholder="请输入验证码" ></el-input>-->
<!--                        </el-col>-->
<!--                        <el-col :span="9" :offset="1">-->
<!--                            <el-button @click="getVerifyCode()">获取邮箱验证码</el-button>-->
<!--                        </el-col>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item>-->
<!--                        <el-button type="primary" @click="handleSubmit('enterEmailForm')" >确认信息</el-button>-->
<!--                        <el-button @click="resetForm('enterEmailForm')">重置</el-button>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
            </div>
        </section>
        <footer class="footer">
            <AllFooter/>
        </footer>
    </div>
</template>

<script>
    import AllHeadNoLogin from "../components/AllHeadNoLogin";
    import AllFooter from "../components/AllFooter";
    import axios from "axios";
    import FindPassEmailForm from "../components/FindPassEmailForm";
    import FindPassSelectAccount from "../components/FindPassSelectAccount";
    import FindPassUpdatePwd from "../components/FindPassUpdatePwd";
    import FindPassSuccess from "../components/FindPassSuccess";

    export default {
        name: "FindPassword",
        components: {
            FindPassSuccess,
            FindPassUpdatePwd, FindPassSelectAccount, FindPassEmailForm, AllFooter, AllHeadNoLogin},
        data() {
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
            return {
                formTitles:['提供您绑定的电子邮箱','请选择修改的账号','请修改密码','成功'],
                // enterEmailForm: {
                //     email: '',
                //     verifyCode: ''
                // },
                // //校验规则
                // rules:{
                //     // username:[
                //     //     {required:true,validator:validateUsername,trigger:'blur'},
                //     // ],
                //     // password: [
                //     //     {required:true, validator:validatePass, trigger:'blur'}
                //     // ],
                //     // checkPass:[
                //     //     {required:true, validator:validateCheckPass, trigger:'blur'}
                //     // ],
                //     email:[
                //         {required:true, validator:validateEmail, trigger:'blur'}
                //     ],
                //     verifyCode:[
                //         {required:true,validator:validateVerifyCode,trigger:'blur'}
                //     ],
                //     // phone:[
                //     //     {required:false, validator:validatePhone,trigger:'blur'}
                //     // ]
                //
                // }

            }
        },
        methods:{
            backToLogin(){
                //重置步骤条
                this.$store.commit('RESETSTEP');
                //跳转至登录界面
                this.$router.push({path:'/login'});
            }
            // //获取邮箱验证码
            // getVerifyCode(){
            //     //首先清空上一个弹框
            //     this.$notify.closeAll();
            //     //再进行判断
            //     this.$refs.enterEmailForm.validateField('email',err=>{
            //         //邮箱验证通过
            //         if (err===''){
            //             console.log("邮箱验证通过，可以发送邮件啦");
            //             axios({
            //                 method:'get',
            //                 url:'http://localhost:9000/api/admin/emailVerifyCode/'+this.enterEmailForm.email,
            //             }).then(res=>{
            //                 //判断是否为频繁请求
            //                 if (res.data.status===this.$store.state.FREQUENT_CODE_REQUEST){
            //                     this.$notify.error({
            //                         title:'错误',
            //                         message:res.data.desc
            //                     })
            //                 }
            //                 //如果不是频繁请求
            //                 else{
            //                     this.$notify.success({
            //                         title:'成功',
            //                         message:'验证码发送成功'
            //                     })
            //                 }
            //
            //             });
            //         }
            //         //邮箱验证失败
            //         else{
            //             console.log("邮箱验证失败："+err);
            //             this.$notify.error({
            //                 title:'错误',
            //                 message:err
            //             })
            //         }
            //
            //     });
            // },
            // //重置表单
            // resetForm(formName){
            //     this.$refs[formName].resetFields();
            // },
            // handleSubmit(formName){
            //     alert(formName);
            // }
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
    }

    .main-part {
        padding-top: 60px;
        padding-bottom: 120px;
        width: 100%;
    }
    .step-box{
        margin: 30px auto 0;
        width: 80%;
    }

    .operation-box {
        margin: 30px auto 0;
        width: 500px;
        min-height: 250px;
        background-color: #fff;
        padding: 20px;
    }

    .header-container{
        margin-top: 0;
        margin-bottom: 20px;
        height: 30px;
        line-height: 30px;
    }

    .form-header{
        /*width: 200px;*/
        font-size: 20px;
        /*margin-left: 10px;*/
    }

    .back-login-link{
        float: right;
        color: #409EFF;
        cursor: pointer;
        font-size: 15px;
    }

    .footer {
        width: 100%;
        height: 120px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>