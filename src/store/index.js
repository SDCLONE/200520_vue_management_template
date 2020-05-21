import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminName:'',

    //用户状态码信息
    SUCCESS:0,
    SYSTEM_ERROR:10000,
    USER_HAS_EXISTED:20001,
    USER_NOT_FIND:20002,
    USER_LOGIN_FAIL:20003,
    USER_NOT_LOGIN:20004,
    EMAIL_NOT_EXIST:20005,
    FREQUENT_CODE_REQUEST:20006,
    VERIFY_INCORRECT:20007,
    SESSION_LOGIN_FAIL:20008
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
