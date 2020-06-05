<template>
    <div>
        <div class="description" >
            <p><i class="el-icon-circle-check"></i> 账号 {{this.$store.state.findPassAdmin}} 修改密码成功！</p>
            <el-button type="primary" @click="toLogin">返回登录页面</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FindPassSuccess",
        data(){
            return{

            }
        },
        methods:{
            toLogin(){
                //重置步骤条
                this.$store.commit('RESETSTEP');

                //
                this.$router.push({path:'/login'})
            }
        }
    }
</script>

<style scoped>
    .description{
        text-align: center;
        margin-top:60px;
    }
    .description p{
        font-size: 20px;
    }
    .description .el-button{
        margin-top: 10px;
    }
</style>