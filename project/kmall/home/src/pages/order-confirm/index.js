/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 11:28:46
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
		this.shippingBox.on('click','.shipping-delete',function(ev){
			//阻止事件冒泡防止该地址变为选中状态
			ev.stopPropagation()
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

		//3.点击编辑地址
		this.shippingBox.on('click','.shipping-edit',function(ev){
			//阻止事件冒泡防止该地址变为选中状态
			ev.stopPropagation()
			var $this = $(this)
			var shippingId = $this.parents('.shipping-item').data('shipping-id')
			api.getShippingsDetail({
				data:{
					id:shippingId
				},
				success:function(shipping){
					_modal.show(shipping)
				},
				error:function(){
					_util.showErrMsg(msg)
				}
			})
		})

		//4.点击选中地址
		this.shippingBox.on('click','.shipping-item',function(){
			var $this = $(this)
			$this.addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')

			//获取当前选中地址的ID
			_this.selectShippingId = $this.data('shipping-id')
		})

		//5.点击支付功能
		this.productBox.on('click','.btn-submit',function(){
			var $this = $(this)
			//支付:创建订单信息,成功后去到支付页面
			//支付必须获取地址
			if(_this.selectShippingId){
				api.addOrders({
					data:{
						shippingId:_this.selectShippingId
					},
					success:function(order){
						window.location.href = './payment.html?orderNo='+order.orderNo
					},
					error:function(){
						_util.showErrMsg('创建订单失败,请稍后再试')
					}
				})
			}else{
				_util.showErrMsg('请选择收货人地址')
			}
		})
	},
	renderShippings:function(shippings){
		var _this = this
		//重新渲染地址列表是保存渲染前的地址选中状态
		shippings.forEach(function(shipping){
			if(shipping._id == _this.selectShippingId){
				shipping.active = true
			}
		})
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