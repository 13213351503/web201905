<!-- 模板 -->
<template>
    <div id="App">
        <Header />
        <List />
        <Footer />
    </div>
</template>
<!-- 逻辑 -->
<script>
    //1.引入组件
    import Header from './pages/Header.vue'
    import List from './pages/List.vue'
    import Footer from './pages/Footer.vue'
    export default{
        name:'App',
        components:{
            Header,
            List,
            Footer,
        },
    }
</script>
<!-- 样式 -->
<style>
    #App{
        width: 600px;
        margin: 100px auto;
    }
</style>
