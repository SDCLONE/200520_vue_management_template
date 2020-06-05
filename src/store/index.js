import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adminName: '',
        activeMenu: '/manage/service1',

        //表示找回密码步骤
        findPassStep: 0,
        //表示邮箱对应的账号
        findPassAccounts: [],
        //表示需要修改的账号
        findPassAdmin:"",

        //用户状态码信息
        SUCCESS: 0,
        SYSTEM_ERROR: 10000,
        USER_HAS_EXISTED: 20001,
        USER_NOT_FIND: 20002,
        USER_LOGIN_FAIL: 20003,
        USER_NOT_LOGIN: 20004,
        EMAIL_NOT_EXIST: 20005,
        FREQUENT_CODE_REQUEST: 20006,
        VERIFY_INCORRECT: 20007,
        SESSION_LOGIN_FAIL: 20008
    },
    mutations: {
        NEXTSTEP(state) {
            if (state.findPassStep++ > 2) {
                state.findPassStep = 0;
            }
        },
        PREVIOUSSTEP(state){
            state.findPassStep--;
        },
        RESETSTEP(state){
            state.findPassStep = 0;
        }
    },
    actions: {},
    modules: {}
})
