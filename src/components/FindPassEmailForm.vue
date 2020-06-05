<template>
    <el-form
            ref="enterEmailForm"
            :model="enterEmailForm"
            :rules="rules"
            label-width="100px"
            :status-icon="false"
    >
        <el-form-item label="电子邮箱" prop="email" >
            <el-col :span="22" >
                <el-input  v-model="enterEmailForm.email" placeholder="请输入邮箱" autocomplete="on" ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="verifyCode" >
            <el-col :span="11" >
                <el-input  v-model="enterEmailForm.verifyCode" placeholder="请输入验证码" ></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
                <el-button @click="getVerifyCode()">获取邮箱验证码</el-button>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit('enterEmailForm')" >下一步</el-button>
            <el-button @click="resetForm('enterEmailForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from "axios";
    import qs from "querystring";

    export default {
        name: "FindPassEmailForm",
        data(){
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
            return{
                enterEmailForm: {
                    email: '',
                    verifyCode: ''
                },
                //校验规则
                rules:{
                    // username:[
                    //     {required:true,validator:validateUsername,trigger:'blur'},
                    // ],
                    // password: [
                    //     {required:true, validator:validatePass, trigger:'blur'}
                    // ],
                    // checkPass:[
                    //     {required:true, validator:validateCheckPass, trigger:'blur'}
                    // ],
                    email:[
                        {required:true, validator:validateEmail, trigger:'blur'}
                    ],
                    verifyCode:[
                        {required:true,validator:validateVerifyCode,trigger:'blur'}
                    ],
                    // phone:[
                    //     {required:false, validator:validatePhone,trigger:'blur'}
                    // ]

                }
            }
        },
        methods:{
            //获取邮箱验证码
            getVerifyCode(){
                //首先清空上一个弹框
                this.$notify.closeAll();
                //再进行判断
                this.$refs.enterEmailForm.validateField('email',err=>{
                    //邮箱验证通过
                    if (err===''){
                        console.log("邮箱验证通过，可以发送邮件啦");
                        axios({
                            method:'get',
                            url:'http://localhost:9000/api/admin/emailVerifyCode/'+this.enterEmailForm.email,
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
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            handleSubmit(formName){
                // alert(`${formName}提交成功`);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let data={
                            email:this.enterEmailForm.email,
                            verifyCode:this.enterEmailForm.verifyCode
                        };
                        axios({
                            method:'post',
                            url:'http://localhost:9000/api/admin/findAdminsByEmail',
                            data:qs.stringify(data)
                        }).then(res=>{
                            //首先清空上一个弹框
                            this.$message.closeAll();

                            //验证码错误
                            if (res.data.status===this.$store.state.VERIFY_INCORRECT){
                                this.$message.error(res.data.desc);
                            }
                            //不存在和此邮箱匹配的账户
                            else if(res.data.status === this.$store.state.EMAIL_NOT_EXIST){
                                this.$message.error(res.data.desc);
                            }
                            //验证码正确
                            else {
                                // this.$message.success("注册成功");
                                console.log(res);
                                this.$store.state.findPassAccounts = res.data.data;
                                this.$store.commit('NEXTSTEP');
                            }
                        });
                        return false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>