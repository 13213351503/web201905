/*
* @Author: Chen
* @Date:   2019-11-17 11:13:03
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-17 11:13:50
*/
;(function($){
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(data){
			// console.log(data)
			if(data.code == 0){
				//退出成功返回首页
				window.location.href = '/'
			}
		})
		.fail(function(err){
			$userInfo.find('.err').html('请求失败,请稍后再试!!!')
		})
	})
})(jQuery)
	