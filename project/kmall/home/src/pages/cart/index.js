/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 20:09:16
*/
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

require('util/pagination')

var page = {
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		//绑定事件
		this.bindEvent()
		//加载购物车信息
		this.loadCarts()
	},
	bindEvent:function(){
		var _this = this
		//1.处理单个选中/取消
		this.$cartBox.on('click','.select-one',function(){
			var $this = $(this)
			//选中
			//更改选中状态需要获取当前商品的ID
			var productId = $this.parents('.product-item').data('product-id')
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:true
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//2.处理全部选中/取消
		this.$cartBox.on('click','.select-all',function(){
			var $this = $(this)
			//选中
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						checked:true
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//3.处理删除单个商品:需要获取当前商品的ID	
		this.$cartBox.on('click','.delete-one',function(){
			var $this = $(this)
			//选中
			//删除单个商品需要获取当前商品的ID
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.showConfirm('您确定要删除该条商品吗?')){
				api.deleteCarts({
					data:{
						productId:productId,
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//4.处理删除选中商品:所有的选中状态都存在后台因此不需要传参
		this.$cartBox.on('click','.delete-selected',function(){
			var $this = $(this)
			//选中
			if(_util.showConfirm('您确定要删除选中的商品吗?')){
				api.deleteCarts({
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//5.处理商品数量
		this.$cartBox.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $this.siblings('.count-input')
			//获取当前商品的ID
			var productId = $this.parents('.product-item').data('product-id')
			//获取当前商品数量
			var current = parseInt($input.val())
			//获取当前商品库存
			var stock = $input.data('stock')
			var count = current
			//增加
			if($this.hasClass('plus')){
				if(count >= stock){
					_util.showErrMsg('商品数量超出库存')
					return
				}
				count = current + 1
			}
			//减少
			else if($this.hasClass('minus')){
				if(count <= 1){
					_util.showErrMsg('商品数量不少于1件')
					return
				}
				count = current - 1
			}
			//发送请求更新数量
			api.updateCartsCounts({
				data:{
					productId:productId,
					count:count
				},
				success:function(data){
					_this.renderCart(data)
				},
				error:function(){
					_this.showErrPage()
				}
			})
		})
		//6.点击去结算
		this.$cartBox.on('click','.btn-submit',function(){
			if(_this.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrMsg('请添加需要结算的商品')
			}
		})
	},
	renderCart:function(data){
		//更新导航购物车数量数据实和购物列表保持一致
		_nav.loadCarts()

		if(data.cartList.length > 0){
			//缓存商品总价用来处理结算功能
			this.totalCartPrice = data.totalCartPrice

			var html = _util.render(tpl,data)
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
		}
	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(data){
				// console.log(data)
				/*
				if(data.cartList.length > 0){
					var html = _util.render(tpl,data)
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
				}
				*/
				_this.renderCart(data)
			},
			error:function(){
				_this.showErrPage()
			}
		})
	},
	showErrPage:function(){
		this.$cartBox.html('<p class="empty-message">你的请求出错啦,请稍后再试!</p>')
	}
}

$(function(){
	page.init()
})