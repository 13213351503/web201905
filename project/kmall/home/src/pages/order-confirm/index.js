/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 20:46:15
*/
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')


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
		//自定义监听事件获取新增地址后最新地址信息
		this.shippingBox.on('get-shippings',function(ev,shippings){
			//获取最新地址重新渲染地址列表
			_this.renderShippings(shippings)
		})
		//1.点击新增地址
		this.shippingBox.on('click','.shipping-add',function(){
			//显示地址弹出层
			_modal.show()
		})

		//2.点击删除地址
		this.shippingBox.on('click','.shipping-delete',function(){
			if(_util.showConfirm('您确定要删除该条地址吗?')){
				var shippingId = $(this).parents('.shipping-item').data('shipping-id')
				api.deleteShippings({
					data:{
						id:shippingId
					},
					success:function(shippings){
						//获取最新地址重新渲染地址列表
						_this.renderShippings(shippings)
					},
					error:function(){
						_util.showErrMsg('删除地址失败,请稍后再试!')
					}
				})
			}
		})
	},
	renderShippings:function(shippings){
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.shippingBox.html(html)
	},
	loadShipingsList:function(){
		var _this = this
		api.getShippings({
			success:function(shippings){
				/*
				var html = _util.render(shippingTpl,{
					shippings:shippings
				})
				_this.shippingBox.html(html)
				*/
				_this.renderShippings(shippings)
			}
		})
		
	},
	loadProductsList:function(){
		var _this = this
		api.getOrdersList({
			success:function(data){
				// console.log(data)
				if(data.cartList.length>0){
					var html = _util.render(productTpl,data)
					_this.productBox.html(html)
				}else{
					_this.productBox.html('<p class="empty-message">您还没有选择任何商品</p>')
				}
			},
			error:function(){
				_this.productBox.html('<p class="empty-message">获取商品列表失败,请稍后再试!</p>')
			}
		})
	},
}

$(function(){
	page.init()
})