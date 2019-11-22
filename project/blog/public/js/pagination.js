/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-21 20:43:38
*/
;(function($){
	$.fn.extend({
		pagination:function(options){
			var $elem = this
			$elem.on('click','a',function(){
				var $this = $(this)
				//1.获取当前页
				var currentPage = $elem.find('.active a').html()/1
				//2.根据当前页计算出点击的页码
				var labelText = $this.attr('aria-label')
				var page = 0
				if(labelText == "Next"){
					page = currentPage + 1
				}
				else if(labelText == "Previous"){
					page = currentPage - 1
				}
				else{
					page = $this.html()/1
				}
				//如果点击的是当前页,阻止默认行为
				if(page == currentPage){
					return false
				}
				
				//3.发送ajax请求
				$.ajax({
					url:options.url+"?page="+page,
					type:'get',
					dataType:'json'
				})
				.done(function(result){
					console.log(result)
				})
				.fail(function(err){
					console.log(err)
				})
			})
		}
	})
})(jQuery);