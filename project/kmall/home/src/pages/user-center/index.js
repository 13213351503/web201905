/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-20 20:34:56
*/
var nav = require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')


var page = {
	init:function(){
		this.renderSide()
	},
	renderSide:function(){
		_side.render('user-center')
	}
}

$(function(){
	page.init()
})