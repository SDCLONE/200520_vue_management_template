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




<!--            <el-header>-->
<!--                <AllHead/>-->
<!--            </el-header>-->
<!--                <el-container class="main">-->
<!--                    <el-aside width="200px">-->
<!--                        <el-scrollbar>-->
<!--                            <ManageNav/>-->
<!--                        </el-scrollbar>-->
<!--                    </el-aside>-->
<!--                    <el-main>-->
<!--                        <el-scrollbar>-->
<!--&lt;!&ndash;                            <div id="testBox">&ndash;&gt;-->
<!--&lt;!&ndash;                                <h3>This is management page!! Admin:{{this.$store.state.adminName}}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-button @click="handleLogout">log out</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->

<!--                            <router-view/>-->
<!--                        </el-scrollbar>-->

<!--                    </el-main>-->
<!--                </el-container>-->

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

    /*.el-container{*/
    /*    !*border: 1px solid #000;*!*/
    /*    !*height: 800px;*!*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    margin-top: 60px;*/
    /*}*/
    /*.main{*/
    /*    height: 700px;*/
    /*    !*margin-top: 60px;*!*/

    /*}*/

    /*.el-header{*/
    /*    z-index: 999;*/
    /*    height: 60px;*/
    /*    padding:0;*/
    /*    width: 100%;*/
    /*}*/
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
        margin-top: 60px;
        /*border: 1px solid #000;*/

    }
    /*.el-aside{*/
    /*    !*border: 1px solid red;*!*/
    /*    !*height: 700px;*!*/
    /*    background-color: #ffffff;*/
    /*    !*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*!*/
    /*}*/
    /*.el-main{*/
    /*    padding: 0;*/
    /*}*/

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