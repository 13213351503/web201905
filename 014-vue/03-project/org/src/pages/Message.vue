<!-- 模板 -->
<template>
    <div class="message">
        <h2>Hello Vue!! {{task}}</h2>
        <p>我是message</p>
    </div>
</template>
<!-- 逻辑 -->
<script>
    export default{
        name:'Message',
        props:{
        	task:String
        }
    }
</script>
<!-- 样式 -->
<style scoped>
  	p{
  		color: red;
  	}
</style>