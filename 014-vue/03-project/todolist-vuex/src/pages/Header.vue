<!-- 模板 -->
<template>
    <div id="Header">
        <h1>TodoList</h1>
        <input 
            type="text"
            placeholder="请输入任务" 
            v-model="task"
            @keyup.enter="handleAdd()"
        >
    </div>
</template>
<!-- 逻辑 -->
<script>
    import { ADD_TODO } from '../store/types.js'
    export default{
        name:'Header',
        data(){
            return {
                task:''
            }
        },
        methods:{
            handleAdd:function(){
                //1.校验数据
                var task = this.task.trim()
                if(!task){
                    alert('请输入任务')
                    return 
                }
                //2.封装任务对象
                var todo = {
                    task,
                    done:false
                }
                //3.将任务对象添加到任务数组中
                this.$store.dispatch(ADD_TODO,todo)
                //4.清空输入框值
                this.task = ''
            }
        }
    }
</script>
<!-- 样式 -->
<style scoped>
  	#Header{
		text-align: center;
  	}
  	input{
  		width: 100%;
  		height: 34px;
  		padding-left: 15px;
  		box-sizing: border-box;
  	}
</style>