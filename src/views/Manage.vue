<template>
    <div id="#app">
        <header class="header">
            <AllHead/>
        </header>
        <div class="left-nav">
                <div class="left-nav-content">
                    <el-scrollbar>
                        <ManageNav/>
                    </el-scrollbar>
                </div>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    import AllHead from "../components/AllHead";
    import ManageNav from "../components/ManageNav";
    import axios from 'axios';
    import qs from 'querystring';
    axios.defaults.withCredentials=true;

    export default {
        name: "Manage",
        components:{ManageNav, AllHead},
        beforeCreate() {
            //TODO 先判断是否登录，否则直接跳转到登录界面
            axios({
                method:'get',
                // url:'http://localhost:7770/admin/getUsernameBySession',
                url:'http://localhost:9000/api/admin/getUsernameBySession'
            }).then(res=>{
                console.log("这个是页面加载完毕的res",res);
                //session中有登录信息
                if (res.data.status===0){
                    this.$store.state.adminName=res.data.data;
                }
                //session中没有登录信息
                else{
                    this.$store.state.adminName='';
                    this.$router.push({path:'/login'})
                }
            })
        },
        mounted() {
            //渲染左半部分导航栏滚动条
            let left_nav_height = document.getElementsByClassName('left-nav')[0].clientHeight
            console.log(left_nav_height);
            document.getElementsByClassName('left-nav-content')[0].style.height = (left_nav_height-60)+'px';



            // //TODO 先判断是否登录，否则直接跳转到登录界面
            // axios({
            //     method:'get',
            //     // url:'http://localhost:7770/admin/getUsernameBySession',
            //     url:'http://localhost:9000/api/admin/getUsernameBySession'
            // }).then(res=>{
            //     console.log("这个是页面加载完毕的res",res);
            //     //session中有登录信息
            //     if (res.data.status===0){
            //         this.$store.state.adminName=res.data.data;
            //     }
            //     //session中没有登录信息
            //     else{
            //         this.$store.state.adminName='';
            //         this.$router.push({path:'/login'})
            //     }
            // })

        }
    }
</script>

<style scoped>


    .header{
        width: 100%;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .left-nav{
        position: fixed;
        width: 200px;
        height: 100%;
        top: 0;
        left: 0;
        /*border: 1px solid #000;*/
        background-color: #fff;
        /*padding-top: 60px;*/

    }
    .left-nav-content{
        margin-top: 60px;
        /*border: 1px solid red;*/
        /*height: 400px;*/
    }
    /*
    开启element滚动条
    */
    .el-scrollbar{
        /*margin-top: 60px;*/
        height: 100%;
    }
    .main-content{
        margin-left: 200px;
        min-height: 400px;
        padding-top: 60px;
        padding-bottom: 60px;
        /*border: 1px solid #000;*/

    }


    /*是否开启element样式的横向滚动条*/
    .el-scrollbar .el-scrollbar__wrap{
        overflow-x: auto;
    }
     .left-nav ::-webkit-scrollbar{
         display: none;
     }
    /*
   /*关闭系统自带的滚动条 （chrome浏览器这样关闭）*/
   /* *!*/
   /* .el-main ::-webkit-scrollbar{*/
   /*     display: none;*/
   /* }*/
   /* .el-aside ::-webkit-scrollbar{*/
   /*     display: none;*/
   /* }*/
   /* !**/
   /* IE  Edge这样关闭滚动条*/
   /*  *!*/
   /* .el-main{*/
   /*     -ms-overflow-style: none;*/
   /* }*/

    /*#testBox{*/
    /*    !*width: 1200px;*!*/
    /*    height: 1200px;*/
    /*}*/
</style>