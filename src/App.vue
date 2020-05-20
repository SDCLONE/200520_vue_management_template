<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>

body{
  margin: 0;
  background-color: #f2f2f2;
  overflow-y: hidden;
}
::-webkit-scrollbar{
  display: none;
}
/*.el-scrollbar__wrap{*/
/*  overflow:auto;*/
/*}*/
/*::-webkit-scrollbar {display:none}*/

</style>
