<template>
    <div>
        <el-form
                ref="selectAccForm"
                :model="selectAccForm"
                :status-icon="false"
        >
            <div>我们找到与您的邮箱匹配的账号如下：</div>
            <el-form-item>
                <el-radio-group v-model="selectAccForm.findPassAdmin">
                    <div class="radio-container" v-for="(acc, index) in this.$store.state.findPassAccounts"
                         :key="acc.username">
                        <el-radio :label="acc.username"></el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <div class="button-container">
                    <el-button @click="previousStep">返回上一步</el-button>
                    <el-button type="primary" @click="handleSubmit">下一步</el-button>
                </div>
            </el-form-item>

        </el-form>


    </div>
</template>

<script>
    import axios from "axios";
    import qs from "querystring";

    export default {
        name: "FindPassSelectAccount",
        data() {
            return {
                selectIndex: -1,
                selectAccForm: {
                    findPassAdmin: ""
                }
            }
        },
        methods: {

            previousStep() {
                this.$store.commit('PREVIOUSSTEP');
            },
            handleSubmit() {
                //将要修改的账户存入store
                this.$store.state.findPassAdmin = this.selectAccForm.findPassAdmin;
                //设置密码修改权限标志
                let data = {
                    username: this.selectAccForm.findPassAdmin
                };
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/api/admin/setUpdatePassFlag',
                    data: qs.stringify(data)
                }).then(() => {
                    //进入下一步
                    console.log(this.$store.state.findPassAdmin);
                    this.$store.commit('NEXTSTEP');
                });


            }

        },
        mounted() {
            this.selectAccForm.findPassAdmin = this.$store.state.findPassAccounts[0].username;
        }
    }
</script>

<style scoped>


    .el-radio-group {
        width: 100%;
    }

    .radio-container {
        margin: 15px auto;
        width: 250px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
    }

    .radio-container .el-radio {
        margin: 20px;
    }

    .button-container {
        text-align: center;
    }
</style>