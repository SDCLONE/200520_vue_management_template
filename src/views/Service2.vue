<template>
    <div>
        <div class="card-container">
            <el-card v-for="i in 4" :key="i" class="info-card" shadow="always" :body-style="{height:'250px'}">
                <div>列表内容1</div>
                <div>列表内容2</div>
                <div>列表内容3</div>
                <div>列表内容4</div>
            </el-card>
        </div>
        <div style="width: 1200px;height: 500px;border: 2px solid #e8e8e8;"></div>

    </div>
</template>

<script>
    export default {
        name: "Service2",
        props:['activeMenu'],
        mounted() {
            //加载二级路由界面修改左侧导航栏高亮选项
            console.log("页面目前的activeMenu是",this.activeMenu);
            this.$store.state.activeMenu = this.activeMenu;
        }
    }
</script>

<style scoped>
    .info-card{
        width: 200px;
        margin: 20px;
        float: left;
    }
    /*
        解决父元素塌陷问题
    */
    .card-container{
        overflow: auto;
    }
    /*.card-container :after{*/
    /*    clear: right;*/
    /*    display: block;*/
    /*    content: "";*/
    /*}*/
</style>