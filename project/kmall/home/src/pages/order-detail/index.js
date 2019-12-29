/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 16:47:37
*/
var nav = require('pages/common/nav')
var _side = require('pages/common/side')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

require('util/pagination')

var page = {
	orderDetailParams:{
		orderNo:_util.getParamsFormUrl('orderNo'),
	},
	init:function(){
		this.orderBox = $('.order-box')
		//加载侧边栏
		this.renderSide()
		//加载订单详情
		this.loadOrdersDetail()
		//绑定事件
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	loadOrdersDetail:function(){
		var _this = this
		api.getOrderDetail({
			data:this.orderDetailParams,
			success:function(order){
				_this.renderOrderDetail(order)
			}
		})
	},
	renderOrderDetail:function(order){
		if(order){
			//处理时间
			order.createdTime = new Date(order.createdAt).toLocaleString()
			order.canPay = order.canCancel = order.status == 10
			var html = _util.render(tpl,order)
			this.orderBox.html(html)
		}else{
			this.orderBox.html('<p class="empty-message">您还没有该订单</p>')
		}
	},
	bindEvent:function(){
		var _this = this 
		this.orderBox.on('click','.btn-cancel',function(){
			var $this = $(this)
			if(_util.showConfirm('您确定要取消该订单吗?')){
				api.updateOrderStatus({
					data:{
						orderNo:_this.orderDetailParams.orderNo,
						status:20
					},
					success:function(order){
						_this.renderOrderDetail(order)
					},
					error:function(msg){
						_util.showErrMsg(msg)
					}
				})
			}
		})
	}
}

$(function(){
	page.init()
})