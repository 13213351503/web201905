/*
* @Author: Chen
* @Date:   2019-12-17 20:39:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 20:04:08
*/
require('./index.css')
var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		this.loadUsername()
		this.bindEvent()
		//加载购物车数量
		this.loadCarts()
		return this
	},
	loadCarts:function(){
		var $cartNum = $('.cart-num')
		api.getCartsCount({
			success:function(count){
				$cartNum.text(count || 0)
			},
			error:function(){
				$cartNum.text(0)
			}
		})
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			api.logout({
				success:function(data){
					window.location.reload()
				},
				error:function(err){
					_util.showErrMsg(err)
				}
			})
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(data.username)
			}
		})
	}
}

module.exports = page.init()