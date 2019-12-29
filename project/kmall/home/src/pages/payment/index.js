/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 15:30:10
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
	paymentParams:{
		orderNo:_util.getParamsFormUrl('orderNo'),
	},
	init:function(){
		//定义定时器
		this.timer = 0
		this.paymentBox = $('.payment-box')
		//加载支付信息
		this.loadPayment()
	},
	loadPayment:function(){
		var _this = this
		if(this.paymentParams.orderNo){
			api.getPayments({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(order){
					var html = _util.render(tpl,order)
					_this.paymentBox.html(html)

					//加载支付页面后需要每隔一段时间获取支付状态
					//如果已支付则跳转到支付成功页面
					_this.listenPaymentStatus()
				},
				error:function(){
					_this.paymentBox.html('<p class="empty-message">获取订单失败,请稍后再试!</p>')
				}
			})
		}else{
			_this.paymentBox.html('<p class="empty-message">没有该订单,请重新跳转页面</p>')
		}
	},
	listenPaymentStatus:function(){
		var _this = this
		this.timer = setInterval(function(){
			api.getPaymentsStatus({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(status){
					if(status){
						window.location.href = "./result.html?type=payment&orderNo="+_this.paymentParams.orderNo
					}
				}
			})
		},1000)
	}
}

$(function(){
	page.init()
})