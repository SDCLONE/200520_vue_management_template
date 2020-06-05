<template>
    <el-form ref="updatePwdForm"
             :rules="rules"
             :model="updatePwdForm"
             label-width="100px"
             :status-icon="true">
        <el-form-item label="新密码" prop="password" >
            <el-col :span="22" >
                <el-input type="password" v-model="updatePwdForm.password" placeholder="请输入新密码" ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass" >
            <el-col :span="22" >
                <el-input type="password" v-model="updatePwdForm.checkPass" placeholder="确认输入密码" ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button @click="previousStep">返回上一步</el-button>
            <el-button @click="resetForm('updatePwdForm')">重置</el-button>
            <el-button type="primary" @click="submitUpdateInfo('updatePwdForm')" >确认修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from "axios";
    import qs from "querystring";
    axios.defaults.withCredentials=true;

    export default {
        name: "FindPassUpdatePwd",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else if(value.length<=5){
                    callback(new Error("密码长度至少6位"));
                }
                else {
                    if (this.updatePwdForm.checkPass !== '') {
                        this.$refs.updatePwdForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.updatePwdForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                //表单元素
                updatePwdForm:{
                    password:'',
                    checkPass:''
                },
                //校验规则
                rules:{
                    password: [
                        {required:true, validator:validatePass, trigger:'blur'}
                    ],
                    checkPass:[
                        {required:true, validator:validateCheckPass, trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            //返回上一步
            previousStep(){
                this.$store.commit('PREVIOUSSTEP');
            },
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            //提交修改密码
            submitUpdateInfo(formName){
                this.$refs[formName].validate((valid) => {
                    //首先关闭其他弹框
                    this.$message.closeAll();
                    if (valid) {
                        // alert('submit!');
                        let data={
                            username:this.$store.state.findPassAdmin,
                            password:this.updatePwdForm.password,
                        };
                        axios({
                            method:'post',
                            url:'http://localhost:9000/api/admin/updateAdminPassword',
                            data:qs.stringify(data)
                        }).then(res=>{
                            console.log(res);
                            //如果状态码是0代表修改成功
                            if (res.data.status === 0){
                                //进入下一步
                                this.$store.commit('NEXTSTEP');
                            }
                            //如果出错就提示错误
                            else {
                                this.$message.error(res.data.desc);
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