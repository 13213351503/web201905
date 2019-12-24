/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 18:31:45
*/
var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

require('util/pagination')

var page = {
	productDetailParams:{
		id:_util.getParamsFormUrl('productId'),
	},
	init:function(){
		this.$detailBox = $('.detail-box')
		//加载商品列表
		this.loadPorductDetail()
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this

	},
	loadPorductDetail:function(){
		var _this = this
		if(!this.productDetailParams.id){
			return 
		}
		api.getProductDetail({
			data:_this.productDetailParams,
			success:function(product){
				product.images = product.images.split(',')
				product.activeImage = product.images[0]
				console.log(product)
				var html = _util.render(tpl,product)
				_this.$detailBox.html(html)
			}
		})
	}
}

$(function(){
	page.init()
})