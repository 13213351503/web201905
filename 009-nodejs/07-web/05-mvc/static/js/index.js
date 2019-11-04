/*
* @Author: Chen
* @Date:   2019-11-01 20:30:52
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-03 17:50:00
*/
;(function($){
	var $input = $('.todo-input')
	//处理添加逻辑
	$input.on('keydown',function(ev){
		// console.log(ev.keyCode)
		if(ev.keyCode == 13){
			//发送ajax请求,添加数据
			$.ajax({
				url:'/add',
				type:"post",
				dataType:'json',
				data:{
					task:$input.val()
				},
				success:function(result){
					//根据后台返回数据做出不同处理
					const data = result.data
					if(result.code == 0){//请求成功根据生成对应dom节点插入到列表中
						var $dom = $(`<li class="todo-item" data-id="${data.id}">${data.task}</li>`)
						// console.log($dom)
						$('.todo-list').append($dom)
						$input.val('')
					}
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})

	//处理删除逻辑(由于每一个li都是动态添加的,所以需要事件代理形式监听事件)
	$('.todo-list').on('click','.todo-item',function(){
		var $this = $(this)
		// console.log($this)
		$.ajax({
			url:'/delete',
			dataType:'json',
			data:{
				id:$this.data('id')
			},
			success:function(data){
				if(data.code == 0){
					$this.remove()
				}else{
					console.log(data.message)
				}
			},
			error:function(err){
				console.log(err)
			}
		})
	})


})(jQuery)