<template>
    <div>
        <header class="header">
            <AllHead/>
        </header>
        <section class="not-found-main">
            <div class="description">
                <div style="font-size: 35px">哎呀，页面无法访问！！</div>
                <div style="font-size: 16px; margin-top: 15px">可能原因：网址有错误 > 请检查地址是否完整或存在多余字符；网址已失效 > 可能页面已删除，服务已下线等</div>
            </div>
        </section>
        <footer class="footer">
            <AllFooter/>
        </footer>
    </div>
</template>

<script>
    import AllHead from "../components/AllHead";
    import AllFooter from "../components/AllFooter";

    export default {
        name: "NotFound",
        components: {AllFooter, AllHead}
    }
</script>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        height: 60px;
        z-index: 999;
        width: 100%;
    }

    /*
    预留出头部和尾部部分
    */
    .not-found-main {

        margin-top: 0;
        padding-bottom: 120px;
        padding-top: 60px;
    }


    .description{
        width: 400px;
        margin: 100px auto;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
    }
</style>