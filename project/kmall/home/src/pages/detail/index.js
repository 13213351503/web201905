/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 19:41:56
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
		//1.切换商品图片
		this.$detailBox.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			//选中处理
			$this.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active')
			//获取当前图片地址
			var imageUrl = $this.find('img').attr('src')
			$('.product-main-img img').attr('src',imageUrl)
		})
		//2.点击增加/减少商品数量
		this.$detailBox.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $('.count-input')
			var current = parseInt($input.val())
			//增加
			if($this.hasClass('plus')){
				$input.val(current < _this.stock ? current + 1 : _this.stock)
			}
			//较少
			else if($this.hasClass('minus')){
				$input.val(current > 1 ? current - 1 : 1)
			}
		})
		//3.添加购物车
		this.$detailBox.on('click','.add-cart-btn',function(){
			var count = $('.count-input').val()
			api.addCarts({
				data:{
					productId:_this.productDetailParams.id,
					count:count
				},
				success:function(data){
					_util.goResult('addCart')
				}
			})
			
		})
	},
	loadPorductDetail:function(){
		var _this = this
		if(!this.productDetailParams.id){
			return 
		}
		api.getProductDetail({
			data:_this.productDetailParams,
			success:function(product){
				//缓存库存
				_this.stock = product.stock

				product.images = product.images.split(',')
				product.activeImage = product.images[0]
				var html = _util.render(tpl,product)
				_this.$detailBox.html(html)
			}
		})
	}
}

$(function(){
	page.init()
})