/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-22 10:30:02
*/
var nav = require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')
var tpl = require('./index.tpl')

var api = require('api')
var _util = require('util')


var page = {
	init:function(){
		this.renderSide()
		this.loadUserInfo()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		api.getUserInfo({
			success:function(data){
				// console.log(data)
				var html = _util.render(tpl,data)
				$('.side-content').html(html)
			}
		})
	}	
}

$(function(){
	page.init()
})