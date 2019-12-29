/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 17:25:48
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util')

$(function(){
	var type = _util.getParamsFormUrl('type') || 'default'
	if(type == 'payment'){
		var orderNo = _util.getParamsFormUrl('orderNo') || ''
		var $btn = $('.order-detail')
		var url = $btn.attr('href') + orderNo
		$btn.attr('href',url)
	}
	$('.'+type).show()
})