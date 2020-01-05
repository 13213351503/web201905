<!-- 模板 -->
<template>
    <div class="app">
        <!-- <img src="./assets/images/logo.png" alt=""> -->
        <Logo />
        <!-- <h2>Hello Vue</h2> -->
        <Message task="学习" />
        <p>我是App</p>
    </div>
</template>
<!-- 逻辑 -->
<script>
    //1.引入组件
    import Logo from './pages/Logo.vue'
    import Message from './pages/Message.vue'
    export default{
        name:'App',
        components:{
            Logo,
            Message,
        }
    }
</script>
<!-- 样式 -->
<style>
  
</style>
