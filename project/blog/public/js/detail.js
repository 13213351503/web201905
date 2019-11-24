/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-24 11:11:43
*/
;(function($){
	$('.btn-sub-comment').on('click',function(){
		var val = $('#text-comment').val().trim()
		var $err = $('.err')
		if(!val){
			$err.html('请输入内容在提交!!!')
			return 
		}else{
			$err.html('')
		}
		if(val.length > 100){
			$err.html('评论内容不超过10个字符!!!')
			return 
		}else{
			$err.html('')
		}

		//验证成功,发送ajax请求
		//评论需要知道属于哪一篇文章,因此需要获取文章ID
		var id = $(this).data('id')
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				content:val,
				article:id
			}
		})
		.done(function(result){
			// console.log(result)
			if(result.code == 0){
				$('#text-comment').val('')
				//todo.....
			}
		})
		.fail(function(err){
			$err.html('评论失败,请稍后再试!!!')
		})
	})
})(jQuery);