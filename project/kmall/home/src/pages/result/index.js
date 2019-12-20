/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-20 19:04:42
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util')

$(function(){
	var type = _util.getParamsFormUrl('type') || 'default'
	$('.'+type).show()
})