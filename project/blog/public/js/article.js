/*
* @Author: Chen
* @Date:   2019-11-19 19:41:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 20:06:29
*/
;(function($){
	ClassicEditor
    .create( document.querySelector( '#content' ), {
        language:'zh-cn',
        ckfinder:{
			uploadUrl:'/article/uploadImg'
		}
    } )
    .catch( error => {
        console.log( error );
    } )
})(jQuery);