<!-- 模板 -->
<template>
    <div id="App">
        <Header :addTodo="addTodo" />
        <List :todos="todos" :delTodo="delTodo" />
        <Footer 
            :todos="todos" 
            :selectAllTodo="selectAllTodo" 
            :deleteSelectDone="deleteSelectDone"
        />
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
        data(){
            return {
                todos:[
                    {
                        task:'学习',
                        done:false
                    },
                    {
                        task:'睡觉',
                        done:false
                    }
                ]
            }
        },
        methods:{
            addTodo:function(todo){
                this.todos.unshift(todo)
            },
            delTodo:function(index){
                this.todos.splice(index,1)
            },
            selectAllTodo:function(value){
                this.todos.forEach((item)=>{
                    item.done = value
                })
            },
            deleteSelectDone:function(){
                this.todos = this.todos.filter((item)=>item.done != true)
            }
        }
    }
</script>
<!-- 样式 -->
<style>
    #App{
        width: 600px;
        margin: 100px auto;
    }
</style>
