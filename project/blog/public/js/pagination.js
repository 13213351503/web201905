/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-22 19:41:59
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
				//由于列表页只需要显示对应分类下的文章
				//要获取对应的分类ID
				var url = options.url+"?page="+page
				var id = $elem.data('id')
				if(id){
					url = url+"&id="+id
				}
				//3.发送ajax请求
				$.ajax({
					url:url,
					type:'get',
					dataType:'json'
				})
				.done(function(result){
					// console.log(result)
					$elem.trigger('get-data',result.data)
				})
				.fail(function(err){
					console.log(err)
				})
			})
		}
	})
})(jQuery);