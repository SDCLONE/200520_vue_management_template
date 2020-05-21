<template>
    <div>
        <div v-for="i in 4" :key="i" class="info-card">
            <el-card shadow="always" :body-style="{height:'250px'}">
                <div>列表内容1</div>
                <div>列表内容2</div>
                <div>列表内容3</div>
                <div>列表内容4</div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Service2"
    }
</script>

<style scoped>
    .info-card{
        width: 200px;
        margin: 20px;
        float: left;
    }
</style>