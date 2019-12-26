/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 20:48:50
*/
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var modalTpl = require('./modal.tpl')

require('util/pagination')

var page = {
	init:function(){
		this.shippingBox = $('.shipping-box')
		this.productBox = $('.product-box')
		//加载地址
		this.loadShipingsList()
		//加载商品
		this.loadProductsList()
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
	},
	loadShipingsList:function(){
		var html = _util.render(shippingTpl)
		this.shippingBox.html(html)
	},
	loadProductsList:function(){
		var html = _util.render(productTpl)
		this.productBox.html(html)
	},
}

$(function(){
	page.init()
})