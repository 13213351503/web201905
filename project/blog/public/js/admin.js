/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 18:10:54
*/
;(function($){
	$('.del').on('click',function(){
		if(!window.confirm('请问你确定要删除该条记录吗?')){
			return false
		}
	})
})(jQuery);