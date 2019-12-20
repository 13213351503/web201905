/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-20 19:27:01
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util')
var api = require('api')


var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-search').on('click',function(){
			_this.submit()
		})
		//监听键盘事件,回车键提交数据
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val())
		//跳转到列表页
		window.location.href = '/list.html?keyword='+keyword
	},
}

$(function(){
	page.init()
})