/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 20:40:40
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
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		//绑定事件
		this.bindEvent()
		//加载购物车信息
		this.loadCarts()
	},
	bindEvent:function(){
		var _this = this

	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(data){
				console.log(data)
				if(data.cartList.length > 0){
					var html = _util.render(tpl,data)
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
				}
				
			},
			error:function(){

			}
		})
	}
}

$(function(){
	page.init()
})