<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'querystring';
  axios.defaults.withCredentials=true;


export default {
  name: 'app',
  components: {

  },
  // beforeCreate() {
  //   axios({
  //     method:'get',
  //     url:'http://localhost:7770/admin/getUsernameBySession'
  //   }).then(res=>{
  //     console.log("这个是页面加载完毕的res",res);
  //     //session中有登录信息
  //     if (res.data.status===0){
  //       this.$store.state.adminName=res.data.data;
  //       this.$router.push({path:'/manage'});
  //     }
  //     //session中没有登录信息
  //     else{
  //       this.$store.state.adminName='';
  //       this.$router.push({path:'/login'})
  //     }
  //   })
  // }
}
</script>

<style>

body{
  width: 100%;
  min-height: 100%;
  margin: 0;
  background-color: #f2f2f2;
  /*overflow-y: hidden;*/
}


</style>
