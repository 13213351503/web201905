<!-- 模板 -->
<template>
    <div id="Footer">
        <input type="checkbox">
        <span>{{totalDone}}/{{total}}</span>
        <button>删除所有</button>
    </div>
</template>
<!-- 逻辑 -->
<script>
    export default{
        name:'Footer',
        computed:{
            total:function(){
                return this.todos.length
            },
            totalDone:function(){
                return this.todos.reduce((total,item)=>{
                    if(item.done){
                        total = total + 1
                    }
                    return total
                },0)
            }
        },
        props:{
            todos:Array
        }
    }
</script>
<!-- 样式 -->
<style scoped>
  	#Footer{
  		margin-top: 15px;

  	}
  	button{
  		float: right;
  	}
</style>